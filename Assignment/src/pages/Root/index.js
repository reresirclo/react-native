import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/actions';
import Home from '../Home';
import Landing from '../Landing';
import Notifications from '../Notifications';
import Product from '../Product';
import CategoryList from '../Product/CategoryList';
import Profile from '../Profile';
import Splashscreen from '../Splashscreen';

const Root = () => {
	const token = useSelector(state => state.token);
	const productNavigation = useSelector(state => state.navigation);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const Tab = createBottomTabNavigator();
	const RootStack = createStackNavigator();

	useEffect(() => {
		const getToken = async () => {
			setLoading(true);
			const token = (await AsyncStorage.getItem('token')) || '';
			dispatch(setToken(token));
			setLoading(false);
		};
		getToken();
	}, []);

	if (loading) {
		return <Splashscreen />;
	}

	const HomeTabs = () => (
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
							iconName = 'notifications';
							break;
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
			<Tab.Screen name="Product" component={Product}/>
			<Tab.Screen name="Notifications" component={Notifications} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);

	return (
		<NavigationContainer>
			{token == '' ? (
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
						component={CategoryList}
					/>
				</RootStack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default Root;
