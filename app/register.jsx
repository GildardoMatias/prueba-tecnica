import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BR } from "../components/widgets"
import { insertUser } from '../controllers/users.controller'
import { estilos } from '../styles/styles'

export default function Register() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const saveUser = () => {
        try {
            insertUser(name, email, pass).then((res) => {

                if (res.changes === 1)
                    Alert.alert('Exito', 'Usuario creado correctamente', [
                        { text: 'Aceptar', onPress: () => router.back() }
                    ])

            })
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'El correo ya existe')
        }

    }

    return (
        <SafeAreaView style={estilos.mainContainer}>
            <Text style={estilos.title}>Registrar nuevo usuario</Text>

            <View style={estilos.container}>

                <Text style={estilos.label}>Nombre de usuario</Text>
                <TextInput placeholder='Nombre de usuario' value={name} onChangeText={setName} style={estilos.input} />
                <BR />

                <Text style={estilos.label}>Correo electronico</Text>
                <TextInput placeholder='ejemplo@direccion.com' value={email} onChangeText={setEmail} keyboardType='email-address' style={estilos.input} />
                <BR />

                <Text style={estilos.label}>Contraseña</Text>
                <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} style={estilos.input} />
                <BR />

                <BR h={28} />
                <TouchableOpacity onPress={saveUser} style={estilos.button}>
                    <Text style={estilos.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <BR h={10} />

                <TouchableOpacity onPress={() => router.back()} style={estilos.secButton}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}