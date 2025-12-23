import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventStatus } from './enums/event.enums';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) { }

  async create(userId: string, createEventDto: CreateEventDto) {
    const event = this.eventRepository.create({
      ...createEventDto,
      creatorId: userId,
      status: EventStatus.OPEN,
      date: createEventDto.date ? new Date(createEventDto.date) : undefined,
    });

    await this.eventRepository.save(event);

    return event;
  }

  async findOne(id: string, userId: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['creator', 'group'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if user has access to this event
    if (event.creatorId !== userId && event.groupId) {
      // TODO: Check if user is a member of the group
      // For now, we'll allow access
    }

    return event;
  }

  async update(id: string, userId: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.creatorId !== userId) {
      throw new ForbiddenException(
        'Only the event creator can update this event',
      );
    }

    Object.assign(event, {
      ...updateEventDto,
      date: updateEventDto.date ? new Date(updateEventDto.date) : event.date,
    });

    await this.eventRepository.save(event);

    return event;
  }

  async remove(id: string, userId: string) {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.creatorId !== userId) {
      throw new ForbiddenException(
        'Only the event creator can delete this event',
      );
    }

    await this.eventRepository.remove(event);

    return { message: 'Event deleted successfully' };
  }

  async createRecommendations(id: string, userId: string) {
    const event = await this.findOne(id, userId);

    // This is a stub - actual recommendation logic will be implemented later
    return {
      message: 'Recommendations created for event',
      eventId: event.id,
    };
  }

  async getRecommendations(id: string, userId: string) {
    const event = await this.findOne(id, userId);

    // This is a stub - actual recommendations will be fetched later
    return {
      eventId: event.id,
      recommendations: [],
    };
  }
}
