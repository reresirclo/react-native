import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = props => {
    return (
        <SafeAreaView
            style={[
                { flex: 1, alignItems: 'center', justifyContent: 'center' },
                props.style,
            ]}>
            {props.children}
        </SafeAreaView>
    );
};

export default Layout;
