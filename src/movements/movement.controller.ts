import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindOneOptions } from 'typeorm';
import { Movement } from './entities/movement.entity';

@ApiTags('movements')
@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.create(createMovementDto);
  }

  @Get()
  findAll() {
    return this.movementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: FindOneOptions<Movement>) {
    return this.movementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: FindOneOptions<Movement>,
    @Body() updateMovementDto: UpdateMovementDto,
  ) {
    return this.movementService.update(id, updateMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementService.remove(id);
  }
}
