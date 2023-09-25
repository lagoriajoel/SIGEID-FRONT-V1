import { AlumnoInforme } from "./alumnoInforme";
import { contenidoAdeudadoDto } from "./contenidoAdeudadoDto";
import { criterioDto } from "./criterioDTO";
import { estrategiaDto } from "./estrategiaDto";
import { MateriaContenido } from "./materiaContenido";
import { MateriasDto } from "./materias";

export interface InformesHistorial {
    id: number;
    criteriosEvaluacion: criterioDto[]
    estrategiasEvaluacion: estrategiaDto[]
    profesorNombre: string;
    asignatura: MateriasDto;
    alumno: AlumnoInforme
    contenidosAdeudados: contenidoAdeudadoDto []
    fechaInstancia_1:string
    fechaInstancia_2:string
    fechaInstancia_3:string
    fechaInstancia_4:string
    presidenteMesaInstancia_1:string
    presidenteMesaInstancia_2:string
    presidenteMesaInstancia_3:string
    presidenteMesaInstancia_4:string
    diciembreFebrero:string


}