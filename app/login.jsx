import Feather from '@expo/vector-icons/Feather'
import Octicons from '@expo/vector-icons/Octicons'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BR } from '../components/widgets'
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
        <SafeAreaView style={estilos.mainContainer}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='height'
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    contentContainerStyle={_styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >

                    <Text style={estilos.bigTitle}>Administración de tareas</Text>

                    <View style={estilos.container}>

                        <Image source={require('../assets/images/lock.jpg')} style={{ width: 250, height: 250, borderRadius: 12, alignSelf: 'center' }} />
                        <BR />

                        <Text style={estilos.title}>Inicio de sesión</Text>
                        <BR />


                        <Feather name="mail" size={20} color="black" />
                        <Text style={estilos.label}>Correo electronico</Text>
                        <TextInput placeholder='ejemplo@direccion.com' value={email} onChangeText={setEmail} keyboardType='email-address' style={estilos.input} />
                        <BR />

                        <Octicons name="key" size={20} color="black" />
                        <Text style={estilos.label}>Contraseña</Text>
                        <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} style={estilos.input} />
                        <BR />

                        <TouchableOpacity onPress={login} style={estilos.button}>
                            <Text style={estilos.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => router.push('register')}>
<Text>
    
</Text>
                </TouchableOpacity> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 42 }}>
                            <Link href='register' style={{ color: '#059e4aff' }}>
                                Registrarse
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        textAlign: 'center',
    },
    inputWrapper: {
        marginTop: 300, // Simula contenido largo
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});