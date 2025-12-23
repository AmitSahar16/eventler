import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { EventType } from '../enums/event.enums';

export class CreateEventDto {
  @IsEnum(EventType)
  type: EventType;

  @IsUUID()
  @IsOptional()
  groupId?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  budget?: number;
}
