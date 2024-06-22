
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

/*  classe base para heranças das entities
    nela possui todos os campos que são comuns em todas tabelas
*/

export abstract class  MyBaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({type: 'datetime', default: () => 'GETDATE()', onUpdate: 'GETDATE()' })
  updated_at: Date;


  // start a entidade com id já criado
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
