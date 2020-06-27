import React from 'react';
import { View } from 'react-native';
import CustomTouchOpacity from '../../component/CustomTouchOpacity';
import Layout from '../../component/Layout';

const Home = ({ navigation }) => (
    <Layout>
        <CustomTouchOpacity
            onPress={() => navigation.navigate('Profile')}
            title={'Go to Profile'}
        />
    </Layout>
);

export default Home;
