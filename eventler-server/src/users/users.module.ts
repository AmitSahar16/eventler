import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../auth/entities/user.entity';
import { UserPreferences } from './entities/user-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPreferences])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
