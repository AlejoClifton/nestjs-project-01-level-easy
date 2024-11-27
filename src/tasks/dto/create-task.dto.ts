import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({
        description: 'El título de la tarea',
        minLength: 5,
    })
    @IsString()
    @MinLength(5)
    title: string;

    @ApiProperty({ description: 'La descripción de la tarea', required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ description: 'La descripción de la tarea', required: false })
    @IsIn(['pending', 'complete'], { message: 'El estado debe ser "active" o "inactive"' })
    @IsOptional()
    @IsString()
    state: string;
}
