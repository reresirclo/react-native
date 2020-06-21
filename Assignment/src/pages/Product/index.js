import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import CategoryList from './CategoryList';

const Product = props => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Product"
				component={CategoryList}
			/>
		</Stack.Navigator>
	);
};

export default Product;
