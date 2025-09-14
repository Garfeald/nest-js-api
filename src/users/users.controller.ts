import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @ApiOperation({ summary: 'Creating users' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({ summary: 'Getting all users' })
    @ApiResponse({ status: 200, type: Array<User> })
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

}
