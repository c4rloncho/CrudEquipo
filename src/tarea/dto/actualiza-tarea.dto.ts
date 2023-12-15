import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarTareaDto {
  @IsOptional() // Permite que esta propiedad sea opcional al actualizar
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  responsable?: string;
}
