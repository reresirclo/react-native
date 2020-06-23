import React, { useState, useEffect } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Layout } from '../../component';
import { productList } from '../../services/graphql';

const Product = props => {
	const { navigation } = props;
	const { params } = props.route;
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [categoryId, setCategoryId] = useState('');

	const [getProducts, { data, loading, error, refetch }] = productList({
		onCompleted: data => {
			setProducts(products.concat(data.products.items));
		},
	});

	useEffect(() => {
		if (params) {
			const { headerTitle, id } = params;
			setCategoryId(id);

			navigation.setOptions({
				title: headerTitle,
			});

			getProducts({
				variables: {
					id,
					currentPage,
				},
			});
		}
	}, [params, currentPage]);

	if (loading && currentPage === 1) {
		return (
			<Layout>
				<ActivityIndicator size="large" color="red" />
			</Layout>
		);
	}

	const loadMore = () => {
		const { total_pages } = data.products.page_info;
		const loadPage = currentPage + 1;

		if (total_pages >= loadPage && !loading) {
			refetch({
				variables: {
					id: categoryId,
					currentPage: loadPage,
				},
			});
			setCurrentPage(loadPage);
		}
	};

	return (
		<Layout>
			{products.length == 0 ? (
				<Text>No Product</Text>
			) : (
				<FlatList
					onEndReached={loadMore}
					onEndReachedThreshold={0.2}
					numColumns={2}
					style={{
						width: '100%',
					}}
					contentContainerStyle={{
						width: '100%',
					}}
					data={products}
					ListFooterComponent={() => {
						return (
							(!loading &&
								data.products.page_info.total_pages ===
									currentPage && (
									<Text
										style={{
											textAlign: 'center',
											fontSize: 25,
											color: 'gray',
										}}>
										End of Product
									</Text>
								)) || (
								<ActivityIndicator size="large" color="red" />
							)
						);
					}}
					ListFooterComponentStyle={{
						height: 75,
						paddingVertical: 5,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					renderItem={({ item }) => {
						const finalPrice =
							item.price_range.maximum_price.final_price;
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.push('Detail Product', {
										urlKey: item.url_key
									})
								}
								style={{
									backgroundColor: 'white',
									width: '47%',
									alignItems: 'center',
									borderRadius: 5,
									margin: 5,
									padding: 5,
									shadowColor: '#000',
									shadowOffset: {
										width: 0,
										height: 1,
									},
									shadowOpacity: 0.2,
									shadowRadius: 1.41,
									elevation: 2,
								}}>
								<Image
									style={{ width: '100%', height: 200, resizeMode:'contain' }}
									source={{
										uri:
											item.image.url === ''
												? null
												: item.image.url,
									}}
								/>
								<View style={{ padding: 10, width: '100%' }}>
									<Text style={{ textAlign: 'left' }}>
										{item.name}
									</Text>
									<Text style={{ textAlign: 'left' }}>
										{`${finalPrice.currency} ${
											finalPrice.value
										}`}
									</Text>
								</View>
							</TouchableOpacity>
						);
					}}
					keyExtractor={item => String(item.id)}
				/>
			)}
		</Layout>
	);
};

export default Product;
