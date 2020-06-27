import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApolloClient from 'apollo-boost';
import React from 'react';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

const client = new ApolloClient({
    uri: 'https://lottemart.testingnow.me/graphql',
});
const Stack = createStackNavigator();

const MyStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
);

const App = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </ApolloProvider>
    );
};

export default App;
