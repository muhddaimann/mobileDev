import { useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, ImageLoadEventData, NativeSyntheticEvent, Text, Animated } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useImgFlipStore } from '@/contexts/api/imgFlip';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Meme() {
  const { colors } = useTheme();
  const { templates, fetchTemplates } = useImgFlipStore();
  const [imageData, setImageData] = useState<Record<string, { height: number; isWide: boolean }>>({});
  const [loading, setLoading] = useState(true);
  const [selectedMeme, setSelectedMeme] = useState<{ id: string; name: string } | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchTemplates().finally(() => setLoading(false));
  }, []);

  const handleImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>, id: string) => {
    try {
      const { width, height } = event.nativeEvent.source;
      const aspectRatio = width / height;
      const calculatedHeight = wp(47) / aspectRatio;
      setImageData((prev) => ({
        ...prev,
        [id]: { height: calculatedHeight, isWide: aspectRatio > 1.5 },
      }));
    } catch {
      console.warn(`Failed to load image dimensions for ${id}`);
    }
  };

  const handleLongPress = (id: string, name: string) => {
    setSelectedMeme({ id, name });
    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, { toValue: 0, duration: 2000, useNativeDriver: true }).start(() => setSelectedMeme(null));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const columns = [[], []] as any[][];
  templates.forEach((meme, i) => columns[i % 2].push(meme));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.masonryContainer}>
        {columns.map((column, colIndex) => (
          <View key={colIndex} style={styles.column}>
            {column.map((item) => (
              <TouchableOpacity key={item.id} style={styles.memeItem} onLongPress={() => handleLongPress(item.id, item.name)}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.url }}
                    style={[styles.memeImage, { height: imageData[item.id]?.height || wp(60) }]}
                    resizeMode={imageData[item.id]?.isWide ? 'contain' : 'cover'}
                    onLoad={(event) => handleImageLoad(event, item.id)}
                  />
                  {selectedMeme?.id === item.id && (
                    <Animated.View style={[styles.memeNameContainer, { backgroundColor: colors.primaryContainer, opacity: fadeAnim }]}>
                      <Text style={[styles.memeName, { color: colors.primary }]}>
                        {selectedMeme?.name ?? ''}
                      </Text>
                    </Animated.View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(2) },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  masonryContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { width: '48%' },
  memeItem: { marginBottom: wp(2) },
  imageWrapper: { borderRadius: wp(3), overflow: 'hidden', elevation: 3, alignItems: 'center', backgroundColor: 'transparent' },
  memeImage: { width: '100%', borderRadius: wp(3) },
  memeNameContainer: { position: 'absolute', bottom: wp(2), paddingHorizontal: wp(3), paddingVertical: wp(1.5), borderRadius: wp(2) },
  memeName: { fontSize: wp(3.5), fontWeight: '600' },
});
