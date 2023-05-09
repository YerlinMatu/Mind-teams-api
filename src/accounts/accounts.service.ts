import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountsRepository.create(createAccountDto);
    return await this.accountsRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return await this.accountsRepository.find();
  }

  async findOne(id: FindOneOptions<Account>): Promise<Account> {
    return await this.accountsRepository.findOne(id);
  }

  async update(
    id: FindOneOptions<Account>,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountsRepository.findOne(id);
    this.accountsRepository.merge(account, updateAccountDto);
    return await this.accountsRepository.save(account);
  }

  async remove(id: string): Promise<void> {
    await this.accountsRepository.delete(id);
  }
}
