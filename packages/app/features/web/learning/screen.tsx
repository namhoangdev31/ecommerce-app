import React, { useEffect } from "react";
import { useWriteTaskStore } from '../../native/write-task/zustand-store';
import {
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineArrowsAlt,
  AiOutlineShareAlt,
  AiOutlineRight,
  AiOutlineMessage,
  AiOutlinePlayCircle,
  AiOutlineClose,
  AiOutlineSend
} from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';

export default function LearningScreen() {
    const {
        input,
        responses,
        errors,
        question,
        suggestion,
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
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 h-screen p-2">
            <header className="w-full p-2 bg-gray-800 shadow-md">
                <h1 className="text-xl font-bold text-center text-white">IELTS Writing Task - Band 8.0</h1>
            </header>
            <main className="flex-1 w-full overflow-auto">
                <div className="w-full p-8">
                    <h2 className="text-lg py-1 font-bold mb-3 text-white">Đánh giá và Giải thích của AI:</h2>
                    {responses.map((response, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-xl mb-4 border border-gray-700">
                            <p className="text-sm text-gray-200 leading-relaxed">
                                {response.split('##').map((part, partIndex) => (
                                    <React.Fragment key={partIndex}>
                                        {partIndex > 0 && <span className="font-bold">##</span>}
                                        {part.split('**').map((subPart, subIndex) => (
                                            <span key={subIndex} className={subIndex % 2 === 1 ? 'font-bold' : ''}>
                                                {subPart}
                                            </span>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </p>
                            {errors[index] && (
                                <div className="mt-3 bg-red-900 border-l-4 border-red-500 p-2 rounded-r-lg">
                                    <p className="text-red-300 font-semibold text-xs">Error:</p>
                                    <p className="text-red-200 mt-1 text-xs">{errors[index]}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            <footer className="w-full p-4 bg-gray-800 shadow-lg">
                <h2 className="text-lg font-bold mb-3 text-white">IELTS Writing Task Question:</h2>
                {question && (
                    <p className="text-sm font-medium mb-3 p-3 bg-blue-900 rounded-lg shadow-md text-blue-200">
                        {question.split('##').map((part, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <span className="font-bold">##</span>}
                                {part.split('**').map((subPart, subIndex) => (
                                    <span key={subIndex} className={subIndex % 2 === 1 ? 'font-bold' : ''}>
                                        {subPart}
                                    </span>
                                ))}
                            </React.Fragment>
                        ))}
                    </p>
                )}
                {suggestion && (
                    <div className="mb-3">
                        <h3 className="text-sm font-bold text-white mb-1">Suggestion:</h3>
                        <p className="text-sm text-gray-300 p-2 bg-gray-700 rounded-lg">{suggestion}</p>
                    </div>
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
                    <div className="flex flex-row justify-between w-full mt-3">
                        {isLoading ? (
                            <div className="flex-1 items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-2 text-blue-300 font-medium text-xs text-center">Processing...</p>
                            </div>
                        ) : (
                            <div className="flex flex-row justify-between w-full">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-[49%] transition duration-300 ease-in-out transform hover:scale-105 text-sm flex items-center justify-center"
                                >
                                    <AiOutlineSend className="w-5 h-5 mr-2" />
                                    Submit Answer
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-[49%] transition duration-300 ease-in-out transform hover:scale-105 text-sm flex items-center justify-center"
                                >
                                    <AiOutlineArrowsAlt className="w-5 h-5 mr-2" />
                                    Refresh Question
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </footer>
        </div>
    );
}