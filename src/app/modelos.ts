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
}

export interface Asignatura{
    idMateria: number;
    nombre:string;
    creditos: number;
}

export interface Carrera{
    idCarrera: number;
    descripcion:string;
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

export interface Grupo{
    idCarrera: number;
    idSubCiclo: number;
    idCiclo: number;
    idDocente: number;
    idGrupo: number;
    idGrupoAnt: number;
    idMateria: number;
    idPeriodo: number;
    idSeccion: number;
}

export interface Aula{
    idAula:number;
    idEdificio:number;
    descripcion:string;
    estatus:number;
    edificio:string;
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
