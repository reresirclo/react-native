import { useNavigation } from '@react-navigation/native';
import { Layout, TouchableOpacity } from '@src/component';
import { customer } from '@src/services/graphql';
import { logout } from '@src/services/helper';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Profile = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const token = useSelector((state) => state.token);
    let content = <ActivityIndicator size="large" color="red" />;

    if (!token) {
        navigation.navigate('Landing');
    }

    const { data } = customer({
        onError: (errors) => {
            logout(dispatch);
        },
    });

    if (data) {
        const { firstname, lastname, email } = data.customer;

        content = (
            <>
                <Text
                    style={{
                        marginBottom: 10,
                    }}>{`Hello ${firstname} ${lastname}`}</Text>
                <Text
                    style={{
                        marginBottom: 30,
                    }}>
                    {email}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        logout(dispatch);
                    }}
                    title={'Logout'}
                />
            </>
        );
    }

    return <Layout>{content}</Layout>;
};

export default Profile;
