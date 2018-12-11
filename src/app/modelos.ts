import { Time } from "@angular/common";

export interface calificacion{
    idConfCalificacion:number;
    idAlumno:number;
    calificacion:number;
    idGrupo:number;
}

export interface Candidato{
    idCandidato:number;
    nombre:string;
    apellidoP:string;
    apellidoM:string;
    fechaNac:string;
    email:string;
    telefono:string;
    celular:string;
    curp:string;
    sexo:number;
    idMunicipio:number;
    colonia:string;
    calle:string;
    numero:string;
    cp:string;
    urlImagen:string;
    idEscuela:string;
    cardexDoc:string;
    actaNacDoc:string;
    comprobanteDoc:string;
    credencialDoc:string;
}

export interface Escuela{
    idEscuela: number;
    idSeccion: number;
    clave: string;
    nombre: string;
    idMunicipio: number;
    colonia: string;
    calle: string;
    cp: string;
    numero: string;
    email:string;
    telefono: string;
    estatus: number;
}

export interface Edificio{
    idEdificio:number;
    descripcion:string;
    idEscuela:number;
    estatus:number; 
}

export interface Aviso{
    idAviso: number;
    mensaje:string;
    titulo: string;
    fechaFin: string;
    fechaIni: string;
    idEscuela: string;
    idTipo: number;
}

export interface Asignatura{
    idMateria: number;
    nombre:string;
    creditos: number;
    idEscuela:number;
}

export interface AsignaturaPeriodo{
    idMateria: number;
    idCarrera: number;
    idSeccion: number;
    idPeriodo: number;
}

export interface Carrera{
    idCarrera: number;
    descripcion:string;
    precio: number;
    idEscuela:number;
    estatus:number;
}

export interface Ciclo{
    idCiclo: number;
    descripcion:string;
    fechaFin: string;
    fechaIni: string;
    idEscuela: string;
}

export interface Subciclo{
    idCiclo: number;
    idSubCiclo: number;
    descripcion:string;
    fechaFin: string;
    fechaIni: string;
}
export interface Horario{
   idHorario:number;
   diaSemana:string[];
   idAula:number;
   idGrupo:number;
   horaIni:Time;
   horaFin:Time;
}

export interface Grupo{
    idGrupo: number;
    clave: string;
    idCiclo: number;
    idSubCiclo: number;
    idSeccion: number;
    idPeriodo: number;
    idCarrera: number;
    idMateria: number;
    idDocente: number;
    idGrupoAnt: number;
    idEscuela:number;
}

export interface Aula{
    idAula:number;
    idEdificio:number;
    descripcion:string;
    estatus:number;
    edificio:string;
}

export interface Periodo{
    idPeriodo:number;
    idSeccion:number;
    descripcion:string;
    idCarrera:number;
}

export interface Docente{
    idDocente:number,
    nombre:string,
    apellidoP:string,
    apellidoM:string,
    fechaNac:string,
    nss:string,
    telefono:string,
    titulo:string,
    curp:string,
    sexo:string,
    idMunicipio:number,
    colonia:string,
    calle:string,
    numero:string,
    cp:string,
    urlImagen:string,
    usuarioId:number
    estatus:number,
    escuelaId:number,
    idUsuario:number,
    idTipo:number,
    usuario:string,
    contrasena:string

}

export interface Administrador{
    idAdministrador:number,
	nombre:string,
	apellidoP:string,
	apellidoM:string,
    email:string,
    contrasena:string,
    idUsuario:number,
    idEscuela,
    estatus:number,
    imagen:string
}
export interface Seccion{
    idSeccion:number;
    descripcion:string;
}

export interface Estado{
    idEstado:number;
    nombre:string;
}

export interface Municipio{
    idMunicipio:number;
    idEStado:number;
    clave:string;
    nombre:string;
    activo:number;
}
