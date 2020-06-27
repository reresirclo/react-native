import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = (props) => {
    return (
        <View
            style={[
                { flex: 1, alignItems: 'center', justifyContent: 'center' },
                props.style,
            ]}>
            {props.children}
        </View>
    );
};

export default Layout;
