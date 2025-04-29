import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

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