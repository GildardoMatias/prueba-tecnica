import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BR } from '../components/widgets'
import { insertTask, updateTask } from '../controllers/tasks.controller'
import { estilos } from '../styles/styles'

export default function CrearTarea() {
  const params = useLocalSearchParams();
  const { userId, userName, id: taskId, title = "", description = "" } = params;

  const router = useRouter()

  const [_title, setTitle] = useState(title)
  const [_description, setDescription] = useState(description)

  const saveTask = async () => {

    if(!_title || !_description){
      Alert.alert('Advertencia','Por favor complete todos los campos') 
      return
    }

    // Si hay title y description en params, se está editando
    if (taskId) {
      const result = await updateTask(taskId, _title, _description)
      if (result.changes === 1) router.replace('home')
    } else {
      const result = await insertTask(userId, _title, _description)
      if (result.changes === 1) router.replace('home')
    }
  }

  return (
    <SafeAreaView style={estilos.mainContainer}>
      <View style={{ backgroundColor: '#ddefe8', alignContent: 'space-between', flex: 1 }}>

        <Text style={estilos.title}>{taskId ? 'Editar' : 'Crear nueva'} Tarea</Text>

        <KeyboardAvoidingView style={{ flex: 1 }}
          behavior='height'
          keyboardVerticalOffset={0} >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

            <Image source={require('../assets/images/note.jpg')} style={{ width: 250, height: 250, borderRadius: 12, alignSelf: 'center' }} />
            <BR h={60} />

            <Text style={estilos.label}>Título</Text>
            <TextInput style={estilos.input} placeholder='Titulo' value={_title} onChangeText={setTitle} />

            <BR />

            <Text style={estilos.label}>Descripcion</Text>
            <TextInput style={estilos.input} numberOfLines={3} placeholder='Descripcion' value={_description} onChangeText={setDescription} />

            <BR />

            <TouchableOpacity onPress={saveTask} style={estilos.iconButton}>
              <Feather name="save" size={18} color="white" />
              <Text style={estilos.buttonText}>Guardar</Text>
            </TouchableOpacity>

            <BR h={5} />

            <TouchableOpacity onPress={() => router.back()} style={estilos.secButton}>
              <MaterialCommunityIcons name="cancel" size={20} color="black" />
              <Text>Cancelar</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>


      </View>
    </SafeAreaView>
  )
}