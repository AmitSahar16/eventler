import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async getMe(@Request() req) {
    return await this.usersService.getMe(req.user.sub);
  }

  @Put('me')
  async updateMe(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateMe(req.user.sub, updateUserDto);
  }

  @Get('preferences')
  async getPreferences(@Request() req) {
    return await this.usersService.getPreferences(req.user.sub);
  }

  @Put('preferences')
  async updatePreferences(
    @Request() req,
    @Body() updatePreferencesDto: UpdatePreferencesDto,
  ) {
    return await this.usersService.updatePreferences(
      req.user.sub,
      updatePreferencesDto,
    );
  }

  @Get('events')
  async getUserEvents(@Request() req) {
    return await this.usersService.getUserEvents(req.user.sub);
  }
}
