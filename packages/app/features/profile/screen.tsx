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

interface ProfileState {
    user: {
        name: string
        email: string
        currentIeltsScore: string
    }
    targetIeltsScore: string
    geminiKey: string
    showGeminiKey: boolean
    setUser: (user: ProfileState['user']) => void
    setTargetIeltsScore: (score: string) => void
    setGeminiKey: (key: string) => void
    toggleShowGeminiKey: () => void
}

const useProfileStore = create<ProfileState>((set) => ({
    user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        currentIeltsScore: '6.5',
    },
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
            headerTitle: 'Profile',
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#0051e3',
        })
    }, [navigation])

    const handleSaveProfile = () => {
        // Implement save logic here
        console.log('Profile saved')
        setIsEditing(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 bg-white">
                <ScrollView className="flex-1">
                    <View className="px-4 py-4">
                        <View className="mb-4 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <View className="mr-3 h-16 w-16 rounded-full bg-gray-200">
                                    {/* Profile picture placeholder */}
                                </View>
                                <View>
                                    <Text className="text-lg font-bold">{user.name}</Text>
                                    <Text className="text-sm text-gray-600">{user.email}</Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                className="rounded-md bg-blue-500 px-3 py-1.5"
                                onPress={() => setIsEditing(true)}
                            >
                                <Text className="text-sm font-semibold text-white">
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="mb-4 flex-row justify-around">
                            <View className="items-center">
                                <Text className="text-base font-bold">
                                    {user.currentIeltsScore}
                                </Text>
                                <Text className="text-xs text-gray-600">Current IELTS</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-base font-bold">
                                    {targetIeltsScore || '-'}
                                </Text>
                                <Text className="text-xs text-gray-600">Target IELTS</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-base font-bold">0</Text>
                                <Text className="text-xs text-gray-600">Lessons</Text>
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="mb-1 text-base font-semibold">
                                Target IELTS Score
                            </Text>
                            <TextInput
                                className="rounded-md border border-gray-300 p-1.5 text-sm"
                                value={targetIeltsScore}
                                onChangeText={setTargetIeltsScore}
                                placeholder="Enter target IELTS score"
                                keyboardType="numeric"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="mb-1 text-base font-semibold">Gemini API Key</Text>
                            <View className="flex-row items-center">
                                <TextInput
                                    className="flex-1 rounded-md border border-gray-300 p-1.5 text-sm"
                                    value={geminiKey}
                                    onChangeText={setGeminiKey}
                                    placeholder="Enter Gemini API Key"
                                    secureTextEntry={!showGeminiKey}
                                />
                                <TouchableOpacity onPress={toggleShowGeminiKey} className="ml-2">
                                    <Ionicons
                                        name={showGeminiKey ? 'eye-off' : 'eye'}
                                        size={20}
                                        color="#0051e3"
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
                                    Save Profile
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
