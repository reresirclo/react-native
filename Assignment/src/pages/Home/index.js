import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Layout } from '../../component';
import { setNotifications } from '../../redux/actions';
import { customerNotificationList } from '../../services/graphql';

const Home = () => {
	const dispatch = useDispatch();

	customerNotificationList({
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

export {
	Home
}
