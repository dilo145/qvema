import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'User email address' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'User first name' })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional({ description: 'User last name' })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional({
    description: 'User role',
    enum: ['entrepreneur', 'investor', 'admin'],
    example: 'entrepreneur',
  })
  @IsEnum(['entrepreneur', 'investor', 'admin'], {
    message: 'Role must be either entrepreneur, investor, or admin',
  })
  @IsOptional()
  role?: 'entrepreneur' | 'investor' | 'admin';
}
