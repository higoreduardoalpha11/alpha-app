import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/login'
import RecoveryPassword from '../screens/recovery-password'

const { Navigator, Screen } = createStackNavigator()
const screenOptions = { headerShown: false }

const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="login" screenOptions={screenOptions}>
      <Screen name="login" component={Login} />
      <Screen name="recovery" component={RecoveryPassword} />
    </Navigator>
  )
}
export default AuthRoutes
