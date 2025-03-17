import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useMode } from '@/contexts/modeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Settings() {
  const router = useRouter();
  const { colors } = useTheme();
  const { mode, toggleMode } = useMode();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Settings</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={toggleMode}>
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
          Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.error }]} onPress={() => router.push('/login')}>
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Go to Landing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: wp(5) },
  title: { fontSize: wp(7), fontWeight: 'bold', marginBottom: hp(2) },
  button: { paddingVertical: hp(1.8), paddingHorizontal: wp(8), borderRadius: wp(3), marginBottom: hp(2) },
  buttonText: { fontSize: wp(4.5), fontWeight: '600' },
});
