import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('recommendations')
@UseGuards(JwtAuthGuard)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) { }

  @Get('feed')
  async getFeed(@Request() req) {
    return await this.recommendationsService.getFeed(req.user.sub);
  }

  @Post('events/:eventId')
  async createForEvent(@Request() req, @Param('eventId') eventId: string) {
    return await this.recommendationsService.createForEvent(
      eventId,
      req.user.sub,
    );
  }
}
