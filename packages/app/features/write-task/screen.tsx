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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

function InputScreen() {
  const {
    input,
    setInput,
    handleSubmit,
  } = useWriteTaskStore()

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <TextInput
          className="flex-1 text-sm"
          multiline={true}
          placeholder="Nhập câu trả lời của bạn ở đây..."
          value={input}
          onChangeText={(newText) => setInput(newText)}
          textAlignVertical="top"
        />
      </View>
      <View className="items-end border-gray-200 bg-gray-100 p-2">
        <TouchableOpacity 
          onPress={handleSubmit}
          className="rounded-md bg-blue-500 px-4 py-2"
        >
          <Text className="font-bold text-white items-center">Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function ContentScreen() {
  const {
    responses,
    errors,
    question,
    isLoading,
  } = useWriteTaskStore()

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0051e3" />
        <Text className="mt-4 text-sm">Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView className="gap-2 p-3">
      <View className="w-full bg-white p-4">
        <Text className="text-l mb-4 font-bold">
          AI Evaluation and Explanation:
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
                  <Text className="font-semibold text-red-700">Error:</Text>
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
  )
}

export default function WriteTask() {
  const navigation = useNavigation()
  const { getQuestion, handleRefresh } = useWriteTaskStore()

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

  return (
      <SafeAreaView className="flex-1">
        <Tab.Navigator>
          <Tab.Screen 
            name="Content" 
            component={ContentScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-document-text" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Input" 
            component={InputScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-create" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
  )
}
