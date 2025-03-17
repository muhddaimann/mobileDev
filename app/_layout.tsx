import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
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
      <Slot />
    </PaperProvider>
  );
}
