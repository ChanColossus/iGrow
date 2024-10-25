import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Avatar, Card } from 'react-native-paper';
import { useAuth } from '../../navigation/RouteNavigator';

const ProfileScreen = () => {
  const { logout } = useAuth();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Avatar.Image
            source={{ uri: user.profilePicture }}
            size={100}
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.name}>
            {user.name}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user.email}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => console.log('Edit Profile Pressed')}
              style={styles.buttonBlue}
            >
              Edit Profile
            </Button>
            <Button mode="contained" onPress={handleLogout} style={styles.buttonRed}>
              Logout
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    marginVertical: 8,
    textAlign: 'center',
  },
  email: {
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonBlue: {
    backgroundColor: '#007bff',
    marginRight: 8,
    flex: 1,
  },
  buttonRed: {
    backgroundColor: '#dc3545',
    flex: 1,
  },
});

export default ProfileScreen;
