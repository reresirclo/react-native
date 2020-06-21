import React from 'react';
import {
    ActivityIndicator, FlatList,
    Text,


    TouchableOpacity, View
} from 'react-native';
import { useSelector } from 'react-redux';
import Layout from '../../component/Layout';


const List = ({ navigation }) => {
	let data = [];
	const token = useSelector(state => state.token);
    const notifications = useSelector(state => state.notifications);

	data = notifications.data;

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
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<View
							style={{
								width: '95%',
							}}>
							<Text style={{ fontSize: 14, textAlign: 'left' }}>
								{props.subject}
							</Text>
						</View>
						<View
							style={{
								height: 20,
								width: '5%',
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
			{notifications.length === 0 ? (
				<Text>There is no any notification</Text>
			) : (
				<FlatList
					scrollEnabled
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
