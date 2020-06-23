import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Categories from './Categories';
import List from './List';

const Product = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Product" component={Categories} />
		</Stack.Navigator>
	);
};

const createProduct = () => {
	return {
		Product,
		Categories,
		List,
	};
};

export { Product, createProduct };
