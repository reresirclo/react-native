import React from 'react';
import { Button, View } from 'react-native';
import CustomTouchOpacity from '../../component/CustomTouchOpacity';
import Layout from '../../component/Layout';

const Settings = ({ navigation }) => (
    <Layout>
        <CustomTouchOpacity
            onPress={() => navigation.goBack()}
            title={'Go Back'}
        />
    </Layout>
);

export default Settings;
