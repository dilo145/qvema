import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { InterestsService } from '../interests/interests.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiOkResponse({
    description: 'List of all users',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({
    description: 'User profile information',
    type: User,
  })
  getProfile(@Request() req: RequestWithUser) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiOkResponse({
    description: 'User profile has been updated',
    type: User,
  })
  updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  @ApiOkResponse({
    description: 'The user has been found',
    type: User,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by ID (admin only)' })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('interests')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add interests to current user' })
  @ApiOkResponse({
    description: 'Interests added to user',
  })
  addInterestsToUser(
    @Body() interestName: string[],
    @Request() req: RequestWithUser,
  ) {
    //get interest IDs from names
    const interestIds = interestName.map((name) => name.trim());
    return this.interestsService.addInterestsToUser(req.user.id, interestIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('interests')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user interests' })
  @ApiOkResponse({
    description: 'Return user interests',
  })
  getUserInterests(@Request() req: RequestWithUser) {
    return this.interestsService.getUserInterests(req.user.id);
  }
}
