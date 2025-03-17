import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Landing() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Mobile Dev</Text>
      <Text style={[styles.subtitle, { color: colors.onBackground }]}>
        Slowly but Surely
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => router.replace('/(tabs)')}>
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Enter App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: wp(5) },
  title: { fontSize: wp(7), fontWeight: 'bold', marginBottom: hp(2) },
  subtitle: { fontSize: wp(4.5), textAlign: 'center', marginBottom: hp(4) },
  button: { paddingVertical: hp(1.8), paddingHorizontal: wp(8), borderRadius: wp(3) },
  buttonText: { fontSize: wp(4.5), fontWeight: '600' },
});
