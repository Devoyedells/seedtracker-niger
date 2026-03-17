import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private isCodeExpired(sentAt: Date, minutesValid = 10): boolean {
    return Date.now() - sentAt.getTime() > minutesValid * 60 * 1000;
  }

  private canResendCode(sentAt: Date | undefined): boolean {
    if (!sentAt) return true;
    return Date.now() - sentAt.getTime() > 60 * 1000; // 1 minute cooldown
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const verificationCode = this.generateCode();

    const newUser = await this.usersService.create({
      ...dto,
      password: hashedPassword,
      isEmailVerified: false,
      verificationCode,
      verificationCodeSentAt: new Date(),
    });

    // Generate and assign a unique actorId (e.g. EK-0001)
    const actorId = await this.usersService.generateActorId(
      dto.registrationState || '',
    );
    await this.usersService.updateById(newUser._id.toString(), { actorId });

    await this.mailService.sendVerificationCode(
      dto.email,
      dto.fullName,
      verificationCode,
    );

    return {
      message: 'Verification code sent to your email',
      email: dto.email,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      // Auto-resend verification code if the last one is older than 1 minute
      if (this.canResendCode(user.verificationCodeSentAt)) {
        const newCode = this.generateCode();
        await this.usersService.updateVerification(user._id.toString(), {
          verificationCode: newCode,
          verificationCodeSentAt: new Date(),
        });
        await this.mailService.sendVerificationCode(
          user.email,
          user.fullName,
          newCode,
        );
      }

      throw new ForbiddenException({
        message:
          'Email not verified. Please check your inbox for the verification code.',
        email: user.email,
        needsVerification: true,
      });
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      registrationState: user.registrationState ?? null,
    };
    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id.toString();

    return {
      access_token: this.jwtService.sign(payload),
      user: userObj,
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (
      !user.verificationCode ||
      !user.verificationCodeSentAt ||
      this.isCodeExpired(user.verificationCodeSentAt)
    ) {
      throw new BadRequestException(
        'Verification code has expired. Please request a new one.',
      );
    }

    if (user.verificationCode !== dto.code) {
      throw new BadRequestException('Invalid verification code');
    }

    // Mark user as verified and clear code
    await this.usersService.updateVerification(user._id.toString(), {
      isEmailVerified: true,
      verificationCode: undefined,
      verificationCodeSentAt: undefined,
    });

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      registrationState: user.registrationState ?? null,
    };
    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id.toString();

    return {
      access_token: this.jwtService.sign(payload),
      user: userObj,
    };
  }

  async resendVerification(dto: ResendVerificationDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (!this.canResendCode(user.verificationCodeSentAt)) {
      throw new BadRequestException(
        'Please wait before requesting another code',
      );
    }

    const newCode = this.generateCode();
    await this.usersService.updateVerification(user._id.toString(), {
      verificationCode: newCode,
      verificationCodeSentAt: new Date(),
    });

    await this.mailService.sendVerificationCode(
      user.email,
      user.fullName,
      newCode,
    );

    return { message: 'Verification code sent to your email' };
  }
}
