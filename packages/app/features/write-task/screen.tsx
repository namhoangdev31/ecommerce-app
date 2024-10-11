import {
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useWriteTaskStore } from 'app/utils/write-task/zustand-store'

export default function WriteTask() {
  const navigation = useNavigation()
  const {
    input,
    setInput,
    responses,
    errors,
    question,
    isLoading,
    getQuestion,
    handleSubmit,
    handleRefresh
  } = useWriteTaskStore()

  const navigatorBack = () => {
    navigation.goBack()
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Write Task',
      headerBackTitle: 'Back',
      headerRight: () => (
        <Ionicons
          name="ios-refresh-circle-outline"
          size={20}
          color="#0051e3"
          onPress={handleRefresh}
        />
      ),
    })
  }, [navigation])

  useEffect(() => {
    getQuestion()
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0051e3" />
        <Text className="mt-4 text-sm">Đang tải...</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      enabled={true}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="gap-2 p-3">
          <View className="w-full bg-white p-4">
            <Text className="text-l mb-4 font-bold">
              Đánh giá và Giải thích của AI:
            </Text>
            <View className="space-y-4">
              {responses.map((response, index) => (
                <View
                  key={index}
                  className="mb-1 rounded-lg border border-gray-200 bg-white p-1"
                >
                  <Text className="text-sm leading-relaxed text-gray-800">
                    {response.split('##').map((part, partIndex) => (
                      <React.Fragment key={partIndex}>
                        {partIndex > 0 && <Text className="font-bold">##</Text>}
                        {part.split('**').map((subPart, subIndex) => (
                          <Text
                            key={subIndex}
                            style={
                              subIndex % 2 === 1 ? { fontWeight: 'bold' } : {}
                            }
                          >
                            {subPart}
                          </Text>
                        ))}
                      </React.Fragment>
                    ))}
                  </Text>
                  {errors[index] && (
                    <View className="mt-4 border-l-4 border-red-500 bg-red-100 p-4">
                      <Text className="font-semibold text-red-700">Lỗi:</Text>
                      <Text className="mt-1 text-red-600">{errors[index]}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
          {question && (
            <Text className="mb-4 rounded-lg bg-blue-100 p-4 text-sm font-bold shadow-md">
              {question.split('##').map((part, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Text className="font-bold">##</Text>}
                  {part.split('**').map((subPart, subIndex) => (
                    <Text
                      key={subIndex}
                      style={subIndex % 2 === 1 ? { fontWeight: '400' } : {}}
                    >
                      {subPart}
                    </Text>
                  ))}
                </React.Fragment>
              ))}
            </Text>
          )}
        </ScrollView>
        <View className="mb-[4px] flex-row items-center gap-4 p-2 align-bottom">
          <TextInput
            className="m-0 max-h-32 w-5/6 rounded-lg bg-[#d4d4d4] p-2"
            onSubmitEditing={Keyboard.dismiss}
            multiline={true}
            placeholder="Enter your task"
            editable
            value={input}
            onChangeText={(newText) => setInput(newText)}
            underlineColorAndroid="transparent"
            numberOfLines={5}
            scrollEnabled={true}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Ionicons name="ios-send" size={20} color="#0051e3" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
