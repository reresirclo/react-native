import React, { useState, createRef } from 'react';
import { TextInput, View, Platform, ToastAndroid, Alert } from 'react-native';
import CustomTouchOpacity from '../../component/TouchableOpacity';
import CustomTextInput from '../../component/TextInput';
import Layout from '../../component/Layout';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CUSTOMER_LOGIN = gql`
	mutation($username: String!, $password: String!) {
		generateCustomerToken(email: $username, password: $password) {
			token
		}
	}
`;

const Landing = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [txtInputEmail, setTxtInputEmail] = useState(createRef());
	const [txtInputPassword, setTxtInputPassword] = useState(createRef());

	const [customerLogin, { loading, data, error, called }] = useMutation(
		CUSTOMER_LOGIN,
		{
			onError: error => {
				const msg = error.message;

				if (Platform.OS === 'android') {
					ToastAndroid.show(msg, ToastAndroid.SHORT);
				} else {
					AlertIOS.alert(msg);
                }
                
                txtInputEmail.focus();
            },
            onCompleted: data => {
                navigation.navigate('Profile', {
                    token: data.generateCustomerToken.token,
                });
            }
		},
	);

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
