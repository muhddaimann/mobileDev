import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from "react-native";
import { ModeProvider, useMode } from '@/contexts/modeContext';

export default function RootLayout() {
  return (
    <ModeProvider>
      <ThemedApp />
    </ModeProvider>
  );
}

function ThemedApp() {
  const { theme } = useMode();

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <Slot />
    </PaperProvider>
  );
}
