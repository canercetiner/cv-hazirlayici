import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Only import mobile ads on native platforms
let mobileAds: any;
if (Platform.OS !== 'web') {
  mobileAds = require('react-native-google-mobile-ads').default;
}

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize Google Mobile Ads SDK (only on native platforms)
    if (Platform.OS !== 'web' && mobileAds) {
      mobileAds()
        .initialize()
        .then((adapterStatuses: any) => {
          console.log('✅ AdMob SDK initialized:', adapterStatuses);
        })
        .catch((error: any) => {
          console.error('❌ AdMob SDK initialization failed:', error);
        });
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="editor" options={{ headerShown: false }} />
        <Stack.Screen name="preview/index" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
