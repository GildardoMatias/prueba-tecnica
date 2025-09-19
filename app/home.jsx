import Octicons from '@expo/vector-icons/Octicons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BR } from '../components/widgets';
import { deleteTask, getTasksByUserId } from '../controllers/tasks.controller';
import { getJsonObject, logout } from '../functions/functions';
import { styles } from '../styles/styles';

// ----------------------------------------------------------------- //
// Pantalla principal que muestra la lista de tareas del usuario     //
// Permite agregar, editar y eliminar tareas                         //
// También incluye la funcionalidad de cerrar sesión                 //
// ----------------------------------------------------------------- //

export default function Home() {

    const router = useRouter()

    const [allTasks, setAllTasks] = useState(null)
    const [userData, setuserData] = useState('')

    // Menu de opciones de las tareas

    const [menuVisible, setMenuVisible] = useState(null);
    // Manejar la selección de una opción del menú
    const handleMenuOption = (action, task) => {
        setMenuVisible(null);
        switch (action) {
            case 'edit':
                // Lógica para editar la tarea
                router.push({ pathname: 'crear-tarea', params: { ...task } })
                break;
            case 'delete':
                // Lógica para eliminar la tarea
                Alert.alert('⚠️  Advertencia', `¿Eliminar "${task.title}"?`, [
                    { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
                    { text: 'Eliminar', onPress: () => { _deleteTask(task.id) }, style: 'default' }
                ]);
                break;
        }
    };

    // Eliminar tarea
    const _deleteTask = async (taskId) => {
        const deleted = await deleteTask(taskId)
        if (deleted.changes === 1) {
            getTasksByUserId(userData.id).then(setAllTasks)
        } else Alert.alert('Error', 'Error al eliminar la tarea')
    }

    // Menu de opciones de las tareas - fin


    // Cargar datos del usuario y sus tareas al iniciar la pantalla
    useEffect(() => {
        const getUserData = async () => {
            const _userData = await getJsonObject('userData')
            setuserData(_userData)
        }
        getUserData()
    }, [])

    // Cargar tareas del usuario cuando se obtienen los datos del usuario
    useEffect(() => {
        if (userData && userData.id)
            getTasksByUserId(userData.id).then(setAllTasks)
    }, [userData])

    // Cargar tareas del usuario cada vez que se enfoca la pantalla (Home)
    useFocusEffect(
        useCallback(() => {
            if (userData && userData.id)
                getTasksByUserId(userData.id).then(setAllTasks)
        }, []),
    );


    // Renderizar la interfaz de usuario
    // Pantalla principal que muestra la lista de tareas del usuario
    // Permite agregar, editar y eliminar tareas
    // Cada tarea tiene un menú de opciones para editar o eliminar
    // También incluye la funcionalidad de cerrar sesión
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 18, backgroundColor: '#ddefe8' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Lista de Tareas</Text>
                <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#a1a1a1', paddingHorizontal: 8, borderRadius: 8 }}>
                    <Text style={{ color: '#a1a1a1', fontSize: 14 }}>Cerrar sesión</Text>
                    <Octicons name="sign-out" size={14} color="#a1a1a1" />
                </TouchableOpacity>
            </View>

            <View style={{ height: 24 }}></View>

            <ScrollView style={{ borderRadius: 5 }}>

                {
                    allTasks && allTasks.length ? allTasks.map(task => (
                        <View style={{ marginBottom: 16, backgroundColor: 'white', padding: 12, borderRadius: 12, gap: 4 }} key={task.id}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.title}>{task.title}</Text>
                                <TouchableOpacity onPress={() => setMenuVisible(menuVisible === task.id ? null : task.id)} style={{ width: 16, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>⋮</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Menú desplegable */}
                            {menuVisible === task.id && (
                                <View style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 30,
                                    backgroundColor: 'white',
                                    borderRadius: 8,
                                    padding: 5,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    zIndex: 1000,
                                    minWidth: 120
                                }}>
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => handleMenuOption('edit', task)}
                                    >
                                        <Text style={{ fontSize: 16 }}>✏️  Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => handleMenuOption('delete', task)}
                                    >
                                        <Text style={{ fontSize: 16 }}>🗑️  Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}


                            <Text style={{ textAlign: 'justify' }}>{task.description}</Text>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 11 }}>{new Date(task.createdAt).toLocaleDateString('es-MX')}</Text>

                        </View>
                    )) :
                        <View><Text>Aún no hay tareas asignadas</Text></View>
                }


            </ScrollView>
            <BR h={5} />
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push({ pathname: 'crear-tarea', params: { userId: userData.id, userName: userData.name } })} >
                {/* <Link href={`crear-tarea?userId=${userData.id}&userName=${userData.name}`} style={{ color: 'white' }}> */}
                <Octicons name="file-added" size={18} color="white" />
                <Text style={{ color: 'white' }}>
                    Añadir Tarea
                </Text>
                {/* </Link> */}
            </TouchableOpacity>


            <BR />
          

        </SafeAreaView>
    )
}