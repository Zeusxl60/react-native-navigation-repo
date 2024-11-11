import { Linking, View, Text, SafeAreaView, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const RootStack = createStackNavigator()

import { AuthComponent } from './navigation/auth-stack'
import { ContentComponent } from './navigation/content-stack'


export default function App() {
  const [isAuthenticated] = useState(true)

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ecf0f1' }}>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated
              ? <RootStack.Screen name='app' component={ContentComponent} />
              : <RootStack.Screen name='auth' component={AuthComponent} />
            }
          </RootStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const navigationLinkConfig = {
  screens: {
    'app': {
      initialRouteName: 'user-list',
      screens: {
        'user-list': {},
        'tab-navigator': {
          path: ':userId',
          parse: {
            userId: userId => Number(userId)
          },
          initialRouteName: 'home-tab',
          screens: {
            'settings-tab': {
              path: 'settings'
            },
            'home-tab': {
              initialRouteName: 'home-screen',
              path: 'home',
              },
            },
          }
        },
      },
    'auth': {
      path: 'auth',
      screens: {
        'login': {
          path: 'login'
        },
      }
    },
  },
}

const linking = {
  prefixes: ['prefix://'],
  config: navigationLinkConfig,
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL()

    if (url != null) {
      return url
    }
  },
  subscribe: listener => {
    const onReceiveURL = ({ url }) => listener(url)

    Linking.addEventListener('url', onReceiveURL)

    return () => Linking.removeEventListener?.('url', onReceiveURL)
  },
}
