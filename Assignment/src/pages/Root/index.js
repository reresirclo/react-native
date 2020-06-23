import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
	createNotifications,
	createProduct,
	Home,
	Landing,
	Product,
	Profile,
	Splashscreen,
} from '../../pages';
import { setToken } from '../../redux/actions';

const IconWithBadge = ({ name, badgeCount, color, size }) => {
	return (
		<View style={{ width: 24, height: 24, margin: 5 }}>
			<MaterialIcons name={name} size={size} color={color} />
			{badgeCount > 0 && (
				<View
					style={{
						position: 'absolute',
						right: '-50%',
						top: -3,
						borderColor: 'white',
						borderWidth: 1,
						backgroundColor: 'red',
						borderRadius: 6,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}>
					<Text
						style={{
							color: 'white',
							fontSize: 10,
							fontWeight: 'bold',
						}}>
						{(badgeCount < 1000 && badgeCount) || '99+'}
					</Text>
				</View>
			)}
		</View>
	);
};

const HomeTabs = () => {
	const Tab = createBottomTabNavigator();
	const { totalUnread } = useSelector(state => state.notifications);
	const Notifications = createNotifications();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					switch (route.name) {
						case 'Home':
							iconName = 'home';
							break;
						case 'Profile':
							iconName = 'face';
							break;
						case 'Product':
							iconName = 'local-mall';
							break;
						case 'Notifications':
							return (
								<IconWithBadge
									name="notifications"
									badgeCount={totalUnread}
									color={color}
									size={size}
								/>
							);
					}

					return (
						<MaterialIcons
							name={iconName}
							size={size}
							color={color}
						/>
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: 'red',
				inactiveTintColor: 'gray',
			}}>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Product" component={Product} />
			<Tab.Screen name="Notifications" component={Notifications.Root} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

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
					component={HomeTabs}
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
			</RootStack.Navigator>
		);

	const content = loading ? <Splashscreen fadeOut={fadeOut} /> : mainContent;

	return <NavigationContainer>{content}</NavigationContainer>;
};

export default Root;
