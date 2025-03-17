import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useMode } from '@/contexts/modeContext';

export default function Home() {
  const { colors } = useTheme();
  const { mode, toggleMode } = useMode();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Home</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.onPrimary }]} onPress={toggleMode}>
        <Text style={[styles.buttonText, { color: colors.primary }]}>
          Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#FF5C5C',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
