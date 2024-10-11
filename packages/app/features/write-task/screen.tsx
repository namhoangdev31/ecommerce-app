import {
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { TextLink } from 'solito/link'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'

export default function WriteTask() {
  const navigation = useNavigation()
  const navigatorBack = () => {
    navigation.goBack()
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Write Task',
      headerBackTitle: 'Back',
    })
  }, [navigation])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      enabled={true}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="p-3">
          <Text className="text-start font-normal">
            Your writing task content here
          </Text>
        </ScrollView>
        <View className="mb-[4px] flex-row items-center gap-4 p-2 align-bottom">
          <TextInput
            className="m-0 w-5/6 rounded-lg bg-[#d4d4d4] p-2"
            onSubmitEditing={Keyboard.dismiss}
            multiline
            placeholder="Enter your task"
            editable
            underlineColorAndroid="transparent"
            numberOfLines={5}
          />
          <Ionicons
            name="ios-send"
            size={20}
            color="#0051e3"
            onPress={() => {}}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
