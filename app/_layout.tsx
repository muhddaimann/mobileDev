import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '@/contexts/authContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <PaperProvider>
        <Slot />
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>
  );
}
