import { View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native-paper'

export default function Error() {
    const error = useLocalSearchParams<{ error: string, descripcion?: string }>();
    return (
        <View>
            <Text variant='titleLarge'>Se ha producido un error</Text>
            <Text variant='bodyMedium'>{error.error}</Text>
            {
                error.descripcion !== undefined &&
                <Text variant='bodyMedium'>{error.descripcion}</Text>
            }
        </View>
    )
}