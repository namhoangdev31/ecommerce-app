import { Text } from 'app/design/typography'
import { Column } from "app/design/total-design"
import { View } from "app/design/view"
import { ScrollView } from 'react-native'
import { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <ScrollView className='py-10 flex-1 scroll-smooth md:scroll-auto'>
      <Column className='flex-1 justify-center items-center px-20 overflow-y-auto'>
        <Text className='text-2xl font-bold'>Home</Text>
        {/* Repeat the Text component as needed */}
      </Column>
    </ScrollView>
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

export function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeTab} />
      <Tab.Screen name="About" options={{ headerShown: false }} component={AboutTab} />
      <Tab.Screen name="Contact" options={{ headerShown: false }} component={ContactTab} />
    </Tab.Navigator>
  )
}
