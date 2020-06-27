import React from 'react';
import { Button, View } from 'react-native';
import CustomTouchOpacity from '../../component/CustomTouchOpacity';
import Layout from '../../component/Layout';

const Notifications = ({ navigation }) => (
    <Layout>
        <CustomTouchOpacity
            style={{ marginBottom: 10 }}
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')}
        />
        <CustomTouchOpacity
            onPress={() => navigation.goBack()}
            title={'Go Back'}
        />
    </Layout>
);

export default Notifications;
