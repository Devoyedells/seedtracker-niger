import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(
    email: string,
    fullName: string,
    code: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: `${code} - Verify your Seed Tracker NG account`,
      template: 'verification',
      context: {
        fullName,
        code,
        codeDigits: code.split(''),
        year: new Date().getFullYear(),
      },
    });
  }
}
