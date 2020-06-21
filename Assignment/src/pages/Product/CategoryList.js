import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Layout from '../../component/Layout';

const CATEGORY_LIST = gql`
	query {
		categoryList(filters: { name: { match: "default" } }) {
			children {
				id
				level
				url_key
				name
				is_anchor
				children {
					id
					level
					url_key
					name
					is_anchor
					children {
						id
						level
						url_key
						name
						is_anchor
					}
				}
			}
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
		textAlign: 'center',
	},
});

const CategoryList = props => {
	const { navigation } = props;
	const { params } = props.route;

	let categoryList = [];

	const Item = ({ id, title, children, level, urlKey }) => {
		return (
			<View style={{ borderBottomWidth: 1 }}>
				<TouchableOpacity
					onPress={() => {
						if (level === 4) {
							navigation.push('Product List', {
								children: children,
								headerTitle: title,
								id,
							});
						} else {
							if (children.length > 0) {
								navigation.push('Category List', {
									children: children,
									headerTitle: title,
									id,
								});
							} else {
								navigation.push('Product List', {
									children: children,
									headerTitle: title,
									id,
								});
							}
						}
					}}
					style={[styles.item]}>
					<Text style={styles.title}>{title}</Text>
				</TouchableOpacity>
			</View>
		);
	};

	if (params) {
		const { children, headerTitle } = params;
		categoryList = children;

		navigation.setOptions({
			title: headerTitle,
		});
	} else {
		const { data, loading, error } = useQuery(CATEGORY_LIST);

		if (loading) {
			return (
				<Layout>
					<ActivityIndicator size="large" color="red" />
				</Layout>
			);
		}

		if (data) {
			let [root] = data.categoryList;
			categoryList = root.children.filter(item => {
				return item.children.length > 0 && item.level === 2;
			});
		}
	}

	return (
		<Layout>
			<FlatList
				scrollEnabled
				style={{ width: '100%' }}
				data={categoryList}
				renderItem={({ item }) => (
					<Item
						id={item.id}
						title={item.name}
						children={item.children}
						level={item.level}
						urlKey={item.url_key}
					/>
				)}
				keyExtractor={item => String(item.id)}
			/>
		</Layout>
	);
};

export default CategoryList;
