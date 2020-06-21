import { useMutation } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { gql } from 'apollo-boost';
import React, { createRef, useState } from 'react';
import { Platform, Text, ToastAndroid, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Layout from '../../component/Layout';
import CustomTextInput from '../../component/TextInput';
import CustomTouchOpacity from '../../component/TouchableOpacity';
import { setToken } from '../../redux/actions';

const CUSTOMER_LOGIN = gql`
	mutation($username: String!, $password: String!) {
		generateCustomerToken(email: $username, password: $password) {
			token
		}
	}
`;

const Landing = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [txtInputEmail, setTxtInputEmail] = useState(createRef());
	const [txtInputPassword, setTxtInputPassword] = useState(createRef());

	const [customerLogin, { loading }] = useMutation(CUSTOMER_LOGIN, {
		errorPolicy: 'none',
		onError: error => {
			const msg = error.message;

			if (Platform.OS === 'android') {
				ToastAndroid.show(msg, ToastAndroid.SHORT);
			} else {
				AlertIOS.alert(msg);
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
		customerLogin({
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
				<CustomTextInput
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
				<CustomTextInput
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
				<CustomTouchOpacity
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
