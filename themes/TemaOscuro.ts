import { MD3DarkTheme } from "react-native-paper";

export const temaOscuro = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#4F7FFF',        // color principal
        onPrimary: '#FFF',         // color del texto encima del color principal
        secondary: '#6C63FF',      // color secundario
        tertiary: '#00C2A8',       // color terciario
        background: '#121212',     // fondo de la pantalla (oscuro)
        onSurface: '#E1E1E1',      // texto (claro)
        outline: '#5C5C5C',        // borde del botón outline
        error: '#CF6679',          // mensajes de error de validación
        secondaryContainer: '#3D3A5C', // fondo del botón contained-tonal y del chip
        onSecondaryContainer: '#E6E4FF', // texto del botón contained-tonal y el chip
        elevation: {
            level0: 'transparent',
            level1: '#1E1E1E',      // fondo de la tarjeta
            level2: '#232323',      // fondo de la tarjeta
            level3: '#282828',
            level4: '#2C2C2C',
            level5: '#313131',
        },
    },
};