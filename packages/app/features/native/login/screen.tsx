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
import { useLoginStore } from 'app/features/native/login/zustand'

const LoginScreen = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const {
    email,
    password,
    isPasswordVisible,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    validateEmail,
    validatePassword,
  } = useLoginStore()

  const animatedValue = React.useRef(new Animated.Value(0)).current

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

  const handleLogin = () => {
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    if (isEmailValid && isPasswordValid) {
      // Proceed with login
      console.log('Login successful')
    }
  }

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
                source={require('../../../../assets/doll.png')}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="mb-8 text-center text-3xl font-bold text-white">
                Chào mừng trở lại
              </Text>

              <View className="mb-4">
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={validateEmail}
                  className="rounded-xl bg-white/20 px-4 py-3 text-white"
                />
                {emailError ? (
                  <Text className="mt-1 text-red-500">{emailError}</Text>
                ) : null}
              </View>

              <View className="relative mb-6">
                <TextInput
                  placeholder="Mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  onBlur={validatePassword}
                  className="rounded-xl bg-white/20 px-4 py-3 text-white"
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                {passwordError ? (
                  <Text className="mt-1 text-red-500">{passwordError}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                className="mb-4 rounded-xl bg-white py-3"
                onPress={handleLogin}
              >
                <Text className="text-center text-base font-bold text-[#3b5998]">
                  ĐĂNG NHẬP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="mb-6">
                <Text className="text-center text-white underline">
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>

              <View className="mb-6 flex-row items-center justify-center">
                <View className="h-[1px] flex-1 bg-white/30" />
                <Text className="mx-3 text-white">HOẶC</Text>
                <View className="h-[1px] flex-1 bg-white/30" />
              </View>

              <TouchableOpacity className="mb-3 flex-row items-center justify-center rounded-xl border border-white py-3">
                <Ionicons
                  name="logo-facebook"
                  size={20}
                  color="white"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-center font-bold text-white">
                  Tiếp tục với Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-center rounded-xl border border-white py-3">
                <Ionicons
                  name="logo-apple"
                  size={20}
                  color="white"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-center font-bold text-white">
                  Tiếp tục với Apple
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mt-3 flex-row items-center justify-center rounded-xl border border-white py-3"
                onPress={() => router.push('/')}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="white"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-center font-bold text-white">
                  Tiếp tục với Ẩn danh
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-center text-base text-white">
                  Bạn chưa có tài khoản?{' '}
                  <Text className="font-bold">Đăng ký</Text>
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
