import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { useMoviesStore } from '@/contexts/api/movie';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Movie() {
  const { colors } = useTheme();
  const { fetchTrending, fetchPopular, fetchTopRated, fetchUpcoming, fetchNowPlaying, trending, popular, topRated, upcoming, nowPlaying, loading, searchMovies, searchResults } = useMoviesStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchTrending();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
    fetchNowPlaying();
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    searchMovies(text);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.searchBar, { backgroundColor: colors.surface, color: colors.onSurface }]}
        placeholder="Search Movies..."
        placeholderTextColor={colors.onSurfaceVariant}
        value={query}
        onChangeText={handleSearch}
      />

      {loading && <ActivityIndicator size="large" color={colors.error} style={{ marginVertical: hp(2) }} />}

      {searchResults.length > 0 ? (
        <FlatList
          horizontal
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <>
          <MovieSection title="Trending" movies={trending} />
          <MovieSection title="Popular" movies={popular} />
          <MovieSection title="Top Rated" movies={topRated} />
          <MovieSection title="Upcoming" movies={upcoming} />
          <MovieSection title="Now Playing" movies={nowPlaying} />
        </>
      )}
    </ScrollView>
  );
}

const MovieSection = ({ title, movies }: { title: string; movies: any[] }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.error }]}>{title}</Text>
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: wp(5) },
  searchBar: { padding: hp(1.5), borderRadius: wp(2), marginBottom: hp(2), fontSize: wp(4) },
  sectionContainer: { marginBottom: hp(3) },
  sectionTitle: { fontSize: wp(5), fontWeight: '600', marginBottom: hp(1) },
  card: { marginRight: wp(3), width: wp(30), height: hp(20), borderRadius: wp(2), overflow: 'hidden' },
  poster: { width: '100%', height: '100%', borderRadius: wp(2) },
});
