import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor:'black',
        headerShown: false, 
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'location-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
