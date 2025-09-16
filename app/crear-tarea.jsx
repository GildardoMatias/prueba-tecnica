import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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

    // Si hay title y description en params, se está editando
    if (taskId) {
      const result = await updateTask(taskId, _title, _description)
      if (result.changes === 1) router.back()
    } else {
      const result = await insertTask(userId, _title, _description)
      if (result.changes === 1) router.back()
    }
  }

  return (
    <SafeAreaView style={estilos.mainContainer}>
      <View style={{ backgroundColor: '#ddefe8', alignContent: 'space-between', flex: 1 }}>
        
        <Text style={estilos.title}>{taskId ? 'Editar' : 'Crear nueva'} Tarea</Text>


        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* <Text  style={estilos.label}>Usuario</Text> */}
          {/* <Text>{userName}</Text> */}
          {/* <BR /> */}
          <Text  style={estilos.label}>Título</Text>
          <TextInput style={estilos.input} placeholder='Titulo' value={_title} onChangeText={setTitle} />

          <BR />

          <Text style={estilos.label}>Descripcion</Text>
          <TextInput style={estilos.input} numberOfLines={3} placeholder='Descripcion' value={_description} onChangeText={setDescription} />

          <BR />

          <TouchableOpacity onPress={saveTask} style={estilos.button}>
            <Text style={estilos.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <BR h={5} />

          <TouchableOpacity onPress={() => router.back()} style={estilos.secButton}>
            <Text>Cancelar</Text>
          </TouchableOpacity>

        </View>


      </View>
    </SafeAreaView>
  )
}