import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Team {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  members: User[];
}
