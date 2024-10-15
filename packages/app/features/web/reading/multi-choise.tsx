import { create } from 'zustand'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useMultiChoiceStore } from './zustand'



export default function MultiChoiceReadingScreen() {
  const {
    passage,
    questions,
    userAnswers,
    response,
    error,
    isLoading,
    savedAnswers,
    getPassageAndQuestions,
    handleAnswerSelect,
    handleSaveAnswers,
    handleSubmit,
    handleRefresh,
  } = useMultiChoiceStore()

  useEffect(() => {
    getPassageAndQuestions()
  }, [])

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="flex w-full flex-col items-center  h-screen p-4">
        <View className="w-full rounded-t bg-gray-800 p-4">
          <Text className="text-center text-xl font-bold text-white">
            Bài tập IELTS Reading - Trắc nghiệm
          </Text>
        </View>
        <View className="mt-3 w-full rounded-lg bg-gray-800 p-6 shadow-lg">
          <Text className="mb-4 text-xl font-bold text-blue-300">
            Đoạn văn:
          </Text>
          <Text className="mb-6 rounded-xl bg-gray-700 p-4 text-base leading-relaxed text-gray-300 shadow-md">
            {passage}
          </Text>
        </View>
        <View className="mt-3 w-full rounded-lg bg-gray-800 p-6 shadow-lg">
          <Text className="mb-4 text-xl font-bold text-blue-300">Câu hỏi:</Text>
          {questions.map((q, qIndex) => (
            <View key={qIndex} className="mb-6">
              <Text className="mb-2 text-lg font-semibold text-white">
                {qIndex + 1}. {q.question}
              </Text>
              {q.options.map((option, oIndex) => (
                <View key={oIndex} className="mb-2 flex-row items-center">
                  <input
                    type="checkbox"
                    value={String.fromCharCode(65 + oIndex)}
                    checked={userAnswers[qIndex] === String.fromCharCode(65 + oIndex)}
                    onChange={() => handleAnswerSelect(qIndex, String.fromCharCode(65 + oIndex))}
                    className="form-checkbox h-5 w-5 text-blue-500 bg-gray-700 border-gray-600"
                  />
                  <Text className="ml-2 text-gray-300">
                    {String.fromCharCode(65 + oIndex)}. {option}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        {savedAnswers.length > 0 && (
          <View className="mt-3 w-full rounded-lg bg-gray-800 p-6 shadow-lg">
            <Text className="mb-4 text-xl font-bold text-blue-300">
              Đáp án đã lưu:
            </Text>
            {savedAnswers.map((answer, index) => (
              <View key={index} className="mb-2 flex-row">
                <Text className="font-semibold text-white">Câu {index + 1}: </Text>
                <Text className="text-gray-300">{answer}</Text>
              </View>
            ))}
          </View>
        )}
        <View className="mt-3 flex w-full flex-row justify-between">
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#4299e1" />
              <Text className="mt-2 text-blue-300">Đang xử lý...</Text>
            </View>
          ) : (
            <>
              <button
                onClick={handleSaveAnswers}
                className="mr-2 flex-1 rounded bg-yellow-600 px-3 py-1 text-sm font-bold text-white hover:bg-yellow-700"
              >
                Lưu đáp án
              </button>
              <button
                onClick={handleSubmit}
                className="mr-2 flex-1 rounded bg-blue-600 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
              >
                Gửi câu trả lời
              </button>
              <button
                onClick={handleRefresh}
                className="ml-2 flex-1 rounded bg-green-600 px-3 py-1 text-sm font-bold text-white hover:bg-green-700"
              >
                Làm mới câu hỏi
              </button>
            </>
          )}
        </View>
        {response && (
          <View className="mt-6 w-full rounded-lg bg-gray-800 p-6 shadow-lg">
            <Text className="mb-4 text-xl font-bold text-blue-300">
              Đánh giá và Giải thích của AI:
            </Text>
            <Text className="text-base leading-relaxed text-gray-300">
              {response.split('##').map((part, partIndex) => (
                <React.Fragment key={partIndex}>
                  {partIndex > 0 && (
                    <Text className="mt-3 text-xl font-bold text-blue-300">##</Text>
                  )}
                  {part.split('**').map((subPart, subIndex) => (
                    <Text
                      key={subIndex}
                      style={subIndex % 2 === 1 ? { fontWeight: 'bold', color: '#63b3ed' } : {}}
                    >
                      {subPart}
                    </Text>
                  ))}
                </React.Fragment>
              ))}
            </Text>
          </View>
        )}
        {error && (
          <View className="mt-6 w-full rounded-lg bg-red-900 p-6 shadow-lg">
            <Text className="text-base font-semibold text-red-300">
              {error}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
