import { useLazyQuery } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications, setToken } from '../../redux/actions';
import Home from '../Home';
import Landing from '../Landing';
import Notifications from '../Notifications';
import DetailNotification from '../Notifications/Detail';
import Product from '../Product';
import CategoryList from '../Product/CategoryList';
import ProductList from '../Product/ProductList';
import Profile from '../Profile';
import Splashscreen from '../Splashscreen';

const CUSTOMER_NOTIFICATION_LIST = gql`
	query {
		customerNotificationList {
			items {
				createdAt
				content
				entityId
				subject
				unread
			}
			totalUnread
		}
	}
`;

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
			<Tab.Screen name="Notifications" component={Notifications} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

const Root = () => {
	const token = useSelector(state => state.token);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const RootStack = createStackNavigator();

	const [getNotifications] = useLazyQuery(CUSTOMER_NOTIFICATION_LIST, {
		onCompleted: data => {
			const { items, totalUnread } = data.customerNotificationList;
			console.log('dddd');
			dispatch(
				setNotifications({
					data: items,
					totalUnread,
				}),
			);
		},
	});

	useEffect(() => {
		const getToken = async () => {
			setLoading(true);
			const token = (await AsyncStorage.getItem('token')) || '';

			if (token !== '') {
				await getNotifications({
					context: {
						headers: {
							authorization: `Bearer ${token}`,
						},
					},
				});
			}

			dispatch(setToken(token));

			setLoading(false);
		};

		getToken();
	}, []);

	if (loading) {
		return <Splashscreen />;
	}

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
					<RootStack.Screen
						name="Product List"
						component={ProductList}
					/>
					<RootStack.Screen
						name="Detail Notification"
						component={DetailNotification}
					/>
				</RootStack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default Root;
