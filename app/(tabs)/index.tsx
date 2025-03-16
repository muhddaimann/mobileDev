import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { AuthContext } from '@/contexts/authContext';

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.welcomeText}>
            Welcome, {auth?.user?.username || 'Guest'}!
          </Text>
          <Text variant="bodyMedium">
            This is your home screen. Enjoy your session!
          </Text>
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
  welcomeText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 12,
  },
});
