import React, { useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import Layout from '../../component/Layout';

const Splashscreen = props => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	if (props.fadeOut) {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}

	return (
		<Layout>
			<Animated.View
				style={[
					{
						backgroundColor: 'red',
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					},
					{
						opacity: fadeAnim, // Bind opacity to animated value
					},
				]}>
				<View>
					<Text style={{ color: 'white', fontSize: 50 }}>
						Assignment
					</Text>
				</View>
			</Animated.View>
		</Layout>
	);
};

export default Splashscreen;
