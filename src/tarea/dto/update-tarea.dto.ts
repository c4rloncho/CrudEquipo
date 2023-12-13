import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsNumber()
  id: number;

  @IsString()
  estado: string;
}

export class UpdateTasksStatusesDto {
  @IsArray()
  @IsNotEmpty()
  updatedTasks: UpdateTaskStatusDto[];
}
