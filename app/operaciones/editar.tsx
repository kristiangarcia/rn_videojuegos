import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useVideojuegoSeleccionado, VIDEOJUEGO_NULO } from '@/store/VideojuegoSeleccionadoStore'
import { DatosFormularioVideojuego, Sistema } from '@/model/Types';
import { consultarSistemas, crearVideojuego, modificarVideojuego } from '@/helpers/VideojuegosAPI';
import { navegarError } from '@/nav/Navegacion';
import { useRouter } from 'expo-router';
import { Card, Menu, Icon, HelperText, TextInput, Button } from 'react-native-paper';
import { useListaVideojuegos } from '@/store/ListaVideojuegosStore';

export default function Editar() {
    const router = useRouter();
    const { videojuegoSeleccionado, setVideojuegoSeleccionado } = useVideojuegoSeleccionado();
    const { listaVideojuegos, setListaVideojuegos } = useListaVideojuegos();
    const [nombre, setNombre] = useState(videojuegoSeleccionado.datos.nombre);
    const [marca, setMarca] = useState(videojuegoSeleccionado.datos.marca);
    const [año, setAño] = useState(String(videojuegoSeleccionado.datos.año));
    const [descripcion, setDescripcion] = useState(videojuegoSeleccionado.datos.descripcion);
    const [caratula, setCaratula] = useState(videojuegoSeleccionado.datos.caratula);
    const [prestado, setPrestado] = useState(videojuegoSeleccionado.datos.prestado);
    const [sistema, setSistema] = useState(videojuegoSeleccionado.datos.sistema);
    const [listaSistemas, setListaSistemas] = useState<Sistema[]>([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [nuevoVideojuego, setNuevoVideojuego] = useState(videojuegoSeleccionado.id === VIDEOJUEGO_NULO.id);

    useEffect(() => accionConsultarSistemas(), [])

    function accionConsultarSistemas() {
        consultarSistemas()
            .then((sistemas) => {
                setListaSistemas(sistemas)
            })
            .catch((error) => navegarError(router, 'Error al cargar sistemas', error.toString()))
    }

    function accionModificarVideojuego() {
        año === "0" ? setAño("") : setAño(año)
        const id = videojuegoSeleccionado.id
        const datos: DatosFormularioVideojuego = {
            nombre: nombre,
            marca: marca,
            descripcion: descripcion,
            caratula: caratula,
            año: parseInt(año),
            prestado: prestado,
            sistema: sistema
        }
        modificarVideojuego(id, datos)
            .then(() => {
                setVideojuegoSeleccionado({ id, datos })
                setListaVideojuegos(
                    listaVideojuegos.map(v =>
                        v.id === id
                            ? { ...v, datos: datos }
                            : v
                    )
                )
                router.back()
            })
            .catch((error) => navegarError(router, 'Error al modificar videojuego', error.toString()))
    }

    function accionCrearVideojuego() {
        const datos: DatosFormularioVideojuego = {
            nombre: nombre,
            marca: marca,
            descripcion: descripcion,
            caratula: caratula,
            año: parseInt(año),
            prestado: prestado,
            sistema: sistema
        }
        crearVideojuego(datos)
            .then(() => {
                setListaVideojuegos([...listaVideojuegos, { id: videojuegoSeleccionado.id, datos: datos }])
                router.back()
            })
            .catch((error) => navegarError(router, "Error al crear Videojuego", error.toString()))
    }
    function botonPulsado() {
        if (nuevoVideojuego) {
            accionCrearVideojuego()
        } else {
            accionModificarVideojuego()
        }
    }
    return (
        <View className="flex-1">
            <Pressable className="flex-1 bg-[rgba(0,0,0,0.4)]" onPress={() => router.back()} />
            <View className="bg-background absolute bottom-0 left-0 h-[60%] w-full rounded-tl-2xl rounded-tr-2xl p-4">
                <Card>
                    <Card.Content>
                        <TextInput value={nombre} onChangeText={setNombre} />
                        <TextInput value={marca} onChangeText={setMarca} />
                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <Pressable onPress={() => setMenuVisible(true)}>
                                    <TextInput
                                        editable={false}
                                        value={sistema.nombre}
                                        right={<TextInput.Icon icon={videojuegoSeleccionado.datos.sistema.icono} />}
                                    />
                                </Pressable>
                            }>
                            {listaSistemas.map((s) => (
                                <Menu.Item
                                    key={s.id}
                                    title={s.nombre}
                                    leadingIcon={() => <Icon size={24} source={s.icono} />}
                                    onPress={() => {
                                        setSistema(s);
                                        setMenuVisible(false);
                                    }}
                                />
                            ))}
                        </Menu>
                        <TextInput
                            value={año}
                            onChangeText={setAño}
                            keyboardType="number-pad"
                            error={año !== '' && Number(año) < 0}
                        />
                        <HelperText type="error" visible={año !== '' && Number(año) < 0}>
                            El año debe ser un número positivo
                        </HelperText>
                        <TextInput value={caratula} onChangeText={setCaratula} />
                        <TextInput value={descripcion} onChangeText={setDescripcion} multiline={true} numberOfLines={4} />
                    </Card.Content>
                </Card>
                <Button mode="contained" onPress={() => botonPulsado()} style={{ marginTop: 10 }}>
                    <Text>{nuevoVideojuego ? 'Nuevo Videojuego' : 'Guardar'}</Text>
                </Button>
            </View>
        </View>
    );
}