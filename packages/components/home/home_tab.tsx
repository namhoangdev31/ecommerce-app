import {useWindowDimensions} from "react-native";
import {useNavigation} from "expo-router";
import {DrawerActions} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import {Text} from "app/design/typography";
import {Column, SafeAreaView, ScrollView, TextInput, TouchableOpacity} from "app/design/total-design";
import {View} from "app/design/view";

const Drawer = createDrawerNavigator();

export function MainTab() {
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
                name="Main"
                component={MainContent}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    drawerStyle: {
                        width: 240,
                    },
                    headerRight: () => (
                        <Ionicons name="ios-search" size={24} onPress={openDrawer} style={{
                            padding: 10
                        }}/>
                    ),
                    drawerPosition: 'right',
                    drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
                    drawerLabelStyle: {
                        fontWeight: 'bold',
                    },
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

function MainContent() {
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <Column className="items-center justify-center pl-1.5 pr-1.5 py-4">
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