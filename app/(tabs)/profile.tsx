import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { AuthContext } from '@/contexts/authContext';

export default function Profile() {
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Profile" />
        <Card.Content>
          <Text variant="headlineSmall" style={styles.username}>
            {auth?.user?.username || 'Guest'}
          </Text>
          <Text variant="bodyMedium">Welcome to your profile page.</Text>
        </Card.Content>
        {auth?.user && (
          <Card.Actions>
            <Button mode="contained" onPress={auth.logout} style={styles.button}>
              Logout
            </Button>
          </Card.Actions>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    alignItems: 'center',
  },
  username: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 12,
  },
});
