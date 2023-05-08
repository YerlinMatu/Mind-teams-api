import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Account {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  clientName: string;

  @Column()
  operationManagerName: string;
}
