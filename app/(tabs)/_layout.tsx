import { Tabs } from 'expo-router';
import { View, SafeAreaView, Platform } from "react-native";
import { Home, Clapperboard, PaintBucket, Settings } from 'lucide-react-native';
import { useTheme } from "react-native-paper";
import Top from "@/components/shared/top";
import Topp from "@/components/shared/topp";
import Toppp from "@/components/shared/toppp";
import Topppp from "@/components/shared/topppp";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <View style={{ flex: 1, backgroundColor: colors.surface }}>
          <Tabs
            screenOptions={{
              headerShown: true,
              tabBarStyle: {
                backgroundColor: colors.surface,
                height: Platform.OS === 'android' ? hp("11%") : hp("8%"),
                paddingTop: hp("0.5%"),
                borderTopWidth: 0,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 0,
              },
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.outline,
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: '500',
              },
            }}>
            <Tabs.Screen
              name="home"
              options={{
                title: 'Home',
                header: () => <Top />,
                tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="movie"
              options={{
                title: 'Movie',
                header: () => <Topp />,
                tabBarIcon: ({ color, size }) => <Clapperboard color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="color"
              options={{
                title: 'Color',
                header: () => <Toppp />,
                tabBarIcon: ({ color, size }) => <PaintBucket color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                header: () => <Topppp />,
                tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
              }}
            />
          </Tabs>
        </View>
      </SafeAreaView>
    </View>
  );
}
