import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import CustomTouchOpacity from '../../component/TouchableOpacity';
import Layout from '../../component/Layout';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const CUSTOMER = gql`
	query {
		customer(selectedStore: 0) {
			firstname
			lastname
		}
	}
`;

const Profile = props => {
	const { navigation } = props;
	const token = props.route.params.token;
	let content = <ActivityIndicator size="large" color="red" />;

	if (!token) {
		navigation.replace('Landing');
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
					onPress={() => navigation.goBack()}
					title={'Go Back'}
				/>
			</>
		);
	}

	return <Layout>{content}</Layout>;
};

export default Profile;
