import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
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

  @Get('stats')
  async getStats() {
    return this.usersService.getStats();
  }
}
