import { createStackNavigator } from '@react-navigation/stack'
import { Pressable, Text } from 'react-native'

import { TabNavigatorComponent } from './tab-navigator'

const ContentStack = createStackNavigator()
export const ContentComponent = () => {
  return (
    <ContentStack.Navigator initialRouteName='user-list' screenOptions={{ orientation: 'portrait', backBehavior: 'history' }}>
      <ContentStack.Screen name='user-list' component={UserListComponent} />
      <ContentStack.Screen name='tab-navigator' component={TabNavigatorComponent} />
    </ContentStack.Navigator>
  )
}

const UserListComponent = ({ navigation }) => {
  return (
    <Pressable style={{flex: 1}} onPress={() => {
      navigation.navigate('tab-navigator', {
        userId: 1,
        screen: 'home-tab',
      })
    } }>
      <Text style={{ fontSize: 35, textAlign: 'center' }}>Click to go Home {'->'}</Text>
    </Pressable>
  )
}
