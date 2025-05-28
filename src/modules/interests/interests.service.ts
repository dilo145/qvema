import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createInterestDto: CreateInterestDto): Promise<Interest> {
    const interest = this.interestRepository.create(createInterestDto);
    return this.interestRepository.save(interest);
  }

  async findAll(): Promise<Interest[]> {
    return this.interestRepository.find();
  }

  async findOne(id: string): Promise<Interest> {
    const interest = await this.interestRepository.findOne({ where: { id } });
    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
    return interest;
  }

  async findByIds(ids: string[]): Promise<Interest[]> {
    return this.interestRepository.findBy({ id: In(ids) });
  }

  async getUserInterests(userId: string): Promise<Interest[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.interests;
  }

  async addInterestsToUser(
    userId: string,
    interestNames: string[],
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const interests = await this.interestRepository.find({
      where: { name: In(interestNames) },
    });

    if (interests.length !== interestNames.length) {
      throw new NotFoundException('One or more interests not found');
    }

    if (!user.interests) {
      user.interests = [];
    }

    const existingInterestIds = user.interests.map((interest) => interest.id);
    for (const interest of interests) {
      if (!existingInterestIds.includes(interest.id)) {
        user.interests.push(interest);
      }
    }

    return this.userRepository.save(user);
  }
}
