import { MD3LightTheme } from 'react-native-paper'

export const temaClaro = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#4F7FFF',        // color principal
        onPrimary: '#FFF',         // color del texto encima del color principal
        secondary: '#6C63FF',      // color secundario
        tertiary: '#00C2A8',       // color terciario
        background: '#F2F4F8',     // fondo de la pantalla
        onSurface: '#1A1C1E',      // texto
        outline: '#C2C7D0',        // borde del botón outline
        error: '#D32F2F',          // mensajes de error de validación
        secondaryContainer: '#E6E4FF', // fondo del botón contained-tonal y del chip
        onSecondaryContainer: '#1B1A3A', // texto del botón contained-tonal y el chip
        elevation: {
            level0: 'transparent',
            level1: '#FFFFFF',      // fondo de la tarjeta
            level2: '#F7F9FC',      // fondo de la tarjeta
            level3: '#EEF2F8',
            level4: '#E8EDF6',
            level5: '#E2E8F3',
        },
    },
};