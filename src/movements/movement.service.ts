import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Between,
  ILike,
  FindOneOptions,
  FindOptionsOrder,
} from 'typeorm';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Movement } from './entities/movement.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}

  async create(createMovementDto: CreateMovementDto): Promise<Movement> {
    const movement = this.movementRepository.create(createMovementDto);
    return await this.movementRepository.save(movement);
  }

  async findAll(
    team?: string,
    name?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Movement[]> {
    const filter: any = {};

    if (team) filter.team = team;
    if (name) filter.name = ILike(`%${name}%`);
    if (startDate && endDate) filter.createdAt = Between(startDate, endDate);

    const movements = await this.movementRepository.find({
      where: filter,
      order: { createdAt: 'ASC' } as FindOptionsOrder<Movement>,
    });

    return movements;
  }

  async findOne(id: FindOneOptions<Movement>): Promise<Movement> {
    return await this.movementRepository.findOne(id);
  }

  async update(
    id: FindOneOptions<Movement>,
    updateMovementDto: UpdateMovementDto,
  ): Promise<Movement> {
    const movement = await this.movementRepository.findOne(id);
    this.movementRepository.merge(movement, updateMovementDto);
    return await this.movementRepository.save(movement);
  }

  async remove(id: string): Promise<void> {
    await this.movementRepository.delete(id);
  }
}
