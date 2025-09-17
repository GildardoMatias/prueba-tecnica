import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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
        insertUser(name, email, pass).then((res) => {
            console.log('Res of insert:  ------->  ', res)
            if (res.changes === 1) alert('Usuario creado correctamente')
        })
    }

    return (
        <SafeAreaView style={estilos.mainContainer}>
            <Text style={estilos.title}>Registrar</Text>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput placeholder='Nombre de usuario' value={name} onChangeText={setName} style={estilos.input} />
                <TextInput placeholder='Correo' value={email} onChangeText={setEmail} keyboardType='email-address' style={estilos.input} />
                <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} style={estilos.input} />

                <BR h={28}/>
                <TouchableOpacity onPress={saveUser} style={estilos.button}>
                    <Text style={estilos.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <BR h={10}/>
                <TouchableOpacity onPress={() => router.back()} style={estilos.secButton}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}