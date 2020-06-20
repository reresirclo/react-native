import React from 'react';
import { Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <>
      <Text>Home</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </>
  );
};

export default Home;
