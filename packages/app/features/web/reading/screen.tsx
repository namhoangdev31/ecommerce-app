import { View } from "app/design/view";
import { Text, TextLink } from "app/design/typography";
import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useReadingStore } from "./zustand";

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default function ReadingScreen() {
    const {
        passage,
        missingWords,
        userInputs,
        response,
        error,
        isLoading,
        translations,
        handleInputChange,
        getPassageAndMissingWords,
        handleSubmit,
        handleRefresh,
        validateInputs,
        translateWords,
    } = useReadingStore();

    const [inputErrors, setInputErrors] = React.useState<boolean[]>([]);

    useEffect(() => {
        getPassageAndMissingWords();
    }, []);

    useEffect(() => {
        if (missingWords.length > 0) {
            translateWords(missingWords);
        }
    }, [missingWords]);

    const handleLocalSubmit = () => {
        const newInputErrors = userInputs.map(input => input.trim() === "");
        setInputErrors(newInputErrors);
        if (validateInputs()) {
            handleSubmit();
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-900">
            <View className="flex flex-col items-center w-full  h-screen p-4">
                <View className="w-full p-4 bg-gray-800 rounded-t">
                    <Text className="text-xl text-center font-bold text-white">Bài tập IELTS Reading - Điền từ vào chỗ trống</Text>
                </View>
                <View className="w-full p-6 bg-gray-800 shadow-lg rounded-lg mt-3">
                    <Text className="text-xl font-bold mb-4 text-blue-300">Đoạn văn:</Text>
                    {passage && (
                        <Text className="text-base mb-6 p-4 bg-gray-700 rounded-xl shadow-md leading-relaxed text-gray-300">
                            {passage.split(/(\[___\])/).map((part, index) =>
                                part === "[___]" ? (
                                    <React.Fragment key={index}>
                                        <input
                                            type="text"
                                            className={`border-b border-solid ${inputErrors[Math.floor(index / 2)] ? 'border-red-500' : 'border-gray-500'} min-w-[60px] text-sm p-0.5 mx-0.5 text-blue-300 font-bold outline-none bg-transparent`}
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, Math.floor(index / 2));
                                                const newInputErrors = [...inputErrors];
                                                newInputErrors[Math.floor(index / 2)] = e.target.value.trim() === "";
                                                setInputErrors(newInputErrors);
                                            }}
                                            value={userInputs[Math.floor(index / 2)]}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <Text key={index}>{part}</Text>
                                )
                            )}
                        </Text>
                    )}
                </View>
                <View className="w-full p-6 bg-gray-800 shadow-lg rounded-lg mt-3">
                    <Text className="text-xl font-bold mb-4 text-blue-300">Từ cần điền (Words to fill in):</Text>
                    <View className="flex flex-row flex-wrap">
                        {translations.map((word, index) => (
                            <Text key={index} className="text-xs text-gray-400 mr-2 mb-2">
                                {word.replace(/\*\*|##/g, '') || 'Loading...'}
                            </Text>
                        ))}
                    </View>
                </View>
                <View className="flex flex-row justify-between w-full mt-3">
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#4299e1" />
                            <Text className="mt-2 text-blue-300">Đang xử lý...</Text>
                        </View>
                    ) : (
                        <>
                            <button onClick={handleLocalSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded flex-1 mr-2 text-sm">
                                Gửi câu trả lời
                            </button>
                            <button onClick={handleRefresh} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded flex-1 ml-2 text-sm">
                                Làm mới câu hỏi
                            </button>
                        </>
                    )}
                </View>
                {response && (
                    <View className="w-full p-6 bg-gray-800 mt-6 shadow-lg rounded-lg">
                        <Text className="text-xl font-bold mb-4 text-blue-300">Đánh giá và Giải thích của AI:</Text>
                        <Text className="text-base text-gray-300 leading-relaxed">
                            {response.split('##').map((part, partIndex) => (
                                <React.Fragment key={partIndex}>
                                    {partIndex > 0 && <Text className="font-bold text-xl mt-3 text-blue-300">##</Text>}
                                    {part.split('**').map((subPart, subIndex) => (
                                        <Text key={subIndex} className={subIndex % 2 === 1 ? 'font-bold text-blue-300' : ''}>
                                            {subPart}
                                        </Text>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Text>
                    </View>
                )}
                {error && (
                    <View className="w-full p-6 bg-red-900 mt-6 shadow-lg rounded-lg">
                        <Text className="text-base text-red-300 font-semibold">{error}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
