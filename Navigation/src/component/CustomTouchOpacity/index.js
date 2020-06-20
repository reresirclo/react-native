import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomTouchOpacity = props => {
	return (
		<TouchableOpacity {...props} style={[props.style, { padding: 10, backgroundColor: 'red', borderRadius: 5 }]} Î>
			<Text style={{ color: 'white' }}>{props.title}</Text>
		</TouchableOpacity>
	);
};

export default CustomTouchOpacity;
