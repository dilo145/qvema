import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import TypeOrmModule here
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService so it can be used by other modules
})
export class UsersModule {}
