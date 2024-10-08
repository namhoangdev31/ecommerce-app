import { GoogleGenerativeAI } from "@google/generative-ai";
import { View } from "app/design/view";
import { Text } from "app/design/typography";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";

export default function MultiChoiceReadingScreen() {
    const [passage, setPassage] = useState<string>("");
    const [questions, setQuestions] = useState<Array<{ question: string; options: string[] }>>([]);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [savedAnswers, setSavedAnswers] = useState<string[]>([]);

    const genAI = new GoogleGenerativeAI("AIzaSyA9LA03RXl-StAKbt7_gT4zD0yHExzuMN4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const getPassageAndQuestions = async () => {
        try {
            setIsLoading(true);
            const result = await model.generateContent("Tạo một đoạn văn ngắn IELTS Reading khoảng 250 từ và 5 câu hỏi trắc nghiệm về đoạn văn đó. Mỗi câu hỏi có 4 lựa chọn. Hãy định dạng kết quả như sau: [PASSAGE] Nội dung đoạn văn [/PASSAGE] [QUESTIONS] 1. Câu hỏi 1? A. Lựa chọn A B. Lựa chọn B C. Lựa chọn C D. Lựa chọn D 2. Câu hỏi 2? A. ... [/QUESTIONS]");
            const response = await result.response;
            const text = response.text();
            
            const passageMatch = text.match(/\[PASSAGE\]([\s\S]*?)\[\/PASSAGE\]/);
            const questionsMatch = text.match(/\[QUESTIONS\]([\s\S]*?)\[\/QUESTIONS\]/);
            if (passageMatch && questionsMatch) {
                const passageText = passageMatch[1]?.trim() ?? "";
                const questionsText = questionsMatch[1]?.trim() ?? "";
                
                setPassage(passageText);
                const questionsList = questionsText.split(/\d+\./).filter(q => q.trim() !== "");
                const formattedQuestions = questionsList.map(q => {
                    const [question, ...options] = q.split(/[A-D]\./).map(item => item.trim());
                    return { question: question || "", options };
                });
                
                setQuestions(formattedQuestions);
                setUserAnswers(new Array(formattedQuestions.length).fill(""));
                setSavedAnswers(new Array(formattedQuestions.length).fill(""));
            } else {
                throw new Error("Định dạng phản hồi không hợp lệ");
            }
        } catch (error) {
            console.error("Không thể tạo đoạn văn và câu hỏi:", error);
            setError("Đã xảy ra lỗi khi tạo bài tập. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPassageAndQuestions();
    }, []);

    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = answer;
        setUserAnswers(newAnswers);
    };

    const handleSaveAnswers = () => {
        setSavedAnswers([...userAnswers]);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const answersString = savedAnswers.map((answer, index) => `Câu ${index + 1}: ${answer}`).join("\n");
            const result = await model.generateContent(`Đánh giá câu trả lời sau cho bài đọc IELTS:\n\nĐoạn văn: ${passage}\n\nCâu trả lời của thí sinh:\n${answersString}\n\nVui lòng đánh giá, chỉ ra đáp án đúng, giải thích và đưa ra lời khuyên để cải thiện.`);
            const response = await result.response;
            setResponse(response.text());
        } catch (error) {
            console.error("Lỗi khi đánh giá câu trả lời:", error);
            setError("Đã xảy ra lỗi khi đánh giá câu trả lời. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = () => {
        setPassage("");
        setQuestions([]);
        setUserAnswers([]);
        setSavedAnswers([]);
        setResponse("");
        setError("");
        getPassageAndQuestions();
    };

    return (
        <ScrollView className="flex-1 bg-gray-100">
            <View className="flex flex-col items-center w-full">
                <View className="w-full p-4 bg-gray-200 rounded-t">
                    <Text className="text-xl text-center font-bold">Bài tập IELTS Reading - Trắc nghiệm</Text>
                </View>
                <View className="w-full p-6 bg-white shadow-lg rounded-lg mt-3">
                    <Text className="text-xl font-bold mb-4 text-blue-900">Đoạn văn:</Text>
                    <Text className="text-base mb-6 p-4 bg-blue-50 rounded-xl shadow-md leading-relaxed">
                        {passage}
                    </Text>
                </View>
                <View className="w-full p-6 bg-white shadow-lg rounded-lg mt-3">
                    <Text className="text-xl font-bold mb-4 text-blue-900">Câu hỏi:</Text>
                    {questions.map((q, qIndex) => (
                        <View key={qIndex} className="mb-6">
                            <Text className="text-lg font-semibold mb-2">{qIndex + 1}. {q.question}</Text>
                            {q.options.map((option, oIndex) => (
                                <TouchableOpacity
                                    key={oIndex}
                                    onPress={() => handleAnswerSelect(qIndex, String.fromCharCode(65 + oIndex))}
                                    className={`p-2 mb-2 rounded-lg ${userAnswers[qIndex] === String.fromCharCode(65 + oIndex) ? 'bg-blue-200' : 'bg-gray-100'}`}
                                >
                                    <Text>{String.fromCharCode(65 + oIndex)}. {option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
                {savedAnswers.length > 0 && (
                    <View className="w-full p-6 bg-white shadow-lg rounded-lg mt-3">
                        <Text className="text-xl font-bold mb-4 text-blue-900">Đáp án đã lưu:</Text>
                        {savedAnswers.map((answer, index) => (
                            <View key={index} className="mb-2 flex-row">
                                <Text className="font-semibold">Câu {index + 1}: </Text>
                                <Text>{answer}</Text>
                            </View>
                        ))}
                    </View>
                )}
                <View className="flex flex-row justify-between w-full mt-3 p-6">
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text className="mt-2 text-blue-500">Đang xử lý...</Text>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity onPress={handleSaveAnswers} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex-1 mr-2">
                                <Text className="text-center text-white">Lưu đáp án</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 mr-2">
                                <Text className="text-center text-white">Gửi câu trả lời</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleRefresh} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex-1 ml-2">
                                <Text className="text-center text-white">Làm mới câu hỏi</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                {response && (
                    <View className="w-full p-6 bg-white mt-6 shadow-lg rounded-lg">
                        <Text className="text-xl font-bold mb-4 text-blue-900">Đánh giá và Giải thích của AI:</Text>
                        <Text className="text-base text-gray-800 leading-relaxed">
                            {response.split('##').map((part, partIndex) => (
                                <React.Fragment key={partIndex}>
                                    {partIndex > 0 && <Text className="font-bold text-xl mt-3">##</Text>}
                                    {part.split('**').map((subPart, subIndex) => (
                                        <Text key={subIndex} style={subIndex % 2 === 1 ? { fontWeight: 'bold', color: 'blue' } : {}}>
                                            {subPart}
                                        </Text>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Text>
                    </View>
                )}
                {error && (
                    <View className="w-full p-6 bg-red-100 mt-6 shadow-lg rounded-lg">
                        <Text className="text-base text-red-800 font-semibold">{error}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
