import React from 'react';
import { Provider } from 'react-redux';
import Root from './pages/Root';
import client from './services/graphql';
import { ApolloProvider } from '@apollo/react-hooks';
import store from './redux/store';

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Root />
			</Provider>
		</ApolloProvider>
	);
};

export default App;
