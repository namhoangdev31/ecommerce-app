import { View } from "app/design/view";
import { Text } from "app/design/typography";
import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { ScrollView, ActivityIndicator } from "react-native";
import { useWriteTaskStore } from '../../native/write-task/zustand-store';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default function LearningScreen() {
    const {
        input,
        responses,
        errors,
        question,
        isLoading,
        setInput,
        setResponses,
        setErrors,
        setQuestion,
        setIsLoading,
        getQuestion,
        handleSubmit,
        handleRefresh
    } = useWriteTaskStore();

    useEffect(() => {
        getQuestion();
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit();
    };

    return (
        <View className="flex flex-col items-center w-full min-h-screen bg-gray-900">
            <View className="w-full p-2 bg-gray-800 shadow-md">
                <Text className="text-xl font-bold text-center text-white">IELTS Writing Task - Band 8.0</Text>
            </View>
            <View className="flex-1 w-full">
                <ScrollView className="w-full px-2 py-4">
                    <Text className="text-lg py-1 font-bold mb-3 text-white">AI Evaluation and Explanation:</Text>
                    {responses.map((response, index) => (
                        <View key={index} className="bg-gray-800 p-4 rounded-lg shadow-xl mb-4 border border-gray-700">
                            <Text className="text-sm text-gray-200 leading-relaxed">
                                {response.split('##').map((part, partIndex) => (
                                    <React.Fragment key={partIndex}>
                                        {partIndex > 0 && <Text className="font-bold">##</Text>}
                                        {part.split('**').map((subPart, subIndex) => (
                                            <Text key={subIndex} style={subIndex % 2 === 1 ? { fontWeight: 'bold' } : {}}>
                                                {subPart}
                                            </Text>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </Text>
                            {errors[index] && (
                                <View className="mt-3 bg-red-900 border-l-4 border-red-500 p-2 rounded-r-lg">
                                    <Text className="text-red-300 font-semibold text-xs">Error:</Text>
                                    <Text className="text-red-200 mt-1 text-xs">{errors[index]}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View className="w-full p-4 bg-gray-800 shadow-lg">
                <Text className="text-lg font-bold mb-3 text-white">IELTS Writing Task Question:</Text>
                {question && (
                    <Text className="text-sm font-medium mb-3 p-3 bg-blue-900 rounded-lg shadow-md text-blue-200">
                        {question.split('##').map((part, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <Text className="font-bold">##</Text>}
                                {part.split('**').map((subPart, subIndex) => (
                                    <Text key={subIndex} style={subIndex % 2 === 1 ? { fontWeight: 'bold' } : {}}>
                                        {subPart}
                                    </Text>
                                ))}
                            </React.Fragment>
                        ))}
                    </Text>
                )}
                <form onSubmit={onSubmit} className="space-y-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your answer here..."
                        className="w-full p-4 border rounded-lg bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        disabled={isLoading}
                        style={{ minHeight: 150, maxHeight: 300 }}
                    />
                    <View className="flex flex-row justify-between w-full mt-3">
                        {isLoading ? (
                            <View className="flex-1 items-center justify-center">
                                <ActivityIndicator size="large" color="#60A5FA" />
                                <Text className="mt-2 text-blue-300 font-medium text-xs">Processing...</Text>
                            </View>
                        ) : (
                            <View className="flex flex-row justify-between w-full">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-[49%] transition duration-300 ease-in-out transform hover:scale-120 text-sm"
                                >
                                    Submit Answer
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-[49%] transition duration-300 ease-in-out transform hover:scale-120 text-sm"
                                >
                                    Refresh Question
                                </button>
                            </View>
                        )}
                    </View>
                </form>
            </View>
        </View>
    );
}