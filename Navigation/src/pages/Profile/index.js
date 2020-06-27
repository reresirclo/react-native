import React from 'react';
import { View } from 'react-native';
import CustomTouchOpacity from '../../component/CustomTouchOpacity';
import Layout from '../../component/Layout';

const Profile = ({ navigation }) => (
    <Layout>
        <CustomTouchOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('Notifications')}
            title={'Go to Notifications'}
        />
        <CustomTouchOpacity
            onPress={() => navigation.goBack()}
            title={'Go Back'}
        />
    </Layout>
);

export default Profile;
