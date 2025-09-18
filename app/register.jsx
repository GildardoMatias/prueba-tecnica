import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
        if(!name || !email || !pass){
            Alert.alert('⚠️  Advertencia','Debe llenar todos los campos')
            return;
        }

        try {
            insertUser(name.trim(), email.trim(), pass.trim()).then((res) => {

                if (res.changes === 1)
                    Alert.alert('✅  Exito', 'Usuario creado correctamente', [
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
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior='height'
                keyboardVerticalOffset={0} >
                <Text style={estilos.title}>Registrar nuevo usuario</Text>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <BR />
                    <Image source={require('../assets/images/register.jpg')} style={{ width: 250, height: 250, borderRadius: 12, alignSelf: 'center' }} />

                    <View style={estilos.container}>

                        <View style={estilos.rowLabel}>
                            <Feather name="user" size={22} color="black" />
                            <Text style={estilos.label}>Nombre de usuario</Text>
                        </View>
                        <TextInput placeholder='Nombre de usuario' value={name} onChangeText={setName} style={estilos.input} />
                        <BR />

                        <View style={estilos.rowLabel}>
                            <Feather name="mail" size={20} color="black" />
                            <Text style={estilos.label}>Correo electronico</Text>
                        </View>
                        <TextInput placeholder='ejemplo@direccion.com' value={email} onChangeText={setEmail} keyboardType='email-address' style={estilos.input} />
                        <BR />

                        <View style={estilos.rowLabel}>
                            <Octicons name="key" size={20} color="black" />
                            <Text style={estilos.label}>Contraseña</Text>
                        </View>
                        <TextInput placeholder='Contraseña' value={pass} onChangeText={setPass} style={estilos.input} />
                        <BR />

                        <BR h={28} />
                        <TouchableOpacity onPress={saveUser} style={estilos.iconButton}>
                            <Feather name="user-plus" size={20} color="white" />
                            <Text style={estilos.buttonText}>Registrar</Text>
                        </TouchableOpacity>
                        <BR h={10} />

                        <TouchableOpacity onPress={() => router.back()} style={estilos.secButton}>
                            <MaterialCommunityIcons name="cancel" size={18} color="black" />
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}