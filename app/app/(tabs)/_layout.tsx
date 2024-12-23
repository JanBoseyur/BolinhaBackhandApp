
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions = {{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        
        tabBarStyle: {
          height: 80, 
          paddingBottom: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12, 
          marginTop: 4, 
        },

      }}
    >

      <Tabs.Screen
        name = "ranking"
        options = {{

          tabBarIconStyle: {
            marginTop: 10,
          },

          title: 'Ranking',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name = "podium" size = {28} color = {color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name = "index"
        options = {{

          tabBarIconStyle: {

            margin: 0,
            width: 70,
            height: 68,
          },

          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name = "home" size = {45} color = {color} />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name = "partidos"
        options = {{

          tabBarIconStyle: {
            marginTop: 10,
          },

          title: 'Partidos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name = "tennis" size = {28} color = {color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
