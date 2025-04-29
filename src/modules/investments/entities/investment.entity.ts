import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class Investment {
  @ApiProperty({
    description: 'Unique identifier',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Investor ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @Column()
  investorId: string;

  @ApiProperty({
    description: 'Project ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @Column()
  projectId: string;

  @ApiProperty({
    description: 'Investment amount in USD',
    example: 10000,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ description: 'Investment timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investor: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}