import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApolloClient from 'apollo-boost';
import React from 'react';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';

const client = new ApolloClient({
	uri: 'https://swiftpwa-be.testingnow.me/graphql',
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
			<Provider store={store}>
				<NavigationContainer>
					<MyStack />
				</NavigationContainer>
			</Provider>
		</ApolloProvider>
	);
};

export default App;
