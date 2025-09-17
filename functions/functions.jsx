import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const router = useRouter()

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userData')
        router.replace('login')
    } catch (error) {
        alert('Error al cerrar sesión')
    }
}

export async function storeJSON(jsonObject, key) {
    try {
        const jsonValue = JSON.stringify(jsonObject);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e)
        alert('Error al guardar en almacenamiento interno')
    }
}

export async function getJsonObject(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        alert('Error al guardar en almacenamiento interno')
    }
}