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
