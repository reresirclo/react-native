import { createStackNavigator } from '@react-navigation/stack';
import { gql } from 'apollo-boost';
import React from 'react';
import List from './List';

const CUSTOMER_NOTIFICATION_LIST = gql`
	query {
		customerNotificationList {
			items {
				content
				createdAt
				entityId
				subject
				unread
			}
			totalUnread
		}
	}
`;

const Notifications = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Notifications" component={List} />
		</Stack.Navigator>
	);
};

export default Notifications;
