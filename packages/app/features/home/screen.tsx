import { Text } from 'app/design/typography'
import {
  Button,
  Column,
  Div,
  Row,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'app/design/total-design'
import { View } from 'app/design/view'
import { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SafeArea } from 'app/provider/safe-area'
import { useLink } from 'solito/link'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { useRouter } from 'solito/router'
import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { IconButton, MD3Colors } from 'react-native-paper';
import {
  createDrawerNavigator, DrawerContentScrollView
} from '@react-navigation/drawer';
import CheckBox from '@react-native-community/checkbox';
import { Linking } from "react-native";
import { useWindowDimensions } from 'react-native';
const Tab = createBottomTabNavigator()
import { DrawerActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export function HomeTab() {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          drawerStyle: {
            width: 240,
          },
          drawerPosition: 'right',
          drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
          drawerLabelStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <IconButton
              icon="filter"
              size={24}
              onPress={openDrawer}
            />
          ),
          drawerIcon: () => null,
          headerLeft: () => null,
        }}
      />
    </Drawer.Navigator>
  )
}

function CustomDrawerContent(props) {
  const [selectedDistricts, setSelectedDistricts] = useState(['Tây Hồ', 'Cầu Giấy']);
  const [filters, setFilters] = useState({
    hasPool: false,
    luxuryInterior: false,
    project: false,
  });

  const toggleDistrict = (district) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter(d => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <Text className='text-2xl font-bold my-2 ml-4'>Tìm kiếm</Text>

      <TextInput
        placeholder="Từ khoá"
        className='border border-gray-300 rounded p-2 my-2 mx-4'
      />

      <TextInput
        placeholder="Phân khúc"
        className='border border-gray-300 rounded p-2 my-2 mx-4'
      />

      <Text className='ml-4 mt-4 font-bold'>Quận/Huyện</Text>
      <View className='flex-row flex-wrap mx-4'>
        {selectedDistricts.map(district => (
          <TouchableOpacity
            key={district}
            className='bg-gray-200 rounded-full px-4 py-1 mr-2 mb-2'
            onPress={() => toggleDistrict(district)}
          >
            <Text>{district} X</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Diện tích"
        className='border border-gray-300 rounded p-2 my-2 mx-4'
      />

      <TextInput
        placeholder="Mặt tiền"
        className='border border-gray-300 rounded p-2 my-2 mx-4'
      />

      <TextInput
        placeholder="Số tầng"
        className='border border-gray-300 rounded p-2 my-2 mx-4'
      />

      <Text className='ml-4 mt-4 font-bold'>Tiêu chí bất động sản</Text>
      <View className='flex-row justify-between mx-4 my-4'>
        <TouchableOpacity className='bg-blue-500 py-2 px-4 rounded' onPress={() => { props.navigation.closeDrawer() }}>
          <Text className='text-white text-center'>Tìm kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity className='border border-blue-500 py-2 px-4 rounded'>
          <Text className='text-blue-500 text-center'>Xóa điều kiện</Text>
        </TouchableOpacity>
      </View>

      <Text className='ml-4 italic text-gray-500'>
        Lưu ý: Điều kiện tìm kiếm sẽ được lưu trong suốt phiên làm việc.
      </Text>
    </DrawerContentScrollView>
  );
}

function Home() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Column className="items-center justify-center pl-1.5 pr-1.5">
          {[...Array(10)].map((_, index) => (
            <Text key={index} className="mb-4 text-2xl font-bold">
              Home ${index}
            </Text>
          ))}
        </Column>
      </ScrollView>
    </SafeAreaView>
  )
}

function AboutTab() {
  const userLinkProps = useLink({
    href: '/user/nate',
  })
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Column className="items-center justify-center pl-1.5 pr-1.5">
          {[...Array(10)].map((_, index) => (
            <Text key={index} className="mb-4 text-2xl font-bold">
              Home ${index}
            </Text>
          ))}
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold">About</Text>
            <Button title="Press me" className="mt-4" {...userLinkProps} />
          </View>
        </Column>
      </ScrollView>
    </SafeAreaView>
  )
}

function ContactTab() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Contact</Text>
    </View>
  )
}

// function SettingsTab() {
//   return (
//     <View className="flex-1 items-center justify-center">
//       <Text className="text-2xl font-bold">Settings</Text>
//     </View>
//   )
// }

export function HomeScreen() {
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Entypo size={24} name="home" color={color} />,
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="About"
        options={{
          headerShown: false,
          title: 'About',
          tabBarIcon: ({ color }) => <Entypo size={24} name="info" color={color} />,
          headerTintColor: MD3Colors.neutral10,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
        component={AboutTab}
      />
      <Tab.Screen
        name="Contact"
        options={{ headerShown: false, tabBarIcon: ({ color }) => <Ionicons size={24} name="settings" color={color} /> }}
        component={ContactTab}
      />
    </Tab.Navigator>
  )
}