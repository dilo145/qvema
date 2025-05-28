import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestDto {
  @ApiProperty({
    description: 'Interest name',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
