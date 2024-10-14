import React, { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { create } from 'zustand'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient'
import { useRouter } from 'expo-router'

interface ProfileState {
    user: {
        name: string
        email: string
        currentIeltsScore: string
    } | null
    targetIeltsScore: string
    geminiKey: string
    showGeminiKey: boolean
    setUser: (user: ProfileState['user']) => void
    setTargetIeltsScore: (score: string) => void
    setGeminiKey: (key: string) => void
    toggleShowGeminiKey: () => void
}

const useProfileStore = create<ProfileState>((set) => ({
    user: null,
    targetIeltsScore: '',
    geminiKey: '',
    showGeminiKey: false,
    setUser: (user) => set({ user }),
    setTargetIeltsScore: (score) => set({ targetIeltsScore: score }),
    setGeminiKey: (key) => set({ geminiKey: key }),
    toggleShowGeminiKey: () =>
        set((state) => ({ showGeminiKey: !state.showGeminiKey })),
}))

export default function ProfileScreen() {
    const navigation = useNavigation()
    const router = useRouter()
    const {
        user,
        targetIeltsScore,
        geminiKey,
        showGeminiKey,
        setTargetIeltsScore,
        setGeminiKey,
        toggleShowGeminiKey,
    } = useProfileStore()

    const [isEditing, setIsEditing] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTitle: 'Hồ sơ',
            headerBackTitle: 'Quay lại',
            headerStyle: {
                backgroundColor: '#3F76FF',
            },
            headerTintColor: '#fff',
        })
    }, [navigation])

    const handleSaveProfile = () => {
        // Implement save logic here
        console.log('Đã lưu hồ sơ')
        setIsEditing(false)
    }

    if (!user) {
        return (
            <LinearGradient
                colors={['#3F76FF', '#9FBAFF', '#FFFFFF']}
                className="flex-1 justify-between"
            >
                <SafeAreaView className="flex-1">
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-2xl font-bold text-white mb-4">
                            Bạn chưa đăng nhập
                        </Text>
                        <Text className="text-base text-white mb-8">
                            Vui lòng đăng nhập để xem hồ sơ của bạn
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="bg-blue-500 m-4 p-4 rounded-full"
                        onPress={() => router.push('/login')}
                    >
                        <Text className="text-center text-white font-bold text-lg">
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={['#3F76FF', '#9FBAFF', '#FFFFFF']}
                className="flex-1"
            >
                <SafeAreaView className="flex-1">
                    <ScrollView className="flex-1">
                        <View className="px-4 py-4">
                            <View className="mb-4 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <View className="mr-3 h-16 w-16 rounded-full bg-gray-200">
                                        {/* Profile picture placeholder */}
                                    </View>
                                    <View>
                                        <Text className="text-lg font-bold text-white">{user.name}</Text>
                                        <Text className="text-sm text-gray-200">{user.email}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    className="rounded-md bg-blue-500 px-3 py-1.5"
                                    onPress={() => setIsEditing(true)}
                                >
                                    <Text className="text-sm font-semibold text-white">
                                        Chỉnh sửa
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View className="mb-4 flex-row justify-around">
                                <View className="items-center">
                                    <Text className="text-base font-bold text-white">
                                        {user.currentIeltsScore}
                                    </Text>
                                    <Text className="text-xs text-gray-200">IELTS hiện tại</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-base font-bold text-white">
                                        {targetIeltsScore || '-'}
                                    </Text>
                                    <Text className="text-xs text-gray-200">Mục tiêu IELTS</Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-base font-bold text-white">0</Text>
                                    <Text className="text-xs text-gray-200">Bài học</Text>
                                </View>
                            </View>

                            <View className="mb-4">
                                <Text className="mb-1 text-base font-semibold text-white">
                                    Mục tiêu điểm IELTS
                                </Text>
                                <TextInput
                                    className="rounded-md border border-white p-1.5 text-sm text-white"
                                    value={targetIeltsScore}
                                    onChangeText={setTargetIeltsScore}
                                    placeholder="Nhập mục tiêu điểm IELTS"
                                    placeholderTextColor="#9FBAFF"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View className="mb-4">
                                <Text className="mb-1 text-base font-semibold text-white">Khóa API Gemini</Text>
                                <View className="flex-row items-center">
                                    <TextInput
                                        className="flex-1 rounded-md border border-white p-1.5 text-sm text-white"
                                        value={geminiKey}
                                        onChangeText={setGeminiKey}
                                        placeholder="Nhập khóa API Gemini"
                                        placeholderTextColor="#9FBAFF"
                                        secureTextEntry={!showGeminiKey}
                                    />
                                    <TouchableOpacity onPress={toggleShowGeminiKey} className="ml-2">
                                        <Ionicons
                                            name={showGeminiKey ? 'eye-off' : 'eye'}
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {isEditing && (
                                <TouchableOpacity
                                    onPress={handleSaveProfile}
                                    className="rounded-md bg-blue-500 py-2"
                                >
                                    <Text className="text-center text-sm font-semibold text-white">
                                        Lưu hồ sơ
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}
