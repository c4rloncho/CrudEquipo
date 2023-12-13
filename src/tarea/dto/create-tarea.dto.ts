import { IsNotEmpty, IsOptional, IsString, IsInt, IsDate } from 'class-validator';

export class CreateTareaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  proyectoId: number;

  @IsNotEmpty()
  @IsString()
  creador: string;  // El nombre del creador como cadena

  @IsOptional()
  @IsString()
  responsable?: string;  // Nombre del responsable, opcional

  @IsOptional()
  @IsDate()
  fechaInicio?: Date;

  @IsOptional()
  @IsDate()
  fechaTermino?: Date;

  @IsOptional()
  @IsString()
  estado?: string;  // Estado de la tarea, opcional
}