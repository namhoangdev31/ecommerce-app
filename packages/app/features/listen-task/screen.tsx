import React, { useState, useRef, useEffect } from 'react'
import {
  TouchableOpacity,
  ScrollView,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { ActivityIndicator, Animated } from 'react-native'
import { SafeAreaView } from 'app/design/total-design'
import { useNavigation } from '@react-navigation/native'
import Tts from 'react-native-tts'
import { useReadTaskStore } from 'app/utils/read-task/zustand'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function ListenTask() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const navigation = useNavigation()
  const animationValues = useRef(
    [...Array(18)].map(() => new Animated.Value(0)),
  ).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  const {
    passage,
    question,
    userAnswer,
    response,
    error,
    isLoading,
    setUserAnswer,
    getPassageAndQuestion,
    handleSubmit,
    handleRefresh,
  } = useReadTaskStore()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Listen Task',
      headerBackTitle: 'Back',
      headerRight: () => (
        <Ionicons
          name="ios-arrow-forward"
          size={20}
          color="#0051e3"
          onPress={handleRefresh}
        />
      ),
    })
  }, [navigation, handleRefresh])

  useEffect(() => {
    Tts.setDefaultLanguage('en-US')
    const startListener = () => setIsSpeaking(true)
    const finishListener = () => {
      setIsSpeaking(false)
      stopAnimation()
    }
    const cancelListener = () => {
      setIsSpeaking(false)
      stopAnimation()
    }
    
    Tts.addEventListener('tts-start', startListener)
    Tts.addEventListener('tts-finish', finishListener)
    Tts.addEventListener('tts-cancel', cancelListener)
    
    getPassageAndQuestion()

    // return () => {
    //   Tts.removeEventListener('tts-start', startListener)
    //   Tts.removeEventListener('tts-finish', finishListener)
    //   Tts.removeEventListener('tts-cancel', cancelListener)
    // }
  }, [getPassageAndQuestion])

  const startAnimation = () => {
    const animations = animationValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 500 + index * 100,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 500 + index * 100,
            useNativeDriver: true,
          }),
        ]),
      ),
    )
    animationRef.current = Animated.parallel(animations)
    animationRef.current.start()
  }

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop()
    }
    animationValues.forEach((value) => {
      value.setValue(0)
    })
  }

  const speak = async () => {
    const thingToSay = passage
    console.log(thingToSay)
    if (isSpeaking) {
      Tts.stop()
      setIsSpeaking(false)
      stopAnimation()
    } else {
      startAnimation()
      try {
        await Tts.speak(thingToSay)
      } catch (error) {
        console.error('Lỗi khi phát âm:', error)
        setIsSpeaking(false)
        stopAnimation()
      }
    }
  }

  const handleAnswerSelect = (answer: string) => {
    setUserAnswer(answer)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center p-4">
          <View className="mb-8 h-32 flex-row items-end justify-center">
            {animationValues.map((value, index) => (
              <Animated.View
                key={index}
                style={{
                  width: 10,
                  height: 100,
                  backgroundColor: '#0051e3',
                  marginHorizontal: 2,
                  borderRadius: 5,
                  transform: [
                    {
                      scaleY: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                  ],
                }}
              />
            ))}
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0051e3" />
          ) : (
            <>
              <TouchableOpacity
                onPress={speak}
                className="mb-4 rounded-full bg-blue-500 px-8 py-4"
              >
                <Text className="text-lg font-bold text-white">
                  {isSpeaking ? 'Dừng' : 'Nghe đoạn văn'}
                </Text>
              </TouchableOpacity>
              {!response && (
                <View className="w-full rounded-lg bg-white p-4 shadow-lg">
                  <Text className="mb-2 text-lg font-bold text-blue-900">Câu hỏi:</Text>
                  <Text className="mb-2 text-base font-semibold">
                    {question.question}
                  </Text>
                  {question.options.map((option, oIndex) => (
                    <TouchableOpacity
                      key={oIndex}
                      onPress={() =>
                        handleAnswerSelect(String.fromCharCode(65 + oIndex))
                      }
                      className="mb-2 flex-row items-center"
                    >
                      <View
                        className={`h-5 w-5 rounded-full border-2 ${
                          userAnswer === String.fromCharCode(65 + oIndex)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        } mr-2`}
                      />
                      <Text>
                        {String.fromCharCode(65 + oIndex)}. {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <TouchableOpacity
                onPress={response ? handleRefresh : handleSubmit}
                className="mt-4 rounded bg-blue-500 px-8 py-3"
              >
                <Text className="text-center font-bold text-white">
                  {response ? "Câu hỏi tiếp theo" : "Gửi câu trả lời"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {error && (
            <View className="mt-4 w-full rounded-lg bg-red-100 p-4 shadow-lg">
              <Text className="text-base font-semibold text-red-800">
                {error}
              </Text>
            </View>
          )}
          {response && (
            <View className="mt-4 w-full rounded-lg bg-white p-4 shadow-lg">
              <Text className="mb-2 text-lg font-bold text-blue-900">
                Kết quả và Giải thích:
              </Text>
              <Text className="text-base leading-relaxed text-gray-800">
                {response.split('##').map((part, partIndex) => (
                  <React.Fragment key={partIndex}>
                    {partIndex > 0 && (
                      <Text className="mt-2 text-lg font-bold">##</Text>
                    )}
                    {part.split('**').map((subPart, subIndex) => (
                      <Text
                        key={subIndex}
                        style={
                          subIndex % 2 === 1
                            ? { fontWeight: 'bold', color: 'blue' }
                            : {}
                        }
                      >
                        {subPart}
                      </Text>
                    ))}
                  </React.Fragment>
                ))}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
