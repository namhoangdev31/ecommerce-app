import { Text } from 'app/design/typography'
import {
  Column,
  Div,
  Row,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useLink } from 'solito/link'

import { useNavigation } from 'expo-router'

import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { IconButton, MD3Colors, Button } from 'react-native-paper'

const Tab = createBottomTabNavigator()

import { MainTab } from '../../../components/home/home_tab'
import NotificationScreen from '../notification/screen'
import ProfileScreen from 'app/features/profile/screen'
import LoginScreen from '../login/screen'
import RegisterScreen from '../register/screen'

export function HomeScreen() {
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#fff' } }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          headerTitle: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="home" color={color} />
          ),
        }}
        component={MainTab}
      />
      <Tab.Screen
        name="Notifications"
        options={{
          headerShown: false,
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="ios-notifications" color={color} />
          ),
          headerTintColor: MD3Colors.neutral10,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
        component={NotificationScreen}
      />

      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={24}
              name="ios-person-circle-outline"
              color={color}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}
