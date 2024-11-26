import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @ApiOperation({ summary: 'Crear una tarea' })
    @ApiResponse({ status: 201, description: 'La tarea fue creada exitosamente.' })
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las tareas' })
    @ApiResponse({ status: 200, description: 'Listado de todas las tareas.' })
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID de la tarea' })
    @ApiOperation({ summary: 'Obtener una tarea por ID' })
    @ApiResponse({ status: 200, description: 'Una tarea.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', description: 'ID de la tarea' })
    @ApiOperation({ summary: 'Actualizar una tarea' })
    @ApiResponse({ status: 200, description: 'La tarea fue actualizada.' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'ID de la tarea' })
    @ApiOperation({ summary: 'Eliminar una tarea por ID' })
    @ApiResponse({ status: 200, description: 'Se elimina la tarea por ID' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.remove(id);
    }
}
