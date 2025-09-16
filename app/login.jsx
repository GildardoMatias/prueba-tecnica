import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getUserByCredentials } from '../controllers/users.controller'
import { storeJSON } from '../functions/functions'
import { estilos } from '../styles/styles'

export default function InicioSesion() {
    const router = useRouter()

    const [userFound, setUserFound] = useState(null)

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const login = async () => {
        const user = await getUserByCredentials(email, pass)
        if (!user) alert('Credenciales no validas')
        else {
            setUserFound(user)

            await storeJSON(user, 'userData')

            router.replace('home')
        }
        // getAllUsers().then(setUserFound)

    }

    return (
        <View style={estilos.container}>
            <Text>InicioSesion</Text>

            {
                userFound && <View>
                    <Text>{JSON.stringify(userFound)}</Text>
                </View>
            }

            <TextInput placeholder='Usuario' value={email} onChangeText={setEmail} keyboardType='email-address' />
            <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} />
            {/* <TouchableOpacity onPress={() => router.replace('home')}> */}
            <TouchableOpacity onPress={login}>
                <Text>Iniciar Sesión</Text>
            </TouchableOpacity>
            <Link href='register'>
                Registrarse
            </Link>
        </View>
    )
}