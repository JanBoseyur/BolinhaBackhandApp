
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
          height: 80, // Aumenta la altura de la barra para acomodar el texto
          paddingBottom: 10, // Agrega un poco de espacio inferior
        },

        tabBarLabelStyle: {
          fontSize: 12, // Tamaño del texto
          marginTop: 4, // Ajusta la posición del texto debajo del ícono
        },

        tabBarIconStyle: {
          marginTop: 10,
        },

      }}
    >

      <Tabs.Screen
        name = "ranking"
        options = {{
          title: 'Ranking',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name = "podium" size = {28} color = {color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name = "index"
        options = {{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name = "home" size = {28} color = {color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
