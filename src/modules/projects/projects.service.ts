import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      ownerId: userId,
    });
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
    isAdmin: boolean,
  ): Promise<Project> {
    const project = await this.findOne(id);

    // Check if user is the owner or an admin
    if (project.ownerId !== userId && !isAdmin) {
      throw new ForbiddenException('You are not allowed to update this project');
    }

    this.projectRepository.merge(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(id: string, userId: string, isAdmin: boolean): Promise<void> {
    const project = await this.findOne(id);

    // Check if user is the owner or an admin
    if (project.ownerId !== userId && !isAdmin) {
      throw new ForbiddenException('You are not allowed to delete this project');
    }

    await this.projectRepository.remove(project);
  }
}