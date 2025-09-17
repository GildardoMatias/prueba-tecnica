import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteTask, getTasksByUserId } from '../controllers/tasks.controller';
import { getJsonObject } from '../functions/functions';
import { estilos } from '../styles/styles';

export default function Home() {

    const router = useRouter()

    const [allTasks, setAllTasks] = useState(null)

    const [userData, setuserData] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)


    // Menu

    const [menuVisible, setMenuVisible] = useState(null);
    const handleMenuOption = (action, task) => {
        setMenuVisible(null);

        switch (action) {
            case 'edit':
                router.push({ pathname: 'crear-tarea', params: { ...task } })
                break;
            case 'delete':
                // Lógica para eliminar
                Alert.alert('Eliminar', `¿Eliminar tarea ${task.id}?`, [
                    { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
                    { text: 'Eliminar', onPress: () => { _deleteTask(task.id) }, style: 'default' }
                ]);
                break;
        }
    };
    
    const _deleteTask = async (taskId) => {
        const deleted = await deleteTask(taskId)
        if (deleted.changes === 1) {
            getTasksByUserId(userData.id).then(setAllTasks)
        } else Alert.alert('Error', 'Error al eliminar la tarea')
    }
    // Menu



    useEffect(() => {
        const getUserData = async () => {
            const _userData = await getJsonObject('userData')
            setuserData(_userData)
        }
        getUserData()
    }, [])

    useEffect(() => {
        if (userData && userData.id)
            getTasksByUserId(userData.id).then(setAllTasks)
    }, [userData])

    useFocusEffect(
        useCallback(() => {
            if (userData && userData.id)
                getTasksByUserId(userData.id).then(setAllTasks)
        }, []),
    );

    const showModal = () => {
        setIsModalOpen(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 18, backgroundColor: '#ddefe8' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={estilos.title}>Lista de Tareas</Text>
                <Text>Cerrar sesión</Text>
            </View>

            <View style={{ height: 24 }}></View>

            <ScrollView>


                {
                    allTasks && allTasks.length ? allTasks.map(task => (
                        <View style={{ marginBottom: 14, backgroundColor: 'white', padding: 10, borderRadius: 12 }} key={task.id}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{task.title}</Text>
                                <TouchableOpacity onPress={() => setMenuVisible(menuVisible === task.id ? null : task.id)} style={{ width: 16, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>⋮</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Menú desplegable */}
                            {menuVisible === task.id && (
                                <View style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 25,
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
                                        <Text>✏️ Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => handleMenuOption('delete', task)}
                                    >
                                        <Text>🗑️ Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}


                            <Text>{task.description}</Text>
                            <Text>{task.createdAt}</Text>
                            <Text>{task.id}</Text>
                        </View>
                    )) :
                        <View><Text>Aún no hay tareas asignadas</Text></View>
                }


            </ScrollView>

            <TouchableOpacity style={{ backgroundColor: '#34a379ff', height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => router.push({ pathname: 'crear-tarea', params: { userId: userData.id, userName: userData.name } })} >
                {/* <Link href={`crear-tarea?userId=${userData.id}&userName=${userData.name}`} style={{ color: 'white' }}> */}
                <Text style={{ color: 'white' }}>
                    Añadir Tarea
                </Text>
                {/* </Link> */}
            </TouchableOpacity>

            {/* <MenuModal isModalVisible={isModalOpen} setIsModalVisible={setIsModalOpen} /> */}

        </SafeAreaView>
    )
}