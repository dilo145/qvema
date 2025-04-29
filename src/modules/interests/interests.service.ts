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

  async addInterestsToUser(userId: string, interestIds: string[]): Promise<User> {
    // Find user
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Find interests
    const interests = await this.findByIds(interestIds);

    if (interests.length !== interestIds.length) {
      throw new NotFoundException('One or more interests not found');
    }

    // Add interests to user
    if (!user.interests) {
      user.interests = [];
    }

    // Merge existing interests with new ones
    const existingInterestIds = user.interests.map(interest => interest.id);
    for (const interest of interests) {
      if (!existingInterestIds.includes(interest.id)) {
        user.interests.push(interest);
      }
    }

    return this.userRepository.save(user);
  }

  async getRecommendedProjects(userId: string): Promise<any[]> {
    // This is a simplified recommendation algorithm
    // In a real system, you would use more sophisticated methods
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Get user interests categories
    const interestCategories = user.interests.map(interest => interest.name);

    // Find projects in these categories
    const query = this.interestRepository
      .createQueryBuilder('interest')
      .innerJoin('interest.projects', 'project')
      .where('interest.name IN (:...categories)', { categories: interestCategories })
      .select(['project.id', 'project.title', 'project.description', 'project.budget', 'project.category']);

    const projects = await query.getMany();

    return projects;
  }
}