import { useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, ImageLoadEventData, NativeSyntheticEvent, ActivityIndicator } from 'react-native';
import { useImgFlipStore } from '@/contexts/api/imgFlip';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Meme() {
  const { colors } = useTheme();
  const { templates, fetchTemplates } = useImgFlipStore();
  const [imageData, setImageData] = useState<Record<string, { height: number; isWide: boolean }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates().finally(() => setLoading(false));
  }, []);

  const leftColumn: any[] = [];
  const rightColumn: any[] = [];

  templates.forEach((meme, index) => {
    if (index % 2 === 0) {
      leftColumn.push(meme);
    } else {
      rightColumn.push(meme);
    }
  });

  const handleImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>, id: string) => {
    try {
      const { width, height } = event.nativeEvent.source;
      const aspectRatio = width / height;
      const calculatedHeight = wp(47) / aspectRatio;
      setImageData((prev) => ({
        ...prev,
        [id]: { height: calculatedHeight, isWide: aspectRatio > 1.5 },
      }));
    } catch (error) {
      console.warn(`Failed to load image dimensions for ${id}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.masonryContainer}>
        <View style={styles.column}>
          {leftColumn.map((item) => (
            <TouchableOpacity key={item.id} style={styles.memeItem}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.url }}
                  style={[
                    styles.memeImage,
                    { height: imageData[item.id]?.height || 200 },
                  ]}
                  resizeMode={imageData[item.id]?.isWide ? "contain" : "cover"} 
                  onLoad={(event) => handleImageLoad(event, item.id)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          {rightColumn.map((item) => (
            <TouchableOpacity key={item.id} style={styles.memeItem}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.url }}
                  style={[
                    styles.memeImage,
                    { height: imageData[item.id]?.height || 200 },
                  ]}
                  resizeMode={imageData[item.id]?.isWide ? "contain" : "cover"}
                  onLoad={(event) => handleImageLoad(event, item.id)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  imageWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    alignItems: 'center',
  },
  memeImage: { width: '100%', borderRadius: 12 },
});
