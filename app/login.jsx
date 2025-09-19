import Feather from '@expo/vector-icons/Feather'
import Octicons from '@expo/vector-icons/Octicons'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BR } from '../components/widgets'
import { getUserByCredentials } from '../controllers/users.controller'
import { storeJSON } from '../functions/functions'
import { styles } from '../styles/styles'

// ----------------------------------------------------------- //
// Pantalla de inicio de sesión                                //
// Permite a los usuarios ingresar con su correo y contraseña  //
// Incluye validaciones y navegación a la pantalla de registro //
// ----------------------------------------------------------- //

export default function InicioSesion() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    // Función para manejar el inicio de sesión
    const login = async () => {
        
        // Validar que se hayan ingresado correo y contraseña
        if (!email || !pass) {
            Alert.alert('⚠️  Advertencia', 'Ingrese correo y contraseña')
            return
        }

        // Buscar usuario con las credenciales proporcionadas
        const user = await getUserByCredentials(email, pass)

        // Si no se encuentra el usuario, mostrar alerta
        // Si se encuentra, almacenar los datos y redirigir a la pantalla principal (home)
        if (!user) Alert.alert('⚠️  Advertencia', 'Credenciales no validas')
        else {

            await storeJSON(user, 'userData')

            router.replace('home')
        }
    }

    // Renderizar la interfaz de usuario
    // Pantalla para iniciar sesión
    // Incluye campos para correo y contraseña, y botones para iniciar sesión o registrarse
    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='height'
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    contentContainerStyle={_styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >

                    <Text style={styles.bigTitle}>Administración de tareas</Text>

                    <View style={styles.container}>

                        <Image source={require('../assets/images/lock.jpg')} style={{ width: 250, height: 250, borderRadius: 12, alignSelf: 'center' }} />
                        <BR h={28} />

                        <Text style={styles.title}>Inicio de sesión</Text>
                        <BR h={12} />

                        <View style={styles.rowLabel}>
                            <Feather name="mail" size={20} color="black" />
                            <Text style={styles.label}>Correo electronico</Text>
                        </View>
                        <TextInput placeholder='ejemplo@direccion.com' value={email} onChangeText={setEmail} keyboardType='email-address' style={styles.input} />
                        <BR />

                        <View style={styles.rowLabel}>
                            <Octicons name="key" size={20} color="black" />
                            <Text style={styles.label}>Contraseña</Text>
                        </View>
                        <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} style={styles.input} />
                        <BR />

                        <TouchableOpacity onPress={login} style={styles.iconButton}>
                            <Text style={styles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>

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