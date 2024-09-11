import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Button, Column } from "app/design/total-design";
import { Row } from "app/design/layout";
import { View } from "app/design/view";
import { ScrollView } from 'react-native';

export function HomeScreen() {
  return (
    <ScrollView className='py-10 h-full scroll-smooth md:scroll-auto' >
      <Column className='flex-1 justify-center items-center pl-20 pr-20 overflow-y-auto'>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <Text className='text-2xl font-bold'>Home</Text>
        <View className="gap-4">
          <Text>0</Text>
          <Text>1</Text>
          <Text>2</Text>
        </View>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
      </Column>
    </ScrollView>
  )
}
