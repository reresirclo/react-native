import { gql } from 'apollo-boost';
import React from 'react';
import { Text } from 'react-native';
import Layout from '../../component/Layout';
import { createStackNavigator } from '@react-navigation/stack';

const CUSTOMER_LOGIN = gql`
	mutation($username: String!, $password: String!) {
		generateCustomerToken(email: $username, password: $password) {
			token
		}
	}
`;

const Index = ({ navigation }) => {

	return (
		<Layout>
			<Text>Home</Text>
		</Layout>
	);
};

export default Index;
