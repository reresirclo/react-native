import React from 'react';
import { Image, View } from 'react-native';
import ReactSwiper from 'react-native-swiper';

const Swiper = ({
	data,
	width = '100%',
	ratio = '1-1',
	resizeMode = 'contain',
	loop = false,
	autoplay = false,
	activeDotColor = 'red',
}) => {
	let paddingTop;
	if (ratio === '1-1') {
		paddingTop = '100%';
	} else if (ratio === '16-9') {
		paddingTop = '56.25%';
	}

	return (
		<View
			style={{
				borderTopStartRadius: 5,
				borderTopEndRadius: 5,
				backgroundColor: 'white',
				width,
				paddingTop,
			}}>
			<View
				style={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
				}}>
				<ReactSwiper
					loop={loop}
					activeDotColor={activeDotColor}
					autoplay={autoplay}>
					{data.map((item, index) => {
						return (
							<Image
								key={index}
								style={[
									{
										resizeMode,
									},
									{
										width: '100%',
										height: '100%',
									},
								]}
								source={{
									uri: item.url,
								}}
							/>
						);
					})}
				</ReactSwiper>
			</View>
		</View>
	);
};

export default Swiper;
