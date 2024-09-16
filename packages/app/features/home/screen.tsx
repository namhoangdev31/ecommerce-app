import { Text } from 'app/design/typography'
import { Column, Div, SafeAreaView, ScrollView } from "app/design/total-design"
import { View } from "app/design/view"
import { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeArea } from "app/provider/safe-area";

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView >
        <Column className='pl-1.5 pr-1.5 items-center justify-center'>
          {[...Array(50)].map((_, index) => (
            <Text key={index} className='text-2xl font-bold mb-4'>Home ${index}</Text>
          ))}
        </Column>
      </ScrollView>
    </SafeAreaView>
  )
}

function AboutTab() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className='text-2xl font-bold'>About</Text>
    </View>
  )
}

function ContactTab() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className='text-2xl font-bold'>Contact</Text>
    </View>
  )
}

function SettingsTab() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className='text-2xl font-bold'>Settings</Text>
    </View>
  )
}

export function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{ headerShown: true }} component={HomeTab} />
      <Tab.Screen name="About" options={{ headerShown: false }} component={AboutTab} />
      <Tab.Screen name="Contact" options={{ headerShown: false }} component={ContactTab} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsTab} />
    </Tab.Navigator>
  )
}
