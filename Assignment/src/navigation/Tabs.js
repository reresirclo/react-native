import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { createNotifications, Home, Product, Profile } from '../pages';
import { IconWithBadge } from '../component';

const Tabs = () => {
    const Tab = createBottomTabNavigator();
    const { totalUnread } = useSelector((state) => state.notifications);
    const Notifications = createNotifications();

    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Profile':
                            iconName = 'face';
                            break;
                        case 'Product':
                            iconName = 'local-mall';
                            break;
                        case 'Notifications':
                            return (
                                <IconWithBadge
                                    name="notifications"
                                    badgeCount={totalUnread}
                                    color={color}
                                    size={size}
                                />
                            );
                    }

                    return (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Product" component={Product} />
            <Tab.Screen name="Notifications" component={Notifications.Root} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default Tabs;
