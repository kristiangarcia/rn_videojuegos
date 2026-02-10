import { FlatList, View, useColorScheme } from 'react-native'
import React from 'react'
import { useListaVideojuegos } from '@/store/ListaVideojuegosStore'
import { Videojuego } from '@/model/Types'
import VideojuegoCard from '@/components/VideojuegoCard'
import { temaOscuro } from '@/themes/TemaOscuro'
import { temaClaro } from '@/themes/TemaClaro'
import { useVideojuegoSeleccionado, VIDEOJUEGO_NULO } from '@/store/VideojuegoSeleccionadoStore'
import { Stack, useRouter } from 'expo-router'
import { IconButton } from 'react-native-paper'
import { devolverVideojuego } from '@/helpers/VideojuegosAPI'

export default function Inicio() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const tema = colorScheme === 'dark' ? temaOscuro : temaClaro;
    const { listaVideojuegos, setListaVideojuegos } = useListaVideojuegos()
    const { videojuegoSeleccionado, setVideojuegoSeleccionado } = useVideojuegoSeleccionado()

    function accionNuevoVideojuego(){
        setVideojuegoSeleccionado(VIDEOJUEGO_NULO)
        router.push('/operaciones/editar')
    }
    function accionDevolverVideojuego(videojuego: Videojuego) {
        devolverVideojuego(videojuego);
        setVideojuegoSeleccionado(VIDEOJUEGO_NULO);
        router.push('/inicio');
    }
    function accionPrestarVideojuego(videojuego: Videojuego){
        setVideojuegoSeleccionado(videojuego)
        router.push('/prestamo')
    }
    function accionVerVideojuego(videojuego: Videojuego) {
        setVideojuegoSeleccionado(videojuego)
        router.push('/operaciones/detalle')
    }
    function getFlatListItem(videojuego: Videojuego) {
        return VideojuegoCard(videojuego, accionPrestarVideojuego, accionDevolverVideojuego, accionVerVideojuego, tema.colors.primary)
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Inicio',
                    animation: 'fade',
                    headerStyle: { backgroundColor: tema.colors.primary },
                    headerTintColor: tema.colors.onPrimary,
                    headerRight: () => (
                        <IconButton
                            icon="plus"
                            iconColor={tema.colors.onPrimary}
                            size={24}
                            onPress={accionNuevoVideojuego}
                        />
                    ),
                }}
            />
            <View className='flex-1'>
                <FlatList
                    data={listaVideojuegos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => getFlatListItem(item)}
                />
            </View>
        </>
    )
}