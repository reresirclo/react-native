import { gql } from 'apollo-boost';
import React from 'react';
import { Text } from 'react-native';
import Layout from '../../component/Layout';
import { createStackNavigator } from '@react-navigation/stack';

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

const Content = () => {
	return (
		<Layout>
			<Text>Notification</Text>
		</Layout>
	);
}

const Notifications = ({ navigation }) => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Notifications" component={Content} />
		</Stack.Navigator>
	);
};

export default Notifications;
