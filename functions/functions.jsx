import AsyncStorage from "@react-native-async-storage/async-storage";


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