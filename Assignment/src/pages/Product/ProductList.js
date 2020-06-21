import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Layout from '../../component/Layout';

const PRODUCT_LIST = gql`
	query($id: String!, $currentPage: Int!) {
		products(
			filter: { category_id: { eq: $id } }
			pageSize: 8
			currentPage: $currentPage
		) {
			items {
				url_key
				id
				sku
				name
				image {
					label
					url
				}
				special_price
				price_range {
					maximum_price {
						regular_price {
							currency
							value
						}
						final_price {
							value
							currency
						}
					}
				}
			}
			page_info {
				current_page
				page_size
				total_pages
			}
			total_count
		}
	}
`;

const Product = props => {
	const { navigation } = props;
	const { params } = props.route;
	const [currentPage, setCurrentPage] = useState(1);
	const [productList, setProductList] = useState([]);
	let categoryId = '';

	if (params) {
		const { headerTitle, id } = params;

		categoryId = id;

		navigation.setOptions({
			title: headerTitle,
		});
	}

	const { data, loading, error } = useQuery(PRODUCT_LIST, {
		variables: {
			id: categoryId,
			currentPage,
		},
		onCompleted: data => {
			setProductList(productList.concat(data.products.items));
		},
	});

	const [getMoreProduct] = useLazyQuery(PRODUCT_LIST);

	if (loading && currentPage === 1) {
		return (
			<Layout>
				<ActivityIndicator size="large" color="red" />
			</Layout>
		);
	}

	const loadMore = () => {
		const loadPage = currentPage + 1;
		if (data.products.page_info.total_pages >= loadPage && !loading) {
			getMoreProduct({
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
			{productList.length == 0 ? (
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
					data={productList}
					ListFooterComponent={() => {
						return (
							(!loading && data.products.page_info.total_pages ===
								currentPage && (
								<Text
									style={{
										textAlign: 'center',
										fontSize: 25,
										color: 'gray',
									}}>
									End of Product
								</Text>
							)) || <ActivityIndicator size="large" color="red" />
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
									style={{ width: '100%', height: 200 }}
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
