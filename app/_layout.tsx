import '../global.css';
import { useColorScheme, View } from 'react-native'
import { temaOscuro } from '@/themes/TemaOscuro';
import { temaClaro } from '@/themes/TemaClaro';
import { useVideojuegoSeleccionado } from '@/store/VideojuegoSeleccionadoStore';
import { IconButton, PaperProvider } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';

export default function Layout() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const tema = colorScheme === 'dark' ? temaOscuro : temaClaro;
    const { videojuegoSeleccionado } = useVideojuegoSeleccionado();

    return (
        <PaperProvider theme={tema}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Mis videojuegos',
                        headerShown: false,
                        animation: 'fade',
                        headerStyle: { backgroundColor: tema.colors.primary },
                        headerTintColor: tema.colors.onPrimary,
                    }}
                />
                <Stack.Screen
                    name="prestamo"
                    options={{
                        title: 'Prestamo',
                        headerShown: false,
                        presentation: 'transparentModal',
                        animation: 'none',
                        headerStyle: { backgroundColor: tema.colors.primary },
                        headerTintColor: tema.colors.onPrimary,
                    }}
                />
                <Stack.Screen
                    name="operaciones/editar"
                    options={{
                        title: 'Editar',
                        headerShown: false,
                        presentation: 'transparentModal',
                        animation: 'none',
                        headerStyle: { backgroundColor: tema.colors.primary },
                        headerTintColor: tema.colors.onPrimary,
                    }}
                />
            </Stack>
        </PaperProvider>
    )
}