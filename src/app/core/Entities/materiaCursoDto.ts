import { CursoInforme } from "./cursoInforme";

export interface MateriasCursoDto {
    asignatura_id:number
    nombre: string;
    anioCurso:string;
    cicloLectivo:string;
    curso: CursoInforme;
    profesor: null;

}