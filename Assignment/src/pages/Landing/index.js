import AsyncStorage from '@react-native-community/async-storage';
import { Layout, TextInput, TouchableOpacity } from '@src/component';
import { setToken } from '@src/redux/actions';
import { customerLogin } from '@src/services/graphql';
import React, { createRef, useState } from 'react';
import { Alert, Platform, Text, ToastAndroid, View } from 'react-native';
import { useDispatch } from 'react-redux';

const Landing = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [txtInputEmail, setTxtInputEmail] = useState(createRef());
    const [txtInputPassword, setTxtInputPassword] = useState(createRef());

    const [login, { loading }] = customerLogin({
        onError: error => {
            const msg = error.message;

            if (Platform.OS === 'android') {
                ToastAndroid.show(msg, ToastAndroid.SHORT);
            } else {
                Alert.alert(msg);
            }

            txtInputEmail.focus();
        },
        onCompleted: async data => {
            const { token } = data.generateCustomerToken;
            dispatch(setToken(token));
            await AsyncStorage.setItem('token', token);
        },
    });

    const doLogin = () => {
        login({
            variables: {
                username: email,
                password: password,
            },
        });
    };

    return (
        <Layout>
            <Text style={{ color: 'red', fontSize: 40, marginBottom: 100 }}>
                Assignment
            </Text>
            <View style={{ width: '100%', padding: 25 }}>
                <TextInput
                    autoCompleteType="email"
                    placeholder="Email"
                    value={email}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={input => {
                        setTxtInputEmail(input);
                    }}
                    onChangeText={txt => {
                        setEmail(txt);
                    }}
                    onSubmitEditing={() => {
                        txtInputPassword.focus();
                    }}
                />
                <TextInput
                    autoCompleteType="password"
                    value={password}
                    secureTextEntry
                    placeholder="Password"
                    returnKeyType="send"
                    blurOnSubmit={true}
                    onSubmitEditing={doLogin}
                    ref={input => {
                        setTxtInputPassword(input);
                    }}
                    onChangeText={txt => {
                        setPassword(txt);
                    }}
                />
                <TouchableOpacity
                    style={{ marginTop: 25 }}
                    onPress={doLogin}
                    title={'Login'}
                    loading={loading}
                />
            </View>
        </Layout>
    );
};

export default Landing;
