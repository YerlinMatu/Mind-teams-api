import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Movement {
  @ObjectIdColumn()
  id: string;

  @Column()
  user: User;

  @Column()
  sourceTeam: Team;

  @Column()
  destinationTeam: Team;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
