import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useReadTaskStore } from 'app/utils/read-task/zustand'
import { Ionicons } from '@expo/vector-icons'

export default function ReadTask() {
  const navigation = useNavigation()
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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Read Task',
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
    getPassageAndQuestion()
  }, [navigation, getPassageAndQuestion])

  const handleAnswerSelect = (answer: string) => {
    setUserAnswer(answer)
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex w-full flex-col items-center p-4">
        <View className="mb-4 w-full rounded-lg bg-white p-4 shadow-lg">
          <Text className="mb-2 text-lg font-bold text-blue-900">
            Passage:
          </Text>
          <Text className="text-base leading-relaxed">{passage}</Text>
        </View>
        {!response ? (
          <View className="mb-4 w-full rounded-lg bg-white p-4 shadow-lg">
            <Text className="mb-2 text-lg font-bold text-blue-900">Question:</Text>
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
        ) : (
          <View className="mb-4 w-full rounded-lg bg-white p-4 shadow-lg">
            <Text className="mb-2 text-lg font-bold text-blue-900">
              Evaluation and Explanation:
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
        <View className="mb-4 w-full flex-row justify-between">
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#0000ff" />
              <Text className="mt-2 text-blue-500">Loading...</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={response ? handleRefresh : handleSubmit}
                className="mr-2 flex-1 rounded bg-blue-500 p-3"
              >
                <Text className="text-center font-bold text-white">
                  {response ? "Next Question" : "Submit Answer"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {error && (
          <View className="w-full rounded-lg bg-red-100 p-4 shadow-lg">
            <Text className="text-base font-semibold text-red-800">
              {error}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
