// create-comentario.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  @IsString()
  contenido: string;
}
