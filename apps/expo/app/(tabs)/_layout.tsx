import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{ headerShown: false, title: 'Home ABR' }}
      />
      <Tabs.Screen name="About" options={{ headerShown: false }} />
      <Tabs.Screen name="Contact" options={{ headerShown: false }} />
    </Tabs>
  )
}

export default TabsLayout
