export type Sistema = {
    id:string
    nombre:string
    icono:string
}

export type Videojuego = {
    id:string
    datos:DatosFormularioVideojuego
}

export type DatosFormularioVideojuego = {
    nombre:string
    marca:string
    descripcion:string
    caratula:string
    año:number
    prestado:string
    sistema:Sistema
}

export type Sistemas = Array<Sistema>

export type Videojuegos = Array<Videojuego>