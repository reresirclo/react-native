import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createNotifications,
	createProduct,
	Landing,
	Splashscreen
} from '../../pages';
import { setToken } from '../../redux/actions';
import Tabs from './Tabs';

const Root = () => {
	const token = useSelector(state => state.token);
	const [loading, setLoading] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	const dispatch = useDispatch();
	const RootStack = createStackNavigator();
	const Notifications = createNotifications();
	const Product = createProduct();

	useEffect(() => {
		const getToken = async () => {
			setLoading(true);
			const token = (await AsyncStorage.getItem('token')) || '';
			dispatch(setToken(token));
			setFadeOut(true);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		};

		getToken();
	}, []);

	const mainContent =
		token === '' ? (
			<Landing />
		) : (
			<RootStack.Navigator>
				<RootStack.Screen
					name="Home"
					options={{ headerShown: false }}
					component={Tabs}
				/>
				<RootStack.Screen
					name="Category List"
					component={Product.Categories}
				/>
				<RootStack.Screen
					name="Product List"
					component={Product.List}
				/>
				<RootStack.Screen
					name="Detail Notification"
					component={Notifications.Detail}
				/>
				<RootStack.Screen
					name="Detail Product"
					component={Product.Detail}
				/>
			</RootStack.Navigator>
		);

	const content = loading ? <Splashscreen fadeOut={fadeOut} /> : mainContent;

	return <NavigationContainer>{content}</NavigationContainer>;
};

export default Root;
