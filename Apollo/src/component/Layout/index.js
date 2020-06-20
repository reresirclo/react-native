import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = props => {
	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {props.children}
        </SafeAreaView>
	);
};

export default Layout;
