import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createInvestmentDto: CreateInvestmentDto, userId: string): Promise<Investment> {
    const project = await this.projectsService.findOne(createInvestmentDto.projectId);

    if (project.ownerId === userId) {
      throw new BadRequestException('You cannot invest in your own project');
    }

    const investment = this.investmentRepository.create({
      ...createInvestmentDto,
      investorId: userId,
    });

    return this.investmentRepository.save(investment);
  }

  async findAll(): Promise<Investment[]> {
    return this.investmentRepository.find({
      relations: ['investor', 'project'],
    });
  }

  async findOne(id: string): Promise<Investment> {
    const investment = await this.investmentRepository.findOne({
      where: { id },
      relations: ['investor', 'project'],
    });

    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }

    return investment;
  }

  async findByInvestor(investorId: string): Promise<Investment[]> {
    return this.investmentRepository.find({
      where: { investorId },
      relations: ['project'],
    });
  }

  async findByProject(projectId: string): Promise<Investment[]> {
    return this.investmentRepository.find({
      where: { projectId },
      relations: ['investor'],
    });
  }

  async remove(id: string, userId: string, isAdmin: boolean): Promise<void> {
    const investment = await this.findOne(id);

    if (investment.investorId !== userId && !isAdmin) {
      throw new ForbiddenException('You are not allowed to delete this investment');
    }

    await this.investmentRepository.remove(investment);
  }
}