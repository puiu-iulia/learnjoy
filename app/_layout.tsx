import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { supabase } from '@/utils/supabase';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useSegments, useRouter, Slot } from 'expo-router';
import 'react-native-reanimated';
import { Session } from '@supabase/supabase-js';

export default function RootLayout() {

    const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const segments = useSegments();
  const router = useRouter();



    useEffect(() => {
    // Listen for changes to authentication state
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('supabase.auth.onAuthStateChange', event, session);

      setSession(session);
      setInitialized(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace('/(auth)/');
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace('/');
    }
  }, [session, initialized]);

  return <Slot />;
}
