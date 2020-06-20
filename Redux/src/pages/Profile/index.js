import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import CustomTouchOpacity from '../../component/TouchableOpacity';
import Layout from '../../component/Layout';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions';

const CUSTOMER = gql`
	query {
		customer {
			firstname
			lastname
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

	const { loading, error, data } = useQuery(CUSTOMER, {
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
	});

	if (data) {
		const { firstname, lastname } = data.customer;

		content = (
			<>
				<Text
					style={{
						marginBottom: 5,
					}}>{`Logged In ${firstname} ${lastname}`}</Text>
				<Text style={{ marginBottom: 5 }}>Token</Text>
				<Text style={{ marginBottom: 25 }}>{token}</Text>
				<CustomTouchOpacity
					onPress={() => dispatch(setToken(null))}
					title={'Logout'}
				/>
			</>
		);
	}

	return <Layout>{content}</Layout>;
};

export default Profile;
