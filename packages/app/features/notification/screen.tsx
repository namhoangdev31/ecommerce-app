import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { LinearGradient } from 'react-native-linear-gradient'

interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bài học mới có sẵn',
    message: 'Hãy xem bài học nghe hiểu mới của chúng tôi!',
    date: '2023-06-01',
    read: false,
  },
  {
    id: '2',
    title: 'Nhắc nhở luyện tập',
    message: "Đừng quên luyện tập kỹ năng nói của bạn hôm nay!",
    date: '2023-05-31',
    read: true,
  },
  // Thêm các thông báo giả khác nếu cần
]

export default function NotificationScreen() {
  const navigation = useNavigation()
  const [notifications, setNotifications] = useState(mockNotifications)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: 'Thông báo',
      headerBackTitle: 'Quay lại',
      headerStyle: {
        backgroundColor: '#3F76FF',
      },
      headerTintColor: '#fff',
    })
  }, [navigation])

  const deleteNotification = (id: string) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.filter(
        (notification) => notification.id !== id,
      )
      if (updatedNotifications.length === prevNotifications.length) {
        console.warn(`Không tìm thấy thông báo với id ${id}`)
      }
      return updatedNotifications
    })
  }

  const renderNotification = (notification: Notification) => {
    const translateX = useSharedValue(0)

    const onGestureEvent = useAnimatedGestureHandler({
      onStart: (_, context: { x: number }) => {
        context.x = translateX.value
      },
      onActive: (event, context: { x: number }) => {
        translateX.value = event.translationX + context.x
      },
      onEnd: () => {
        if (translateX.value < -100) {
          translateX.value = withTiming(-1000, { duration: 300 })
          // runOnJS(deleteNotification)(notification.id)
        } else {
          translateX.value = withSpring(0)
        }
      },
    })

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }))

    return (
      <PanGestureHandler key={notification.id} onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            className={`mb-4 rounded-lg p-4 shadow-md ${
              notification.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-bold text-blue-900">
                {notification.title}
              </Text>
              {!notification.read && (
                <View className="h-3 w-3 rounded-full bg-blue-500" />
              )}
            </View>
            <Text className="mt-2 text-xs text-gray-700">
              {notification.message}
            </Text>
            <Text className="mt-2 text-xs text-gray-500">
              {notification.date}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    )
  }

  return (
    <LinearGradient
      colors={['#3F76FF', '#9FBAFF', '#FFFFFF']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 p-4">
          {notifications.length > 0 ? (
            notifications.map(renderNotification)
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons
                name="notifications-off-outline"
                size={64}
                color="#9CA3AF"
              />
              <Text className="mt-4 text-xl font-semibold text-gray-500">
                Không có thông báo
              </Text>
              <Text className="mt-2 text-center text-gray-400">
                Bạn đã cập nhật tất cả! Hãy quay lại sau để xem các thông báo mới.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}
