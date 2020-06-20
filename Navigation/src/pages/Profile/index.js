import React from 'react';
import { View, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Profile;
