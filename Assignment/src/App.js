import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { Provider } from 'react-redux';
import Root from '@src/navigation';
import store from '@src/redux/store';
import client from '@src/services/graphql/client';

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
