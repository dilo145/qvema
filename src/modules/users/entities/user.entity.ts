import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'Unique identifier',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  @Column({ nullable: true })
  firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @Column({ nullable: true })
  lastname: string;

  @ApiProperty({
    description: 'User role',
    enum: ['entrepreneur', 'investor', 'admin'],
    example: 'entrepreneur',
  })
  @Column({ default: 'entrepreneur' })
  role: 'entrepreneur' | 'investor' | 'admin';

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}
