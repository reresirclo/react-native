import { useNavigation } from '@react-navigation/native';
import { Layout } from '@src/component';
import { setNotifications } from '@src/redux/actions';
import { customerNotificationList } from '@src/services/graphql';
import { logout } from '@src/services/helper';
import React, { useCallback, useEffect, useState } from 'react';
import {
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const List = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const notifications = useSelector(state => state.notifications);
	const [data, setData] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [getNotifciation, { loading }] = customerNotificationList(
		{
			fetchPolicy: 'cache-and-network',
			onCompleted: data => {
				const { totalUnread, items } = data.customerNotificationList;
				dispatch(
					setNotifications({
						data: items,
						totalUnread,
					}),
				);
			},
			onError: () => {
				logout(dispatch);
			},
		},
		true,
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		getNotifciation();
		setRefreshing(loading);
	}, [loading]);

	useEffect(() => {
		if (JSON.stringify(data) !== JSON.stringify(notifications)) {
			setData(notifications.data);
		}
	}, [data, notifications]);

	const Item = props => {
		return (
			<View style={{ borderBottomWidth: 1 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.push('Detail Notification', {
							data: props,
						});
					}}
					style={[
						{
							paddingVertical: 25,
							marginHorizontal: 16,
						},
					]}>
					<View style={{ width: '100%', flexDirection: 'row' }}>
						<View
							style={{
								flex: 1,
							}}>
							<Text style={{ fontSize: 14, textAlign: 'left' }}>
								{props.subject}
							</Text>
						</View>
						<View
							style={{
								height: 20,
								width: 15,
								justifyContent: 'center',
							}}>
							{props.unread ? (
								<View
									style={{
										width: 15,
										height: 15,
										backgroundColor: 'red',
										borderRadius: 15,
									}}
								/>
							) : null}
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<Layout>
			{data.length === 0 ? (
				<Text>There is no any notification</Text>
			) : (
				<FlatList
					scrollEnabled
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
					style={{ width: '100%' }}
					data={data}
					renderItem={({ item }) => (
						<Item
							id={item.entityId}
							content={item.content}
							subject={item.subject}
							level={item.level}
							unread={item.unread}
							createdAt={item.createdAt}
						/>
					)}
					keyExtractor={item => String(item.entityId)}
				/>
			)}
		</Layout>
	);
};

export default List;
