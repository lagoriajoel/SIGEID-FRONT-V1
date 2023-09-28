import { CursoInforme } from "./cursoInforme";

export interface MateriasCursoDto {
    asignatura_id:number
    nombre: string;
    anioCurso:string;
    cicloLectivo:string;
    tecnicatura:string;
    curso: CursoInforme;
    profesor: null;

}