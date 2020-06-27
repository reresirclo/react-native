import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

const CustomTouchableOpacity = (props) => {
	return (
		<TouchableOpacity
			{...props}
			style={[
				props.style,
				{ padding: 10, backgroundColor: 'red', borderRadius: 5 },
				{ alignItems: 'center', justifyContent: 'center' },
			]}
			disabled={props.disabled || props.loading}>
			<Text style={{ color: props.loading ? 'red' : 'white' }}>
				{props.title}
			</Text>
			{props.loading ? (
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<ActivityIndicator size="small" color="#fff" />
				</View>
			) : null}
		</TouchableOpacity>
	);
};

export default CustomTouchableOpacity;
