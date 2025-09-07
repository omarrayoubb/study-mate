// create an index on username or email to fastly retrive cols after studying more in DB
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
export enum UserRole {
  ADMIN = 'admin',
  GENERAL = 'general',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GENERAL })
  role: UserRole;
}
