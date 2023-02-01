import AsyncStorage from '@react-native-async-storage/async-storage';


export const setItem = async (item , value) => {
	try {
		await AsyncStorage.setItem(item, value);
	} catch(e) {

	}
}



export const getItem = async (item) => {
	try {
		let value = await AsyncStorage.getItem(item)
		return value;
	} catch(e) {
		return undefined;
	}
}

