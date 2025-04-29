import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('interests')
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all interests' })
  @ApiResponse({ status: 200, description: 'Return all interests' })
  findAll() {
    return this.interestsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new interest' })
  @ApiResponse({ status: 201, description: 'Interest successfully created' })
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add interests to user' })
  @ApiResponse({ status: 200, description: 'Interests added to user' })
  addInterestsToUser(@Body() interestIds: string[], @Request() req) {
    return this.interestsService.addInterestsToUser(req.user.id, interestIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's interests" })
  @ApiResponse({ status: 200, description: "Return user's interests" })
  getUserInterests(@Request() req) {
    return this.interestsService.getUserInterests(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('projects/recommended')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get recommended projects based on interests' })
  @ApiResponse({ status: 200, description: 'Return recommended projects' })
  getRecommendedProjects(@Request() req) {
    return this.interestsService.getRecommendedProjects(req.user.id);
  }
}