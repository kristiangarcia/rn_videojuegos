import { Router } from "expo-router";

export function navegarError(router:Router,error:string,descripcion?:string) {
    router.push({
        pathname:'/error',
        params:{error,descripcion}
    })
}