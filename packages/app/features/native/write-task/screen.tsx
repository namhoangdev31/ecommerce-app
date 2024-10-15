import { SafeAreaView, ScrollView, TextInput } from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useWriteTaskStore } from 'app/features/native/write-task/zustand-store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableWithoutFeedback } from 'react-native'

const Tab = createBottomTabNavigator()

function InputScreen() {
  const { input, setInput, handleSubmit, suggestion } = useWriteTaskStore()
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window')
      setIsLandscape(width > height)
    }

    const subscription = Dimensions.addEventListener('change', updateOrientation)
    updateOrientation()

    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View className={`flex-1 bg-white ${isLandscape ? 'flex-row' : ''}`}>
          <View className={`${isLandscape ? 'w-1/2' : 'h-1/2'} flex-1 p-4`}>
            <TextInput
              className="flex-1 rounded-md border border-gray-300 p-2 text-sm h-full"
              multiline={true}
              style={{ minHeight: isLandscape ? '100%' : 350 }}
              placeholder="Vui lòng nhập câu trả lời của bạn tại đây..."
              value={input}
              onChangeText={(newText) => setInput(newText)}
              textAlignVertical="top"
            />
          </View>
          {suggestion && (
            <View className={`${isLandscape ? 'w-1/2 p-4' : 'm-1'} rounded-md bg-blue-50 p-2`}>
              <Text className="text-xs font-semibold text-blue-800">Gợi ý:</Text>
              <Text className="mt-0.5 text-xs text-blue-700">
                {suggestion.split('').map((char, index) => (
                  <Text key={index}>
                    {char === '*' ? '' : char}
                  </Text>
                ))}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

function ContentScreen() {
  const { responses, errors, question, isLoading } = useWriteTaskStore()

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0051e3" />
        <Text className="mt-4 text-sm">Đang tải...</Text>
      </View>
    )
  }

  return (
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
                        style={subIndex % 2 === 1 ? { fontWeight: 'bold' } : {}}
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
  )
}

export default function WriteTask() {
  const navigation = useNavigation()
  const { getQuestion, handleRefresh, handleSubmit } = useWriteTaskStore()
  const [currentScreen, setCurrentScreen] = useState('Content')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Write Task',
      headerBackTitle: 'Back',
      headerBackground: () => (
        <LinearGradient
          colors={['#0033CC', '#3366FF', '#6699FF', '#99CCFF', '#FFFFFF']}
          style={{ flex: 1 }}
        />
      ),
      headerTintColor: '#fff',
      headerRight: () => (
        <Ionicons
          name={currentScreen === 'Input' ? 'ios-send' : 'ios-refresh-circle-outline'}
          size={20}
          color="#FFFFFF"
          onPress={currentScreen === 'Input' ? handleSubmit : handleRefresh}
        />
      ),
    })
  }, [navigation, currentScreen])

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    // <SafeAreaView className="flex-1">
      <Tab.Navigator
        screenListeners={{
          state: (e) => {
            const currentRouteName = (e as any).data?.state?.routes?.[(e as any).data?.state?.index]?.name
            setCurrentScreen(currentRouteName || 'Content')
          },
        }}
      >
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
              <Ionicons name={currentScreen === 'Input' ? 'ios-send' : 'ios-create'} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    // </SafeAreaView>
  )
}
