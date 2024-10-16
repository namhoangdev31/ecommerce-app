import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'app/design/image'
import { useRouter } from 'solito/router'
import React, { useEffect } from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import { Animated } from 'react-native'

const LessonCard = ({ icon, title, gradientColors, onPress, index }) => {
  const animatedValue = new Animated.Value(0)

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start()
  }, [])

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  })

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity: animatedValue }}>
      <TouchableOpacity
        className="my-2 overflow-hidden rounded-xl shadow-md"
        onPress={onPress}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          className="flex-row items-center p-4"
        >
          <View
            className="mr-4 rounded-full p-2"
            style={{ backgroundColor: gradientColors[1] }}
          >
            <Ionicons name={icon} size={24} color="white" />
          </View>
          <Text className="text-lg font-bold text-white">{title}</Text>
          <View className="ml-auto">
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )
}

export function MainContent() {
  const router = useRouter()

  const handlePress = (route) => {
    router.push(route)
  }

  return (
    <LinearGradient
      colors={['#3F76FF', '#9FBAFF', '#FFFFFF']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://placekitten.com/40/40' }}
              className="h-10 w-10 rounded-full"
            />
            <View className="ml-2">
              <Text className="font-bold text-white">Người dùng</Text>
              <Text className="text-white">0 XP</Text>
            </View>
          </View>
          <View className="flex-row">
            <TouchableOpacity onPress={() => console.log('Flame pressed')}>
              <View className="mr-4">
                <Ionicons name="flame" size={24} color="#FFD700" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Heart pressed')}>
              <Ionicons name="ios-heart-circle-outline" size={24} color="#FF69B4" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className="flex-1 px-4 pt-4">
          <LessonCard
            icon="ios-pencil"
            title="Viết"
            gradientColors={['#7CFC00', '#32CD32']}
            onPress={() => handlePress('/write-task')}
            index={0}
          />
          <LessonCard
            icon="ios-book"
            title="Đọc"
            gradientColors={['#9400D3', '#8A2BE2']}
            onPress={() => handlePress('/read-task')}
            index={1}
          />
          <LessonCard
            icon="ios-headset"
            title="Nghe"
            gradientColors={['#00BFFF', '#1E90FF']}
            onPress={() => handlePress('/listen-task')}
            index={2}
          />
          <LessonCard
            icon="ios-chatbubbles"
            title="Nói"
            gradientColors={['#FFA500', '#FF8C00']}
            onPress={() => {}}
            index={3}
          />
          <LessonCard
            icon="ios-school"
            title="Ngữ pháp"
            gradientColors={['#FF6347', '#DC143C']}
            onPress={() => {}}
            index={4}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}
