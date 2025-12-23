import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { EventStatus } from '../enums/event.enums';

export class UpdateEventDto {
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

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
