import { Videojuego } from "@/model/Types"
import { create } from "zustand"

type VideojuegoSeleccionadoStore = {
    videojuegoSeleccionado:Videojuego
    setVideojuegoSeleccionado:(videojuegoSeleccionado:Videojuego)=>void
}

const sistemaNulo = {
    id: "",
    nombre: "",
    logotipo: "",
}

const datosNulos = {
    nombre: "",
    marca: "",
    descripcion: "",
    caratula: "",
    año: 0,
    prestado: "",
    sistema: sistemaNulo
}
export const VIDEOJUEGO_NULO = {
    id: "",
    datos: datosNulos
}

export const useVideojuegoSeleccionado = create<VideojuegoSeleccionadoStore>( set => ({
    videojuegoSeleccionado:VIDEOJUEGO_NULO,
    setVideojuegoSeleccionado:(v:Videojuego) => {
        set({ videojuegoSeleccionado:v })
    }
}))