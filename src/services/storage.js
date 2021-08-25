import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserToken = async (token) => {
    try {
        await AsyncStorage.setItem('@userToken', token)
    } catch (e) {
        console.warn(e);
    }
}


export const getUserToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@userToken')
        if(value !== null) {
            return value
        }
    } catch(e) {
        console.warn(e)
    }
}
