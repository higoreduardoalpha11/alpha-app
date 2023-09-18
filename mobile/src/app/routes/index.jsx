import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const screenOptions = {
  headerShown: false,
  sceneContainerStyle: {
    padding: 0,
    margin: 0,
  },
}

const Routes = () => {
  return (
    <NavigationContainer screenOptions={screenOptions}>
      <Navigator screenOptions={screenOptions} >
        <Screen name="auth" component={AuthRoutes} />
        <Screen name="app" component={AppRoutes} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes
