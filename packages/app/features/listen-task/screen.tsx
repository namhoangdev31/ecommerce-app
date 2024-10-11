import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'app/design/total-design'
import { useNavigation } from '@react-navigation/native'

export default function ListenTask() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [customText, setCustomText] = useState('')
  const navigation = useNavigation()
  const animationValues = useRef(
    [...Array(8)].map(() => new Animated.Value(0)),
  ).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Nghe và Phát Âm Nâng Cao',
      headerBackTitle: 'Quay lại',
    })
  }, [navigation])

  const startAnimation = () => {
    const animations = animationValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 500 + index * 100,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 500 + index * 100,
            useNativeDriver: true,
          }),
        ]),
      ),
    )
    animationRef.current = Animated.parallel(animations)
    animationRef.current.start()
  }

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop()
    }
    animationValues.forEach((value) => {
      value.setValue(0)
    })
  }

  const speak = async () => {
    const thingToSay =
      customText ||
      'Xin chào, đây là một ví dụ về chức năng đọc văn bản.'

    if (isSpeaking) {
      setIsSpeaking(false)
      stopAnimation()
    } else {
      setIsSpeaking(true)
      startAnimation()
      try {
        // Thực hiện chức năng phát âm ở đây (không sử dụng expo-speech)
        console.log('Đang phát âm:', thingToSay)
        // Giả lập thời gian phát âm
        setTimeout(() => {
          setIsSpeaking(false)
          stopAnimation()
        }, 3000)
      } catch (error) {
        console.error('Lỗi khi phát âm:', error)
        setIsSpeaking(false)
        stopAnimation()
      }
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center p-4">
          <View className="mb-8 h-32 flex-row items-end justify-center">
            {animationValues.map((value, index) => (
              <Animated.View
                key={index}
                style={{
                  width: 10,
                  height: 100,
                  backgroundColor: '#0051e3',
                  marginHorizontal: 2,
                  borderRadius: 5,
                  transform: [
                    {
                      scaleY: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                  ],
                }}
              />
            ))}
          </View>
          <TextInput
            className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2"
            placeholder="Nhập văn bản tùy chỉnh ở đây"
            value={customText}
            onChangeText={setCustomText}
            multiline
          />
          <TouchableOpacity
            onPress={speak}
            className="mt-8 rounded-full bg-blue-500 px-8 py-4"
          >
            <Text className="text-lg font-bold text-white">
              {isSpeaking ? 'Dừng' : 'Phát lại'}
            </Text>
          </TouchableOpacity>
          <Text className="mt-4 text-center text-gray-600">
            Nhấn nút để nghe văn bản được đọc bằng tiếng Việt. Bạn có thể tùy
            chỉnh văn bản.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
