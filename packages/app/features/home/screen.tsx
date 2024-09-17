import { Text } from 'app/design/typography'
import {
  Button,
  Column,
  Div,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SafeArea } from 'app/provider/safe-area'
import { useLink } from 'solito/link'
import { useSafeArea } from 'react-native-safe-area-context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'solito/router'


const Tab = createBottomTabNavigator()


export function HomeTab() {
  return (
    <SafeAreaView className="flex-1">
        <ScrollView>
          <Column className="items-center justify-center pl-1.5 pr-1.5">
            {[...Array(20)].map((_, index) => (
              <Text key={index} className="mb-4 text-2xl font-bold">
                Home ${index}
              </Text>
            ))}
          </Column>
        </ScrollView>
      </SafeAreaView>
  )
}

function AboutTab() {
  const userLinkProps = useLink({
    href: '/user/nate',
  })
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Column className="items-center justify-center pl-1.5 pr-1.5">
          {[...Array(50)].map((_, index) => (
            <Text key={index} className="mb-4 text-2xl font-bold">
              Home ${index}
            </Text>
          ))}
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold">About</Text>
            <Button title="Press me" className="mt-4" {...userLinkProps} />
          </View>
        </Column>
      </ScrollView>
    </SafeAreaView>
  )
}

function ContactTab() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Contact</Text>
    </View>
  )
}

// function SettingsTab() {
//   return (
//     <View className="flex-1 items-center justify-center">
//       <Text className="text-2xl font-bold">Settings</Text>
//     </View>
//   )
// }

export function HomeScreen() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerShown: false,
  })
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false, title: 'Home ABR' }}
        component={HomeTab}
      />
      <Tab.Screen
        name="About"
        options={{ headerShown: false }}
        component={AboutTab}
      />
      <Tab.Screen
        name="Contact"
        options={{ headerShown: false }}
        component={ContactTab}
      />
    </Tab.Navigator>
  )
}
