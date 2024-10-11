import { SafeAreaView } from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { TextLink } from 'solito/link'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function ReadTask() {
  const navigation = useNavigation()
  const navigatorBack = () => {
    navigation.goBack()
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Read Task',
      headerBackTitle: 'Back',
    })
  }, [navigation])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4 text-center font-bold">
          Your writing task content here
        </Text>
        <TextLink href="/user/a">👈 Go Home</TextLink>
      </View>
    </SafeAreaView>
  )
}
