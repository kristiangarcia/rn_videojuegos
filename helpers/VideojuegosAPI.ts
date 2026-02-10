import { Sistemas, Videojuegos, DatosFormularioVideojuego, Videojuego } from "@/model/Types";
import { Platform } from "react-native";
import axios from "axios"
import uuid from "react-native-uuid"

const IP = Platform.OS==="android" ? "10.0.2.2" : "localhost"

export async function consultarSistemas():Promise<Sistemas>{
    const url = `http://${IP}:3000/sistemas`
    const respuesta = await axios.get(url)
    return respuesta.data
}

export async function consultarVideojuegos():Promise<Videojuegos>{
    const url = `http://${IP}:3000/videojuegos?_embed=sistema`
    const respuesta = await axios.get(url)
    return respuesta.data.map((v:any) => ({
        id:v.id,
        datos: {
            nombre:v.nombre,
            marca:v.marca,
            descripcion:v.descripcion,
            caratula:v.caratula,
            año:v.año,
            prestado:v.prestado,
            sistema:v.sistema
        }
    }))
}

export async function borrarVideojuego(id:string){
    const url = `http://${IP}:3000/videojuegos/${id}`
    await axios.delete(url)
}

export async function crearVideojuego(datos:DatosFormularioVideojuego):Promise<Videojuego>{
    const url = `http://${IP}:3000/videojuegos`
    const respuesta = await axios.post(url,{
        id:uuid.v4(),
        nombre:datos.nombre,
        marca:datos.marca,
        descripcion:datos.descripcion,
        caratula:datos.caratula,
        año:datos.año,
        prestado:datos.prestado,
        sistemaId:datos.sistema.id
    })
    return {
        id:respuesta.data.id,
        datos:respuesta.data
    }
}

export async function modificarVideojuego(id:string,datos:DatosFormularioVideojuego):Promise<Videojuego>{
    const url = `http://${IP}:3000/videojuegos/${id}`
    const respuesta = await axios.put(url,{
        id:id,
        nombre:datos.nombre,
        marca:datos.marca,
        descripcion:datos.descripcion,
        caratula:datos.caratula,
        año:datos.año,
        prestado:datos.prestado,
        sistema:datos.sistema
    })
    return {
        id:respuesta.data.id,
        datos:respuesta.data
    }
}

export async function prestarVideojuego(videojuego:Videojuego,nombrePersona:string):Promise<Videojuego>{
    const datosModificados = {
        nombre:videojuego.datos.nombre,
        marca:videojuego.datos.marca,
        descripcion:videojuego.datos.descripcion,
        caratula:videojuego.datos.caratula,
        año:videojuego.datos.año,
        prestado:nombrePersona,
        sistema:videojuego.datos.sistema
    }
    return modificarVideojuego(videojuego.id,datosModificados)
}

export async function devolverVideojuego(videojuego:Videojuego):Promise<Videojuego>{
    return prestarVideojuego(videojuego,"")
}