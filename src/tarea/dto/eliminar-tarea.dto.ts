// eliminar-tarea.dto.ts
import { IsNumber } from 'class-validator';

export class EliminarTareaDto {
  @IsNumber()
  id: number;
}
