import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.teamRepository.create(createTeamDto);
    return await this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async findOne(id: FindOneOptions<Team>): Promise<Team> {
    return await this.teamRepository.findOne(id);
  }

  async update(
    id: FindOneOptions<Team>,
    updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    const team = await this.teamRepository.findOne(id);
    if (!team) {
      throw new Error(`Team with id ${id} not found`);
    }
    this.teamRepository.merge(team, updateTeamDto);
    return await this.teamRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
