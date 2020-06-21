import { gql } from 'apollo-boost';
import React from 'react';
import { Text } from 'react-native';
import Layout from '../../component/Layout';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../../redux/actions';

const CUSTOMER_LOGIN = gql`
	mutation($username: String!, $password: String!) {
		generateCustomerToken(email: $username, password: $password) {
			token
		}
	}
`;

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

const Index = ({ navigation }) => {
	const token = useSelector(state => state.token);
	const dispatch = useDispatch();
	useQuery(CUSTOMER_NOTIFICATION_LIST, {
		context: {
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
		onCompleted: data => {
			const { items, totalUnread } = data.customerNotificationList;
			dispatch(
				setNotifications({
					data: items,
					totalUnread,
				}),
			);
		},
	});
	return (
		<Layout>
			<Text>Home</Text>
		</Layout>
	);
};

export default Index;
