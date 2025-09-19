import { Stack } from 'expo-router';
import 'react-native-reanimated';

// Este layout define la estructura de navegación de la aplicación
// Incluye pantallas como splash, login, register, home y crear-tarea
// Cada pantalla tiene opciones específicas, como ocultar la cabecera o presentar como modal
// La pantalla "crear-tarea" se presenta como un modal sin cabecera y con un título específico
// La navegación entre estas pantallas se maneja mediante el componente Stack de expo-router

export default function RootLayout() {


  return (
 
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="crear-tarea" options={{ headerShown: false,presentation: 'modal', title: 'Crear Tarea' }} />
      
      </Stack>
   


  );
}
