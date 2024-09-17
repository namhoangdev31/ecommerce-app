import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Column,
  SafeAreaView,
  ScrollView,
} from 'app/design/total-design'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')
  const navigation = useNavigation()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: id,
      headerBackTitle: 'back',
    })
  }, [navigation]);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserDetail" component={UserDetailContent1} />
    </Stack.Navigator>
  )
}

// Tạo một component mới để chứa nội dung
function UserDetailContent1() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView invertStickyHeaders={true} stickyHeaderHiddenOnScroll={true}>
        <Column className="items-center justify-center pl-1.5 pr-1.5">
          {[...Array(20)].map((_, index) => (
            <React.Fragment key={index}>
              <Text className="mb-4 text-2xl font-bold">
                Home ${index}
              </Text>
              <TextLink href="/data/1">👈 Về trang chủ</TextLink>
            </React.Fragment>
          ))}
        </Column>
      </ScrollView>
    </SafeAreaView>
  )
}

function UserDetailContent2() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Column className="items-center justify-center pl-1.5 pr-1.5">
          {[...Array(20)].map((_, index) => (
            <React.Fragment key={index}>
              <TextLink href="/data/1">👈 Về trang chủ</TextLink>
              <Text className="mb-4 text-2xl font-bold">
                Home ${index}
              </Text>
              
            </React.Fragment>
          ))}
        </Column>
      </ScrollView>
    </SafeAreaView>
  )
}
