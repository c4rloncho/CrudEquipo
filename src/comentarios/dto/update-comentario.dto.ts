import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {

    @IsNotEmpty()
    @IsString()
    nuevoContenido: string;
}

