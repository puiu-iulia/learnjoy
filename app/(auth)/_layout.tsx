import { Tabs } from 'expo-router';
import { supabase } from '@/utils/supabase';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Layout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Tabs
                    screenOptions={{
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: '#64867e',
                        },
                        tabBarStyle: {
                            backgroundColor: '#64867e',
                        },
                        tabBarActiveTintColor: '#000',
                        tabBarInactiveTintColor: '#fff',
                        headerTintColor: '#000',
                        //   headerRight: () => (
                        //     <TouchableOpacity onPress={() => supabase.auth.signOut()}>
                        //       <Ionicons name="log-out-outline" size={24} color="white" />
                        //     </TouchableOpacity>
                        //   ),
                    }}
                >
                    <Tabs.Screen
                        name="(projects)"
                        options={{
                            headerShown: false,
                            title: 'Home',
                            tabBarIcon: ({ size, color }) => (
                                <Ionicons
                                    name="home-outline"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="notes"
                        options={{
                            title: 'Notes',
                            tabBarIcon: ({ size, color }) => (
                                <Ionicons
                                    name="albums-outline"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({ size, color }) => (
                                <Ionicons
                                    name="person-outline"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};
export default Layout;
