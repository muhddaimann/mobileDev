import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useMode } from '@/contexts/modeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home() {
  const { colors } = useTheme();
  const { mode, toggleMode } = useMode();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={[styles.userCard, { backgroundColor: colors.primaryContainer }]}>
          <Text style={[styles.userName, { color: colors.onPrimaryContainer }]}>Hello, John Doe</Text>
          <Text style={[styles.userMeta, { color: colors.onPrimaryContainer }]}>Role: Admin • Last Login: Today</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.chartCard, { backgroundColor: colors.surface, shadowColor: colors.primary }]}>
            <Text style={[styles.chartTitle, { color: colors.onSurface }]}>Movie</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: colors.onSurface }}>Chart Placeholder</Text>
            </View>
          </View>
          <View style={[styles.chartCard, { backgroundColor: colors.surface, shadowColor: colors.primary }]}>
            <Text style={[styles.chartTitle, { color: colors.onSurface }]}>Color</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: colors.onSurface }}>Chart Placeholder</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.chartCard, { backgroundColor: colors.surface, shadowColor: colors.primary }]}>
            <Text style={[styles.chartTitle, { color: colors.onSurface }]}>Meme</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: colors.onSurface }}>Chart Placeholder</Text>
            </View>
          </View>
          <View style={[styles.chartCard, { backgroundColor: colors.surface, shadowColor: colors.primary }]}>
            <Text style={[styles.chartTitle, { color: colors.onSurface }]}>Trivia</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: colors.onSurface }}>Chart Placeholder</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.chartCard, { backgroundColor: colors.surface, shadowColor: colors.primary }]}>
            <Text style={[styles.chartTitle, { color: colors.onSurface }]}>Revenue Breakdown</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: colors.onSurface }}>Chart Placeholder</Text>
            </View>
          </View>
          <View style={[styles.chartCard, { backgroundColor: colors.surface, shadowColor: colors.primary }]}>
            <Text style={[styles.chartTitle, { color: colors.onSurface }]}>Session Duration</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={{ color: colors.onSurface }}>Chart Placeholder</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <FAB
        icon={mode === 'light' ? 'weather-night' : 'white-balance-sunny'}
        style={[styles.fab, { backgroundColor: colors.primary }]}
        color={colors.onPrimary}
        customSize={55}
        onPress={toggleMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingBottom: hp(3), gap: hp(1) },
  userCard: { width: '100%', padding: wp(5)},
  userName: { fontSize: wp(5), fontWeight: '600' },
  userMeta: { fontSize: wp(4), fontWeight: '400', marginTop: hp(0.5) },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: hp(1), paddingHorizontal: hp(1), },
  chartCard: { flex: 1, borderRadius: wp(3), padding: wp(4), shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  chartTitle: { fontSize: wp(4), fontWeight: '600', marginBottom: hp(1) },
  chartPlaceholder: { height: hp(15), borderWidth: 1, borderColor: '#ccc', borderRadius: wp(2), alignItems: 'center', justifyContent: 'center' },
  fab: { position: 'absolute', right: wp(5), bottom: hp(3) },
});


