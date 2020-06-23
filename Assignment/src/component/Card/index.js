import React from 'react';
import { View } from 'react-native';

const Card = props => {
	return (
		<View
			{...props}
			style={[
				{
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
				},
				props.style,
			]}>
			{props.children}
		</View>
	);
};

export default Card;
