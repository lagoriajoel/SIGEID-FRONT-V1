import { cursoAlumno } from './cursoAlumno';
import { CursoDto } from "./CursoDto";
import { Informes } from './informe';
import { InformesAlumnoDto } from './InformeAlumnoDto';

export interface Alumno {
  id: number;
  dni: string;
  nombres: string;
  apellido: string;
  email: string;
  curso: cursoAlumno;
  informeDesempenios : InformesAlumnoDto[]
}
