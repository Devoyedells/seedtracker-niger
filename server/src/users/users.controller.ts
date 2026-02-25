import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  Param,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req, @Body() body: Record<string, any>) {
    // Strip out fields that should never be updatable via this endpoint
    const { password, email, role, ...safeData } = body;
    return this.usersService.updateById(req.user.sub, safeData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Request() req) {
    if (req.user.role === 'user') {
      throw new ForbiddenException(
        'Users do not have access to platform stats',
      );
    }
    return this.usersService.getStats(
      req.user.role,
      req.user.registrationState,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('actors')
  async getActors(@Request() req) {
    if (req.user.role === 'user') {
      throw new ForbiddenException(
        'Users do not have access to the actor directory',
      );
    }
    return this.usersService.getActors(
      req.user.role,
      req.user.registrationState,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('actors/:id')
  async getActorById(@Request() req, @Param('id') id: string) {
    if (req.user.role === 'user') {
      throw new ForbiddenException(
        'Users do not have access to the actor directory',
      );
    }
    // We fetch the actor first
    const actor = await this.usersService.findById(id);

    if (!actor) {
      throw new NotFoundException('Actor not found');
    }

    // Check if the admin is allowed to see this actor's state
    if (req.user.role === 'ekadmin' && actor.registrationState !== 'Ekiti') {
      throw new ForbiddenException('Access denied to other state actors');
    }
    if (req.user.role === 'anadmin' && actor.registrationState !== 'Anambra') {
      throw new ForbiddenException('Access denied to other state actors');
    }
    if (req.user.role === 'ngadmin' && actor.registrationState !== 'Niger') {
      throw new ForbiddenException('Access denied to other state actors');
    }

    return actor;
  }
}
