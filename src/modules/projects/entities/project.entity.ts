import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Project {
  @ApiProperty({
    description: 'Unique identifier',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Project title',
    example: 'Eco-friendly Packaging Solution',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Project description',
    example: 'An innovative packaging solution that is 100% biodegradable',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'Project budget in USD',
    example: 50000,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  @ApiProperty({
    description: 'Project category',
    example: 'Technology',
  })
  @Column()
  category: string;

  @ApiProperty({
    description: 'Project owner ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @Column()
  ownerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}