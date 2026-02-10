import { Videojuegos } from "@/model/Types"
import { create } from "zustand"

type ListaVideojuegosStore = {
    listaVideojuegos:Videojuegos
    setListaVideojuegos:(listaVideojuegos:Videojuegos)=>void
}

export const useListaVideojuegos = create<ListaVideojuegosStore>( set => ({
    listaVideojuegos: [],
    setListaVideojuegos: (l: Videojuegos) => {
        set({ listaVideojuegos: l })
    }
}))