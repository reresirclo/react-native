import React from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IconWithBadge = ({ name, badgeCount, color, size }) => {
	return (
		<View style={{ width: 24, height: 24, margin: 5 }}>
			<MaterialIcons name={name} size={size} color={color} />
			{badgeCount > 0 && (
				<View
					style={{
						position: 'absolute',
						right: '-50%',
						top: -3,
						borderColor: 'white',
						borderWidth: 1,
						backgroundColor: 'red',
						borderRadius: 6,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}>
					<Text
						style={{
							color: 'white',
							fontSize: 10,
							fontWeight: 'bold',
						}}>
						{(badgeCount < 100 && badgeCount) || '99+'}
					</Text>
				</View>
			)}
		</View>
	);
};

export default IconWithBadge;
