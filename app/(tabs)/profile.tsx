import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function Profile() {
  const handleLogout = () => {
    global.username = undefined;
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.username}>
        {global.username}
      </Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  username: {
    marginBottom: 24,
  },
  button: {
    width: '100%',
    maxWidth: 200,
  },
});