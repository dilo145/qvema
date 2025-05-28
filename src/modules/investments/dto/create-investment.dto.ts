import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty({
    description: 'Project ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'Investment amount in USD',
    example: 10000,
  })
  @IsNumber()
  @Min(1)
  amount: number;
}
