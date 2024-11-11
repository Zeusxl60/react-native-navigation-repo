import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Linking, Pressable, Text, View } from 'react-native'
import { useEffect, useState } from 'react'

const TabNavigator = createBottomTabNavigator()
export const TabNavigatorComponent = () => {
  const [counterState, setCounterState] = useState(0)
  
  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count++
      console.log(count)
      setCounterState(count)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <TabNavigator.Navigator
      backBehavior='history'
      initialRouteName='home-tab'
      screenOptions={({ route }) => ({
        lazy: true,
        headerTitle: () => <Text>Counter: {counterState}</Text>,
        tabBarLabel: ({ color, focused }) => {
          let label = ''
          switch (route.name) {
            case 'settings-tab':
              label = 'Settings'
              break
            case 'home-tab':
              label = 'Home'
              break
          }

          return <Text 
            style={{
              color,
              fontSize: 11,
              fontWeight: focused ? 600 : 400,
              marginBottom: 3,
              marginLeft: 0,
            }}
          >{label}</Text>
        },
      })
    }>
      <TabNavigator.Screen name='settings-tab' component={SettingsComponent} />
      <TabNavigator.Screen name='home-tab' component={HomeComponent} />
    </TabNavigator.Navigator>
  )
}

const SettingsComponent = () => {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 35, textAlign: 'center' }}>Settings</Text>

      <Pressable style={{ backgroundColor: '#67a1f6', borderRadius: 4, paddingHorizontal: 5 }} onPress={() => Linking.openURL('prefix://1/home')}>
        <Text style={{ marginTop: 5, textAlign: 'center' }}>Click Here to Deep Link to Home</Text>
      </Pressable>
    </View>
  )
}

const HomeComponent = () => {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 35, textAlign: 'center' }}>Home</Text>

      <Pressable style={{ backgroundColor: '#67a1f6', borderRadius: 4, paddingHorizontal: 5 }} onPress={() => Linking.openURL('prefix://1/settings')}>
        <Text style={{ marginTop: 5, textAlign: 'center' }}>Click Here to Deep Link to Settings</Text>
      </Pressable>
    </View>
  )
}
