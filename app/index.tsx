import { useColorScheme, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import { Icon, Text } from 'react-native-paper'
import { useRouter } from 'expo-router';
import { temaOscuro } from '@/themes/TemaOscuro';
import { temaClaro } from '@/themes/TemaClaro';
import { useListaVideojuegos } from '@/store/ListaVideojuegosStore';
import { consultarVideojuegos } from '@/helpers/VideojuegosAPI';
import { navegarError } from '@/nav/Navegacion';

export default function Index() {
    const router = useRouter();
    const {listaVideojuegos, setListaVideojuegos} = useListaVideojuegos()
    const colorScheme = useColorScheme();
    const tema = colorScheme === 'dark' ? temaOscuro : temaClaro;

    useEffect( () => accionConsultarVideojuegos(),[] )

    function accionConsultarVideojuegos(){
        consultarVideojuegos()
        .then((listaVideojuegos) => {
            setListaVideojuegos(listaVideojuegos)
            router.replace('/inicio')
        })
        .catch((error) => {
            navegarError(router,"No se pudo cargar la lista de videojuegos",error.toString())
        })
    }

    return (
        <LinearGradient style={{ flex: 1 }} colors={['#0F2027', '#203A43', '#2C5364']}>
            <View className='flex-1 justify-center items-center'>
                <View className='bg-white/[0.08] p-28 rounded-32 mb-24'>
                    <Icon size={96} source={"sword-cross"} color={tema.colors.primary} />
                </View>
                <Text variant='displaySmall' className='text-white w-700'>Mis Videojuegos</Text>
                <Text variant='titleMedium' className='text-white/[0.75] mt-8'>Gestiona tu coleccion</Text>
            </View>
        </LinearGradient>
    )
}