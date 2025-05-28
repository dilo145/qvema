import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from '../projects/projects.service';

@ApiTags('investments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(
    private readonly investmentsService: InvestmentsService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @Roles('investor')
  @ApiOperation({ summary: 'Create a new investment' })
  @ApiResponse({ status: 201, description: 'Investment successfully created' })
  create(@Body() createInvestmentDto: CreateInvestmentDto, @Request() req) {
    return this.investmentsService.create(createInvestmentDto, req.user.id);
  }

  @Get()
  @Roles('investor')
  @ApiOperation({ summary: "Get investor's investments" })
  @ApiResponse({ status: 200, description: "Return investor's investments" })
  findAll(@Request() req) {
    return this.investmentsService.findByInvestor(req.user.id);
  }

  @Get('project/:id')
  @ApiOperation({ summary: 'Get investments for a project' })
  @ApiResponse({ status: 200, description: 'Return investments for a project' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  async getProjectInvestments(@Param('id', ParseUUIDPipe) projectId: string, @Request() req) {
    const project = await this.projectsService.findOne(projectId);
    const isAdmin = req.user.role === 'admin';

    if (project.ownerId !== req.user.id && !isAdmin) {
      throw new ForbiddenException('You are not allowed to view these investments');
    }

    return this.investmentsService.findByProject(projectId);
  }

  @Delete(':id')
  @Roles('investor')
  @ApiOperation({ summary: 'Delete an investment' })
  @ApiResponse({ status: 200, description: 'Investment successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 404, description: 'Investment not found' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const isAdmin = req.user.role === 'admin';
    return this.investmentsService.remove(id, req.user.id, isAdmin);
  }
}