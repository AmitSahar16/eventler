import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  async create(@Request() req, @Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(req.user.sub, createGroupDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.groupsService.findAll(req.user.sub);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return await this.groupsService.findOne(id, req.user.sub);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupsService.update(id, req.user.sub, updateGroupDto);
  }
}
