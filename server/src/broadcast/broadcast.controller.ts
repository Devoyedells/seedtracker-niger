import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  ForbiddenException,
  Headers,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BroadcastService } from './broadcast.service';
import { CreateBroadcastDto } from './dto/create-broadcast.dto';

const ADMIN_ROLES = ['admin', 'ekadmin', 'anadmin', 'ngadmin'];

@Controller('broadcasts')
export class BroadcastController {
  constructor(
    private broadcastService: BroadcastService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dto: CreateBroadcastDto) {
    if (!ADMIN_ROLES.includes(req.user.role)) {
      throw new ForbiddenException('Only admins can create broadcasts');
    }
    return this.broadcastService.create(
      req.user.sub,
      req.user.role,
      req.user.registrationState,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Request() req,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.broadcastService.findAll(
      req.user.sub,
      req.user.role,
      req.user.registrationState,
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('notifications/count')
  async getUnreadCount(@Request() req) {
    const count = await this.broadcastService.getUnreadCount(
      req.user.sub,
      req.user.role,
      req.user.registrationState,
    );
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Get('notifications/recent')
  async getUnreadNotifications(@Request() req) {
    return this.broadcastService.getUnreadNotifications(
      req.user.sub,
      req.user.role,
      req.user.registrationState,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/read')
  async markAsRead(@Request() req, @Param('id') id: string) {
    await this.broadcastService.markAsRead(req.user.sub, id);
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.broadcastService.findOne(
      id,
      req.user.sub,
      req.user.role,
      req.user.registrationState,
    );
  }

  /**
   * Cron endpoint — call this with the CRON_SECRET header to process queued emails.
   * Designed to be hit by an external scheduler (e.g. GitHub Actions, Render cron, etc.)
   */
  @Post('cron/process-emails')
  async processEmails(@Headers('x-cron-secret') secret: string) {
    const expected = this.configService.get<string>('CRON_SECRET');
    if (!expected || secret !== expected) {
      throw new ForbiddenException('Invalid cron secret');
    }
    return this.broadcastService.processPendingEmails(50);
  }
}
