import { Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Card, Button } from 'react-native-paper'
import { prestarVideojuego } from '@/helpers/VideojuegosAPI'
import { useVideojuegoSeleccionado } from '@/store/VideojuegoSeleccionadoStore'
import { Videojuego } from '@/model/Types'
import { navegarError } from '@/nav/Navegacion'

export default function Prestamo() {
    const {videojuegoSeleccionado, setVideojuegoSeleccionado} = useVideojuegoSeleccionado()
    const [persona, setPersona] = useState("")

    function accionRealizarPrestamo() {
        prestarVideojuego(videojuegoSeleccionado,persona)
        .then((videojuego:Videojuego) => {
            setVideojuegoSeleccionado(videojuego)
            router.back()
        })
        .catch((error) => navegarError(router, "Error al prestar videojuego", error.toString()))
    }
    return (
        <Pressable className='flex-1 justify-center bg-[rgba(0,0,0,0.4)]' onPress={router.back} >
            <Pressable >
                <Card>
                    <Card.Content>
                        <Text>Prestar Videojuego</Text>
                        <TextInput onChangeText={setPersona} value={persona} />
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={accionRealizarPrestamo} disabled={persona === ""}>Prestar</Button>
                        <Button onPress={router.back}>Cancelar</Button>
                    </Card.Actions>
                </Card>
            </Pressable>
        </Pressable>
    )
}