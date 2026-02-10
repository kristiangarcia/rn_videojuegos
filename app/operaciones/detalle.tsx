import { View, useColorScheme, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useVideojuegoSeleccionado, VIDEOJUEGO_NULO } from '@/store/VideojuegoSeleccionadoStore'
import { temaOscuro } from '@/themes/TemaOscuro';
import { temaClaro } from '@/themes/TemaClaro';
import { Image } from 'expo-image'
import { Card, Chip, Icon, IconButton, Text } from 'react-native-paper';
import { borrarVideojuego } from '@/helpers/VideojuegosAPI';
import { Stack, router } from 'expo-router';
import { useListaVideojuegos } from '@/store/ListaVideojuegosStore';
import { navegarError } from '@/nav/Navegacion';

export default function Detalle() {
    const colorScheme = useColorScheme();
    const tema = colorScheme === 'dark' ? temaOscuro : temaClaro;
    const { videojuegoSeleccionado, setVideojuegoSeleccionado } = useVideojuegoSeleccionado()
    const {listaVideojuegos, setListaVideojuegos} = useListaVideojuegos()

    function accionBorrarVideojuego(id:string) {
        Alert.alert(
            'Borrar videojuego',
            '¿Estás seguro de que quieres borrar este videojuego?',
            [
                {
                    text:'Cancelar',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel'
                },
                {
                    text:'Borrar',
                    onPress: () => {
                        borrarVideojuego(id)
                        .then(() => {
                            setListaVideojuegos(
                                listaVideojuegos.filter((v) => v.id !== videojuegoSeleccionado.id))
                                setVideojuegoSeleccionado(VIDEOJUEGO_NULO)
                                router.back()
                        })
                        .catch((error) => navegarError(router,'Error al borrar videojuego',error.toString()))
                    },
                    style: 'destructive'
                }
            ]
        )
    }
    return (
        <>
        <Stack.Screen
            options={{
                title: 'Detalle',
                headerTitle:videojuegoSeleccionado.datos.nombre,
                headerBackTitle:'Sony',
                headerRight: () => (
                <View className='flex-row'>
                    <IconButton icon="pencil" size={24} iconColor={tema.colors.onPrimary} onPress={() => router.push('/operaciones/editar')}/>
                    <IconButton icon="delete" size={24} iconColor={tema.colors.onPrimary}/>
                </View>),
                animation: 'none',
                headerStyle: { backgroundColor: tema.colors.primary },
                headerTintColor: tema.colors.onPrimary,
            }}
        />
        <View style={{ backgroundColor: tema.colors.background }} className='flex-1'>
            <ScrollView>
                <Image
                    source={videojuegoSeleccionado.datos.caratula}
                    style={{width:'100%',height:280,backgroundColor:tema.colors.elevation.level1}}
                />
                <Card>
                    <Card.Content>
                        <Text variant='headlineSmall'>{videojuegoSeleccionado.datos.nombre}</Text>
                        <Text variant='bodyMedium'>{videojuegoSeleccionado.datos.marca} {videojuegoSeleccionado.datos.año}</Text>
                        <View className='flex-row'>
                            <Icon source={videojuegoSeleccionado.datos.sistema.logotipo} size={32} color={tema.colors.primary}></Icon>
                            <Text variant='bodyMedium'>{videojuegoSeleccionado.datos.sistema.nombre}</Text>
                        </View>
                        {
                            videojuegoSeleccionado.datos.prestado !== ""
                                ? <Chip>Prestado a {videojuegoSeleccionado.datos.prestado}</Chip>
                                : <Chip><Icon source={'check-outlined'} size={32}/>Disponible</Chip>
                        }
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Text variant='titleMedium'>Descripcion</Text>
                        <Text variant='bodyMedium'>{videojuegoSeleccionado.datos.descripcion}</Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
        </>
    )
}