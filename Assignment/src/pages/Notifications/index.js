import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Detail from './Detail';
import List from './List';

const Notifications = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Notifications" component={List} />
        </Stack.Navigator>
    );
};

const createNotifications = () => ({
    Root: Notifications,
    List,
    Detail,
});

export { Notifications, createNotifications };
