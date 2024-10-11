import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'solito/link'
import React from 'react'

export function MainContent() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row flex-wrap items-center justify-between bg-[#EAF2F5] py-1">
        <Text className="font-regular px-4 text-xs">Có 123 kết quả</Text>
        <TouchableOpacity
          className="flex-row bg-transparent p-2"
          onPress={() => {}}
        >
          <Text className="font-regular px-2 text-xs">Option 1</Text>
          <Ionicons size={14} name="ios-chevron-down" />
        </TouchableOpacity>
      </View>
      <ScrollView className="bg-[#EAF2F5]">
        <Link href="/write-task">
          <View className="m-4 items-center rounded-lg bg-[#FFF] p-3">
            <Text className="font-regular px-2 text-xs">Writing Task</Text>
          </View>
        </Link>
        <Link href="/read-task">
          <View className="m-4 items-center rounded-lg bg-[#FFF] p-3">
            <Text className="font-regular px-2 text-xs">Reading Task</Text>
          </View>
        </Link>
      </ScrollView>
    </SafeAreaView>
  )
}
