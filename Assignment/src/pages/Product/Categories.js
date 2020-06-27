import { useNavigation } from '@react-navigation/native';
import { Layout } from '@src/component';
import { categoryList } from '@src/services/graphql';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

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

const Categories = props => {
	const navigation = useNavigation();
	const { params } = props.route;
	const [categories, setCategories] = useState([]);

	const processCategories = obj => {
		let [root] = obj.categoryList;
		return root.children.filter(item => {
			return item.children.length > 0 && item.level === 2;
		});
	};

	const [getCategories, { data, loading }] = categoryList({
		onCompleted: data => {
			const categories = processCategories(data);
			setCategories(categories);
		},
	});

	const Item = ({ id, title, children, level }) => {
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

	useEffect(() => {
		if (params) {
			const { children, headerTitle } = params;
			setCategories(children);

			navigation.setOptions({
				title: headerTitle,
			});
		} else if (!data) {
			getCategories();
		} else if (data) {
			const categories = processCategories(data);
			setCategories(categories);
		}
	}, [params, data]);

	if (loading) {
		return (
			<Layout>
				<ActivityIndicator size="large" color="red" />
			</Layout>
		);
	}

	return (
		<Layout>
			<FlatList
				scrollEnabled
				style={{ width: '100%' }}
				data={categories}
				renderItem={({ item }) => (
					<Item
						id={item.id}
						title={item.name}
						children={item.children}
						level={item.level}
					/>
				)}
				keyExtractor={item => String(item.id)}
			/>
		</Layout>
	);
};

export default Categories;
