import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../component/Layout';
import { setNotifications } from '../../redux/actions';

const READ_NOTIFICATION = gql`
	mutation($id: Int!) {
		readNotification(entityId: $id) {
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

const Detail = props => {
	const dispatch = useDispatch();
	const token = useSelector(state => state.token);
	const notifications = useSelector(state => state.notifications);

	const { params } = props.route;

	if (!params) {
		return (
			<Layout>
				<ActivityIndicator size="large" color="red" />
			</Layout>
		);
	}

	const { id, content, subject, level, unread, createdAt } = params.data;

	const [updateNotification, { data, error, loading }] = useMutation(
		READ_NOTIFICATION,
		{
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
			onCompleted: data => {
				const { items, totalUnread } = data.readNotification;

				if (unread) {
					notifications.totalUnread--;
					const [notif] = items;
					const index = notifications.data.findIndex(
						item => item.entityId === notif.entityId,
					);
					notifications.data[index] = notif;
					dispatch(
						setNotifications({
							data: notifications.data,
							totalUnread: notifications.totalUnread,
						}),
					);
				}
			},
		},
	);

	useEffect(() => {
		updateNotification({
			variables: {
				id,
			},
		});
	}, [id]);

	return (
		<Layout style={{paddingHorizontal: 15}}>
			<Text
				style={{
					width: '100%',
					textAlign: 'center',
					fontSize: 20,
					fontWeight: 'bold',
					marginBottom: 25,
				}}>
				{subject}
			</Text>
			<Text>{content}</Text>
		</Layout>
	);
};

export default Detail;
