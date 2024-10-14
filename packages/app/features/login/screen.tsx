import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'react-native-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { create } from 'zustand'
import { useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
interface LoginState {
  email: string
  password: string
  isPasswordVisible: boolean
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  togglePasswordVisibility: () => void
}

const useLoginStore = create<LoginState>((set) => ({
  email: '',
  password: '',
  isPasswordVisible: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  togglePasswordVisibility: () => set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
}))

const LoginScreen = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const { email, password, isPasswordVisible, setEmail, setPassword, togglePasswordVisibility } = useLoginStore()

  const animatedValue = new Animated.Value(0)

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  React.useEffect(() => {
    startAnimation()
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1">
          <Animated.View 
            className="flex-1 justify-between px-6 py-8"
            style={{ transform: [{ translateY }], opacity: animatedValue }}
          >
            <View className="items-center">
              <Image
                source={require('../../../../apps/expo/assets/images/doll.png')}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="text-3xl font-bold mb-8 text-white text-center">Chào mừng trở lại</Text>

              <View className="mb-4">
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  className="bg-white/20 rounded-xl py-3 px-4 text-white"
                />
              </View>

              <View className="mb-6 relative">
                <TextInput
                  placeholder="Mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  className="bg-white/20 rounded-xl py-3 px-4 text-white"
                />
                <TouchableOpacity 
                  onPress={togglePasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off" : "eye"} 
                    size={20} 
                    color="white" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="mb-4 rounded-xl bg-white py-3">
                <Text className="text-center font-bold text-[#3b5998] text-base">ĐĂNG NHẬP</Text>
              </TouchableOpacity>

              <TouchableOpacity className="mb-6">
                <Text className="text-center text-white underline">Quên mật khẩu?</Text>
              </TouchableOpacity>

              <View className="flex-row justify-center items-center mb-6">
                <View className="flex-1 h-[1px] bg-white/30" />
                <Text className="mx-3 text-white">HOẶC</Text>
                <View className="flex-1 h-[1px] bg-white/30" />
              </View>

              <TouchableOpacity className="mb-3 rounded-xl border border-white py-3 flex-row justify-center items-center">
                <Ionicons name="logo-facebook" size={20} color="white" style={{ marginRight: 6 }} />
                <Text className="text-center font-bold text-white">Tiếp tục với Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity className="rounded-xl border border-white py-3 flex-row justify-center items-center">
                <Ionicons name="logo-apple" size={20} color="white" style={{ marginRight: 6 }} />
                <Text className="text-center font-bold text-white">Tiếp tục với Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity className="mt-3 rounded-xl border border-white py-3 flex-row justify-center items-center" onPress={() => router.push('/')}>
                <Ionicons name="person-outline" size={20} color="white" style={{ marginRight: 6 }} />
                <Text className="text-center font-bold text-white">Tiếp tục với Ẩn danh</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-center text-white text-base">
                  Bạn chưa có tài khoản? <Text className="font-bold">Đăng ký</Text>
                </Text>
              </TouchableOpacity>
         
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen
