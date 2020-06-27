import AsyncStorage from '@react-native-community/async-storage';
import { setNotifications, setToken } from '@src/redux/actions';

export const logout = async (dispatch) => {
    dispatch(setToken(''));
    dispatch(setNotifications({ data: [], totalUnread: 0 }));
    await AsyncStorage.setItem('token', '');
};
