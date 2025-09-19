import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createTables } from '../db/db';
import { getJsonObject } from '../functions/functions';
import { styles } from '../styles/styles';

// ----------------------------------------------------------------- //
// Pantalla de carga inicial (splash)                                //
// Verifica si el usuario está autenticado y redirige si no lo está  //
// ----------------------------------------------------------------- //

export default function Splash() {

    const router = useRouter();

    // Crear tablas si no existen al iniciar la aplicación
    useEffect(() => {

        createTables();

    }, [])


    // Verificar si el usuario está autenticado y redirigir en consecuencia
    useEffect(() => {

        const timer = setTimeout(async () => {
            // Simular una verificación de autenticación, obtener datos del usuario desde almacenamiento local
            // Si no hay datos de usuario, redirigir a la pantalla de login
            // Si hay datos de usuario, redirigir a la pantalla principal (home)
            const _user = await getJsonObject('userData')
            if (_user) router.replace('home')
            else router.replace('login')
        }, 2000); // retardo de 2 segundos para simular la pantalla de carga

        return () => clearTimeout(timer);

    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Cargando...</Text>
        </View>
    )
}