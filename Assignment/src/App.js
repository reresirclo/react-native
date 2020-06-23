import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { Provider } from 'react-redux';
import Root from './pages/Root';
import store from './redux/store';
import client from './services/graphql/client';

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
