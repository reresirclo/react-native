import { useQuery } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../component/Layout';
import CustomTouchOpacity from '../../component/TouchableOpacity';
import { setToken, setNotifications } from '../../redux/actions';

const CUSTOMER = gql`
	query {
		customer {
			firstname
			lastname
			email
		}
	}
`;

const Profile = props => {
	const dispatch = useDispatch();
	const { navigation } = props;
	const token = useSelector(state => state.token);
	let content = <ActivityIndicator size="large" color="red" />;

	
	if (!token) {
		navigation.navigate('Landing');
	}

	const logout = async () => {
		dispatch(setToken(''));
		dispatch(setNotifications({ data: [], totalUnread: 0 }));
		await AsyncStorage.setItem('token', '');
	};

	const { loading, error, data } = useQuery(CUSTOMER, {
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
		onError: errors => {
			logout();
		},
	});

	if (data) {
		const { firstname, lastname, email } = data.customer;

		content = (
			<>
				<Text
					style={{
						marginBottom: 10,
					}}>{`Hello ${firstname} ${lastname}`}</Text>
				<Text
					style={{
						marginBottom: 30,
					}}>
					{email}
				</Text>
				<CustomTouchOpacity onPress={logout} title={'Logout'} />
			</>
		);
	}

	return <Layout>{content}</Layout>;
};

export default Profile;
