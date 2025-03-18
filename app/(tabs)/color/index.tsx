import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { useColorStore } from '@/contexts/api/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Color() {
  const { colors } = useTheme();
  const { fetchPalette, fetchColorSuggestions, palette, suggestions, loading, error } = useColorStore();
  const [inputColor, setInputColor] = useState('');

  useEffect(() => {
    fetchPalette();
  }, []);

  const handleGeneratePalette = () => {
    fetchPalette();
  };

  const handleGetSuggestions = () => {
    if (inputColor.trim()) {
      const rgb = hexToRgb(inputColor);
      if (rgb) fetchColorSuggestions(rgb);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleGeneratePalette}>
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Generate Random Palette</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: hp(2) }} />}

      {palette && (
        <FlatList
          data={palette.colors}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ColorBox color={rgbToHex(item)} />}
          contentContainerStyle={styles.paletteContainer}
        />
      )}

      <Text style={[styles.subtitle, { color: colors.onBackground }]}>Get Color Suggestions</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
        placeholder="Enter Hex Color (#FF5733)"
        placeholderTextColor={colors.onSurfaceVariant}
        value={inputColor}
        onChangeText={setInputColor}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.secondary }]} onPress={handleGetSuggestions}>
        <Text style={[styles.buttonText, { color: colors.onSecondary }]}>Get Suggestions</Text>
      </TouchableOpacity>

      {suggestions && (
        <FlatList
          data={suggestions.colors}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ColorBox color={rgbToHex(item)} />}
          contentContainerStyle={styles.paletteContainer}
        />
      )}

      {error && <Text style={{ color: colors.error, marginTop: hp(2) }}>{error}</Text>}
    </View>
  );
}

const ColorBox = ({ color }: { color: string }) => (
  <View style={[styles.colorBox, { backgroundColor: color }]} />
);

const hexToRgb = (hex: string): number[] | null => {
  const match = hex.replace('#', '').match(/.{1,2}/g);
  return match ? match.map((val) => parseInt(val, 16)) : null;
};

const rgbToHex = (rgb: number[]): string => {
  return `#${rgb.map((val) => val.toString(16).padStart(2, '0')).join('')}`;
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(5), alignItems: 'center' },
  subtitle: { fontSize: wp(5), fontWeight: '500', marginTop: hp(2) },
  input: { padding: hp(1.5), borderRadius: wp(2), width: wp(80), textAlign: 'center', fontSize: wp(4), marginBottom: hp(2) },
  button: { paddingVertical: hp(1.8), paddingHorizontal: wp(8), borderRadius: wp(3), marginBottom: hp(2) },
  buttonText: { fontSize: wp(4.5), fontWeight: '600', textAlign: 'center' },
  paletteContainer: { marginTop: hp(2), flexDirection: 'row', justifyContent: 'center' },
  colorBox: { width: wp(15), height: hp(7), marginHorizontal: wp(1.5), borderRadius: wp(2) },
});
