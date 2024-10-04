import { contenidoAdeudadoDto } from "./contenidoAdeudadoDto";

export interface infoMesaDto {
    numInstancia: number;
    presidenteMesa: string;
    fechaMesa: string;
    contenidos:contenidoAdeudadoDto[]
}