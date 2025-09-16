import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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
        <View style={estilos.container}>
            <Text>Register</Text>
            <TextInput placeholder='Nombre de usuario' value={name} onChangeText={setName} />
            <TextInput placeholder='Correo' value={email} onChangeText={setEmail} keyboardType='email-address' />
            <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} />
            <TouchableOpacity onPress={saveUser}>
                <Text>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Cancelar</Text>
            </TouchableOpacity>

        </View>
    )
}