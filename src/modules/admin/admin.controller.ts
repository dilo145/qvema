import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { InvestmentsService } from '../investments/investments.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly investmentsService: InvestmentsService,
  ) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete a user (admin only)' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Get('investments')
  @ApiOperation({ summary: 'Get all investments (admin only)' })
  @ApiResponse({ status: 200, description: 'Return all investments' })
  getAllInvestments() {
    return this.investmentsService.findAll();
  }
}