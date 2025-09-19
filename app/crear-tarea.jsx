import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BR } from '../components/widgets'
import { insertTask, updateTask } from '../controllers/tasks.controller'
import { styles } from '../styles/styles'

// ----------------------------------------------------------------- //
// Pantalla para crear o editar una tarea                             //
// Permite ingresar título y descripción de la tarea                 //
// Incluye validaciones básicas y manejo de errores                  //
// ----------------------------------------------------------------- //

export default function CrearTarea() {
  const router = useRouter()

  const params = useLocalSearchParams();
  const { userId, id: taskId, title = "", description = "" } = params;


  const [_title, setTitle] = useState(title)
  const [_description, setDescription] = useState(description)

  const saveTask = async () => {

    // Validar que se hayan ingresado titulo y descripcion de la tarea
    if(!_title || !_description){
      Alert.alert('Advertencia','Por favor complete todos los campos') 
      return
    }

    // Si se ha proporcionado un ID de tarea, actualizar la tarea existente; de lo contrario, crear una nueva tarea
    if (taskId) {
      const result = await updateTask(taskId, _title, _description)
      if (result.changes === 1) router.replace('home')
    } else {
      const result = await insertTask(userId, _title, _description)
      if (result.changes === 1) router.replace('home')
    }
  }

  // Renderizar la interfaz de usuario
  // Pantalla para crear o editar una tarea
  // Incluye campos para título y descripción, y botones para guardar o cancelar
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ backgroundColor: '#ddefe8', alignContent: 'space-between', flex: 1 }}>

        <Text style={styles.title}>{taskId ? 'Editar' : 'Crear nueva'} Tarea</Text>

        <KeyboardAvoidingView style={{ flex: 1 }}
          behavior='height'
          keyboardVerticalOffset={0} >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

            <Image source={require('../assets/images/note.jpg')} style={{ width: 250, height: 250, borderRadius: 12, alignSelf: 'center' }} />
            <BR h={60} />

            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} placeholder='Titulo' value={_title} onChangeText={setTitle} />

            <BR />

            <Text style={styles.label}>Descripcion</Text>
            <TextInput style={styles.input} numberOfLines={3} placeholder='Descripcion' value={_description} onChangeText={setDescription} />

            <BR />

            <TouchableOpacity onPress={saveTask} style={styles.iconButton}>
              <Feather name="save" size={18} color="white" />
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

            <BR h={5} />

            <TouchableOpacity onPress={() => router.back()} style={styles.secButton}>
              <MaterialCommunityIcons name="cancel" size={20} color="black" />
              <Text>Cancelar</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>


      </View>
    </SafeAreaView>
  )
}