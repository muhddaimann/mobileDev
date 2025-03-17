import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Topp() {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <View style={{ flex: 1 }} />
      
      <Text style={[styles.title, { color: colors.primary }]}>Movie</Text>

      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: hp('7%'),
    paddingTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
