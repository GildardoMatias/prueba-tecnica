import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createTables } from '../db/db';
import { getJsonObject } from '../functions/functions';
import { estilos } from '../styles/styles';

export default function Splash() {

    const router = useRouter();

    const isLogged = false;

    useEffect(() => {

        createTables();

    }, [])


    useEffect(() => {



        const timer = setTimeout(async () => {
            const _user = await getJsonObject('userData')
            if (_user) router.replace('home')
            else router.replace('login')
        }, 2000); // Delay for 2 seconds

        return () => clearTimeout(timer);

    }, [])

    return (
        <View style={estilos.container}>
            <Text>Cargando</Text>


        </View>
    )
}