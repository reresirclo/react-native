import React, { useEffect, useState, useRef } from 'react';
import {
	SafeAreaView,
	Text,
	View,
	ScrollView,
	Image,
	ActivityIndicator,
	Animated,
} from 'react-native';
import { TouchableOpacity, Layout } from '../../component';
import { product } from '../../services/graphql';
import HTMLView from 'react-native-htmlview';

const Detail = props => {
	const { navigation } = props;
	const { params } = props.route;
	const [urlKey, setUrlKey] = useState('');
	const [data, setData] = useState({});
	const leftAnim = useRef(new Animated.Value(0)).current;
	let arrE = [];
	const [translate, setTranslate] = useState(0);
	const [globalIndex, setGlobalIndex] = useState(0);
	const [imgContainer, setImgContainer] = useState({});
	const [getProduct, { loading }] = product({
		onCompleted: data => {
			const [dataProduct] = data.products.items;
			setData(dataProduct);
		},
	});

	useEffect(() => {
		if (params) {
			const { urlKey } = params;
			setUrlKey(urlKey);
			getProduct({
				variables: {
					urlKey,
				},
			});
		}
	}, [params]);

	if (loading || Object.keys(data).length === 0) {
		return (
			<Layout>
				<ActivityIndicator size="large" color="red" />
			</Layout>
		);
	}

	return (
		<SafeAreaView>
			<ScrollView style={{ padding: 10, height: '92%' }}>
				<View
					style={{
						backgroundColor: 'white',
						shadowColor: '#000',
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,

						elevation: 3,
						borderRadius: 5,
						marginBottom: 15,
					}}>
					<View
						onTouchStart={e => {
							arrE = [];
						}}
						onTouchMove={e => {
							arrE.push(e.nativeEvent.locationX);
						}}
						onTouchEndCapture={e => {
							const firstX = arrE.shift();
							const lastX = arrE.pop();
							const calcX = lastX - firstX;

							if (
								calcX < 0 &&
								globalIndex < data.media_gallery.length - 1
							) {
								setGlobalIndex(globalIndex + 1);
								const translateCalc =
									translate - imgContainer.width;
								setTranslate(translateCalc);
								Animated.timing(leftAnim, {
									toValue: translateCalc,
									duration: 0,
									useNativeDriver: true,
								}).start();
							} else if (calcX > 0 && globalIndex > 0) {
								setGlobalIndex(globalIndex - 1);
								const translateCalc =
									translate + imgContainer.width;
								setTranslate(translateCalc);
								Animated.timing(leftAnim, {
									toValue: translateCalc,
									duration: 0,
									useNativeDriver: true,
								}).start();
							}
						}}
						style={{
							borderTopStartRadius: 5,
							borderTopEndRadius: 5,
							backgroundColor: 'white',
							width: '100%',
							paddingTop: '100%',
						}}>
						<View
							onLayout={e => {
								setImgContainer(e.nativeEvent.layout);
							}}
							style={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								flexDirection: 'row',
							}}>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									position: 'absolute',
									bottom: 15,
									width: '100%',
									alignItems: 'center',
									justifyContent: 'center',
									zIndex: 1,
								}}>
								{data.media_gallery.map((obj, index) => {
									return (
										<View
											key={`point-${index}`}
											style={{
												borderRadius: 2,
												width: 8,
												height: 8,
												backgroundColor:
													index === globalIndex
														? 'red'
														: 'gray',
												marginRight: 4,
											}}
										/>
									);
								})}
							</View>
							{data.media_gallery.map((item, index) => {
								return (
									<Animated.Image
										key={index}
										style={[
											{
												width: '100%',
												height: '100%',
												resizeMode: 'contain',
											},
											{
												transform: [
													{
														translateX: leftAnim,
													},
												],
											},
										]}
										source={{
											uri: item.url,
										}}
									/>
								);
							})}
						</View>
					</View>
					<View
						style={{
							padding: 10,
							borderBottomWidth: 1,
							borderBottomColor: '#bfbfbf',
						}}>
						<Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
						<Text style={{ fontWeight: 'bold', color: 'red' }}>
							{`${
								data.price_range.maximum_price.final_price
									.currency
							} ${
								data.price_range.maximum_price.final_price.value
							}`}
						</Text>
					</View>
					<View
						style={{
							padding: 10,
							flex: 1,
							flexDirection: 'row',
						}}>
						<View
							style={{
								width: '33%',
								alignItems: 'center',
							}}>
							<Text style={{ fontWeight: 'bold' }}>Rating</Text>
							<Text>-</Text>
						</View>
						<View
							style={{
								width: '33%',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={{ fontWeight: 'bold' }}>Stock</Text>
							<Text>{data.stock_status.replace('_', ' ')}</Text>
						</View>
						<View
							style={{
								width: '33%',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={{ fontWeight: 'bold' }}>SKU</Text>
							<Text>{data.sku}</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						borderRadius: 5,
						padding: 10,
						backgroundColor: 'white',
						shadowColor: '#000',
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,

						elevation: 3,
						marginBottom: 15,
					}}>
					<Text
						style={{
							color: 'red',
							fontWeight: 'bold',
							marginBottom: 10,
						}}>
						Details
					</Text>
					<HTMLView value={data.description.html} />
				</View>
				<View
					style={{
						borderRadius: 5,
						padding: 10,
						backgroundColor: 'white',
						shadowColor: '#000',
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,

						elevation: 3,
						marginBottom: 25,
					}}>
					<Text
						style={{
							color: 'red',
							fontWeight: 'bold',
							marginBottom: 10,
						}}>
						More Information
					</Text>
					{data.more_info.map((item, index) => {
						return (
							<Text key={index}>{`${item.label}: ${
								item.value
							}`}</Text>
						);
					})}
				</View>
			</ScrollView>
			<View style={{ padding: 10, backgroundColor: 'white' }}>
				<TouchableOpacity title="Back To Home" />
			</View>
		</SafeAreaView>
	);
};

export default Detail;
