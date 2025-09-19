import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BR } from "../components/widgets"
import { insertUser } from '../controllers/users.controller'
import { styles } from '../styles/styles'

// ----------------------------------------------------------------- //
// Pantalla para registrar un nuevo usuario                           //
// Incluye validaciones básicas y manejo de errores                  //
// ----------------------------------------------------------------- //

export default function Register() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    // Guardar nuevo usuario
    // Valida que se hayan ingresado todos los campos
    // Intenta insertar el nuevo usuario en la base de datos
    // Muestra alertas de éxito o error según corresponda
    const saveUser = async () => {

        if (!name || !email || !pass) {
            Alert.alert('⚠️  Advertencia', 'Debe llenar todos los campos')
            return;
        }

        try {

            const result = await insertUser(name.trim(), email.trim(), pass.trim());

            if (result.changes === 1)
                Alert.alert('✅  Exito', 'Usuario creado correctamente', [
                    { text: 'Aceptar', onPress: () => router.back() }
                ])
            else
                Alert.alert('❌  Error', 'No se pudo crear el usuario')

        } catch (error) {
            Alert.alert('Error', 'El correo ya existe')
        }

    }

    // Renderizar la interfaz de usuario
    // Pantalla para registrar un nuevo usuario
    // Incluye campos para nombre, correo y contraseña, y botones para registrar o cancelar
    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior='height'
                keyboardVerticalOffset={0} >
                <Text style={styles.title}>Registrar nuevo usuario</Text>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <BR />
                    <Image source={require('../assets/images/register.jpg')} style={{ width: 250, height: 250, borderRadius: 12, alignSelf: 'center' }} />

                    <View style={styles.container}>

                        <View style={styles.rowLabel}>
                            <Feather name="user" size={22} color="black" />
                            <Text style={styles.label}>Nombre de usuario</Text>
                        </View>
                        <TextInput placeholder='Nombre de usuario' value={name} onChangeText={setName} style={styles.input} />
                        <BR />

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

                        <BR h={28} />
                        <TouchableOpacity onPress={saveUser} style={styles.iconButton}>
                            <Feather name="user-plus" size={20} color="white" />
                            <Text style={styles.buttonText}>Registrar</Text>
                        </TouchableOpacity>
                        <BR h={10} />

                        <TouchableOpacity onPress={() => router.back()} style={styles.secButton}>
                            <MaterialCommunityIcons name="cancel" size={18} color="black" />
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}