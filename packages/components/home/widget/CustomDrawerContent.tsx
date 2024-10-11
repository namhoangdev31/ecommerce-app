import React, { useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Text } from 'app/design/typography'
import { TextInput, TouchableOpacity } from 'app/design/total-design'
import { View } from 'app/design/view'

export function CustomDrawerContent(props) {
  const [selectedDistricts, setSelectedDistricts] = useState([
    'Tây Hồ',
    'Cầu Giấy',
  ])
  const [filters, setFilters] = useState({
    hasPool: false,
    luxuryInterior: false,
    project: false,
  })

  const toggleDistrict = (district) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district))
    } else {
      setSelectedDistricts([...selectedDistricts, district])
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <Text className="my-2 ml-4 text-2xl font-bold">Tìm kiếm</Text>

      <TextInput
        placeholder="Từ khoá"
        className="mx-4 my-2 rounded border border-gray-300 p-2"
      />

      <TextInput
        placeholder="Phân khúc"
        className="mx-4 my-2 rounded border border-gray-300 p-2"
      />

      <Text className="ml-4 mt-4 font-bold">Quận/Huyện</Text>
      <View className="mx-4 flex-row flex-wrap">
        {selectedDistricts.map((district) => (
          <TouchableOpacity
            key={district}
            className="mb-2 mr-2 rounded-full bg-gray-200 px-4 py-1"
            onPress={() => toggleDistrict(district)}
          >
            <Text>{district} X</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Diện tích"
        className="mx-4 my-2 rounded border border-gray-300 p-2"
      />

      <TextInput
        placeholder="Mặt tiền"
        className="mx-4 my-2 rounded border border-gray-300 p-2"
      />

      <TextInput
        placeholder="Số tầng"
        className="mx-4 my-2 rounded border border-gray-300 p-2"
      />

      <Text className="ml-4 mt-4 font-bold">Tiêu chí bất động sản</Text>
      <View className="mx-4 my-4 flex-row justify-between">
        <View className="rounded bg-blue-500 px-4 py-2">
          <Text className="text-center text-white">Tìm kiếm</Text>
        </View>
        <View className="rounded border border-blue-500 px-4 py-2">
          <Text className="text-center text-blue-500">Xóa điều kiện</Text>
        </View>
      </View>

      <Text className="ml-4 italic text-gray-500">
        Lưu ý: Điều kiện tìm kiếm sẽ được lưu trong suốt phiên làm việc.
      </Text>
    </DrawerContentScrollView>
  )
}
