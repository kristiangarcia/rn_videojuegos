import { View } from 'react-native'
import React from 'react'
import { Videojuego } from '@/model/Types'
import { Text, Badge, Card, Chip, Button, Icon } from 'react-native-paper';

export default function VideojuegoCard(
    videojuego: Videojuego,
    accionPrestarVideojuego: (Videojuego: Videojuego) => void,
    accionDevolverVideojuego: (Videojuego: Videojuego) => void,
    accionVerVideojuego: (Videojuego: Videojuego) => void,
    primaryColor: string
) {
    return (
        <Card>
            <Card.Cover source={{ uri: videojuego.datos.caratula }} resizeMode="stretch" style={{ marginBottom: 20 }} />
            <Card.Content>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Text variant="titleLarge">{videojuego.datos.nombre}</Text>
                    <Chip><Icon source={videojuego.datos.sistema.icono} size={16} color={primaryColor}/> {videojuego.datos.sistema.nombre}</Chip>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text variant="bodyMedium">{videojuego.datos.año} </Text>
                    <Badge style={{ backgroundColor: videojuego.datos.prestado === '' ? primaryColor : '#D32F2F' }}>
                        {
                            videojuego.datos.prestado === "" ? "Disponible" : "Prestado a " + videojuego.datos.prestado
                        }
                    </Badge>
                    <Text variant="bodyMedium" numberOfLines={3}>
                        {videojuego.datos.descripcion}
                    </Text>
                </View>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => accionVerVideojuego(videojuego)}>Ver</Button>
                <Button mode='contained-tonal' onPress={() => videojuego.datos.prestado === "" ? accionPrestarVideojuego(videojuego) : accionDevolverVideojuego(videojuego)}>{
                    videojuego.datos.prestado === "" ? "Prestar" : "Devolver"
                }</Button>
            </Card.Actions>
        </Card>
    );
}