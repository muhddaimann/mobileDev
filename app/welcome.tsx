import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme, ActivityIndicator } from 'react-native-paper';

export default function Welcome() {
  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 1000);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.onBackground }]}>Welcome Back!</Text>
      <ActivityIndicator animating size="large" color={colors.onBackground} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  loader: { position: 'absolute', bottom: 50 },
});
