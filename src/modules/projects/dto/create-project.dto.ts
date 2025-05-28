import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project title',
    example: 'Eco-friendly Packaging Solution',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Project description',
    example: 'An innovative packaging solution that is 100% biodegradable',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Project budget in USD',
    example: 50000,
  })
  @IsNumber()
  @Min(1)
  budget: number;

  @ApiProperty({
    description: 'Project category',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
