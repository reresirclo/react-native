import { gql } from 'apollo-boost';
import React from 'react';
import {
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Layout from '../../component/Layout';

const CUSTOMER_LOGIN = gql`
	query {
		categoryList(filters: { name: { match: "default" } }) {
			children {
				url_key
				name
				is_anchor
				children {
					url_key
					name
					is_anchor
					children {
						url_key
						name
						is_anchor
					}
				}
			}
			url_key
		}
	}
`;

const styles = StyleSheet.create({
	item: {
		alignItems: 'center',
		padding: 20,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

const CategoryList = ({ navigation }) => {
	const DATA = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			title: 'First Item',
		},
		{
			id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
			title: 'Second Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e29d72',
			title: 'Third Item',
		},
	];

	function Item({ id, title }) {
		return (
			<View style={{ borderBottomWidth: 1 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.push('Category List');
					}}
					style={[styles.item]}>
					<Text style={styles.title}>{title}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	function ParentItem({ id, title, content }) {
		return (
			<View style={{ borderBottomWidth: 1 }}>
				<Text style={styles.title}>{title}</Text>
				{content}
			</View>
		);
	}

	const asd = [
		{
			id: '1',
			title: 'Cat 1',
			content: (
				<FlatList
					scrollEnabled
					style={{ width: '100%' }}
					data={DATA}
					renderItem={({ item }) => (
						<Item id={item.id} title={item.title} />
					)}
					keyExtractor={item => item.id}
				/>
			),
		},
		{
			id: '2',
			title: 'Cat 2',
			content: (
				<FlatList
					scrollEnabled
					style={{ width: '100%' }}
					data={DATA}
					renderItem={({ item }) => (
						<Item id={item.id} title={item.title} />
					)}
					keyExtractor={item => item.id}
				/>
			),
        },
        {
			id: '3',
			title: 'Cat 3',
			content: (
				<FlatList
					scrollEnabled
					style={{ width: '100%' }}
					data={DATA}
					renderItem={({ item }) => (
						<Item id={item.id} title={item.title} />
					)}
					keyExtractor={item => item.id}
				/>
			),
		},
	];

	return (
		<Layout>
			<FlatList
				scrollEnabled
				style={{ width: '100%' }}
				data={asd}
				renderItem={({ item }) => (
					<ParentItem
						id={item.id}
						content={item.content}
						title={item.title}
					/>
				)}
				keyExtractor={item => item.id}
			/>
		</Layout>
	);
};

export default CategoryList;
