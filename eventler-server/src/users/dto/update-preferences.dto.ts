import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePreferencesDto {
  @IsNumber()
  @IsOptional()
    budget?: number;

  @IsString()
  @IsOptional()
    location?: string;

  @IsString()
  @IsOptional()
    eventType?: string;

  @IsString()
  @IsOptional()
    atmosphere?: string;

  @IsString()
  @IsOptional()
    transportation?: string;
}
