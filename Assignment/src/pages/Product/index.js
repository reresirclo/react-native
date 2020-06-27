import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Categories from './Categories';
import Detail from './Detail';
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
        Detail,
    };
};

export { Product, createProduct };
