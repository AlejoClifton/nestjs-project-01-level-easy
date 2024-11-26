import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsIn, IsString, MinLength } from 'class-validator';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(5, { message: 'El título debe tener al menos 5 caracteres' })
    title: string;

    @Column()
    description: string;

    @Column()
    @IsIn(['pending', 'complete'], { message: 'El estado debe ser "pending" o "complete"' })
    state: string;
}
