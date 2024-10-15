import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'react-native-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { create } from 'zustand'
import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'

interface RegisterState {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  isPasswordVisible: boolean
  isConfirmPasswordVisible: boolean
  fullNameError: string
  emailError: string
  passwordError: string
  confirmPasswordError: string
  setFullName: (fullName: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setConfirmPassword: (confirmPassword: string) => void
  togglePasswordVisibility: () => void
  toggleConfirmPasswordVisibility: () => void
  validateFullName: () => boolean
  validateEmail: () => boolean
  validatePassword: () => boolean
  validateConfirmPassword: () => boolean
}

const useRegisterStore = create<RegisterState>((set) => ({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isPasswordVisible: false,
  isConfirmPasswordVisible: false,
  fullNameError: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  setFullName: (fullName) => set({ fullName, fullNameError: '' }),
  setEmail: (email) => set({ email, emailError: '' }),
  setPassword: (password) => set({ password, passwordError: '' }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword, confirmPasswordError: '' }),
  togglePasswordVisibility: () =>
    set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
  toggleConfirmPasswordVisibility: () =>
    set((state) => ({
      isConfirmPasswordVisible: !state.isConfirmPasswordVisible,
    })),
  validateFullName: () => {
    let isValid = true
    set((state) => {
      if (!state.fullName.trim()) {
        isValid = false
        return { fullNameError: 'Họ và tên không được để trống' }
      }
      return { fullNameError: '' }
    })
    return isValid
  },
  validateEmail: () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true
    set((state) => {
      if (!state.email.trim()) {
        isValid = false
        return { emailError: 'Email không được để trống' }
      }
      if (!emailRegex.test(state.email)) {
        isValid = false
        return { emailError: 'Email không hợp lệ' }
      }
      return { emailError: '' }
    })
    return isValid
  },
  validatePassword: () => {
    let isValid = true
    set((state) => {
      if (!state.password) {
        isValid = false
        return { passwordError: 'Mật khẩu không được để trống' }
      }
      if (state.password.length < 6) {
        isValid = false
        return { passwordError: 'Mật khẩu phải có ít nhất 6 ký tự' }
      }
      return { passwordError: '' }
    })
    return isValid
  },
  validateConfirmPassword: () => {
    let isValid = true
    set((state) => {
      if (!state.confirmPassword) {
        isValid = false
        return { confirmPasswordError: 'Xác nhận mật khẩu không được để trống' }
      }
      if (state.confirmPassword !== state.password) {
        isValid = false
        return { confirmPasswordError: 'Mật khẩu xác nhận không khớp' }
      }
      return { confirmPasswordError: '' }
    })
    return isValid
  },
}))

const RegisterScreen = () => {
  const navigation = useNavigation()
  const router = useRouter()
  const {
    fullName,
    email,
    password,
    confirmPassword,
    isPasswordVisible,
    isConfirmPasswordVisible,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    setFullName,
    setEmail,
    setPassword,
    setConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateFullName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  } = useRegisterStore()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const translateYAnim = useRef(new Animated.Value(50)).current

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start()
  }, [navigation])

  const shakeAnimation = useRef(new Animated.Value(0)).current

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleRegister = () => {
    const isFullNameValid = validateFullName()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isConfirmPasswordValid = validateConfirmPassword()

    if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      // Proceed with registration
      console.log('Registration successful')
    } else {
      startShake()
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
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
            }}
          >
            <View className="items-center">
              <Animated.Image
                source={require('../../../../assets/doll.png')}
                style={{
                  width: 120,
                  height: 120,
                  transform: [
                    {
                      rotate: shakeAnimation.interpolate({
                        inputRange: [-10, 10],
                        outputRange: ['-10deg', '10deg'],
                      }),
                    },
                  ],
                }}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="mb-8 text-center text-3xl font-bold text-white">
                Tạo tài khoản mới
              </Text>

              <View className="mb-4">
                <TextInput
                  placeholder="Họ và tên"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={setFullName}
                  className="rounded-xl bg-white/20 px-4 py-3 text-white"
                />
                {fullNameError ? <Text className="mt-1 text-red-500">{fullNameError}</Text> : null}
              </View>

              <View className="mb-4">
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  className="rounded-xl bg-white/20 px-4 py-3 text-white"
                />
                {emailError ? <Text className="mt-1 text-red-500">{emailError}</Text> : null}
              </View>

              <View className="relative mb-4">
                <TextInput
                  placeholder="Mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
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
                {passwordError ? <Text className="mt-1 text-red-500">{passwordError}</Text> : null}
              </View>

              <View className="relative mb-6">
                <TextInput
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isConfirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  className="rounded-xl bg-white/20 px-4 py-3 text-white"
                />
                <TouchableOpacity
                  onPress={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                {confirmPasswordError ? <Text className="mt-1 text-red-500">{confirmPasswordError}</Text> : null}
              </View>

              <TouchableOpacity
                className="mb-4 rounded-xl bg-white py-3"
                onPress={handleRegister}
              >
                <Text className="text-center text-base font-bold text-[#3b5998]">
                  ĐĂNG KÝ
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
                  Đăng ký với Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-center rounded-xl border border-white py-3">
                <Ionicons
                  name="logo-google"
                  size={20}
                  color="white"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-center font-bold text-white">
                  Đăng ký với Google
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-center text-base text-white">
                  Đã có tài khoản? <Text className="font-bold">Đăng nhập</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen
