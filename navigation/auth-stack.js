import { createStackNavigator } from '@react-navigation/stack'

const LoginComponent = () => {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 35, textAlign: 'center' }}>Login</Text>
    </View>
  )
}

const AuthStack = createStackNavigator()
export const AuthComponent = () => {
  return (
    <AuthStack.Navigator initialRouteName='login' screenOptions={{ orientation: 'portrait', backBehavior: 'history' }}>
      <AuthStack.Screen name='login' component={LoginComponent} />
    </AuthStack.Navigator>
  )
}
