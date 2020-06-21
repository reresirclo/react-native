import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../component/Layout';
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

const Index = () => {
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
