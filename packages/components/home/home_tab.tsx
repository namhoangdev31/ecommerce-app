import { useWindowDimensions } from 'react-native'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { MainContent } from './widget/MainContent'
import { CustomDrawerContent } from './widget/CustomDrawerContent'

const Drawer = createDrawerNavigator()

export function MainTab() {
  const dimensions = useWindowDimensions()
  const navigation = useNavigation()

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="Main"
        component={MainContent}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitle: 'Home',
          headerStyle: {
            backgroundColor: '#4095CD',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
          },
          drawerStyle: {
            width: 240,
          },
          headerRight: () => (
            <Ionicons
              name="ios-search"
              size={24}
              color="#fff"
              onPress={openDrawer}
              style={{
                padding: 10,
              }}
            />
          ),
          drawerPosition: 'right',
          drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
          drawerLabelStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => null,
        }}
      />
    </Drawer.Navigator>
  )
}
