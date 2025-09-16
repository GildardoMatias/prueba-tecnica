import { Stack } from 'expo-router';
import 'react-native-reanimated';




export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {


  return (
 
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="crear-tarea" options={{ headerShown: false,presentation: 'modal', title: 'Crear Tarea' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
   


  );
}
