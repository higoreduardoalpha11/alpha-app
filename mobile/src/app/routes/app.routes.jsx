import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomDrawer from '../stacks/custom-drawer'
import Navbar from '../components/navigation/navbar'
import Button from '../components/ui/buttons/button'

import Home from '../screens/home'
import Profile from '../screens/profile'
import Plans from '../screens/plans'
import Instructions from '../screens/instructions'
import Help from '../screens/help'
import Notifications from '../screens/notifications'
import Chat from '../screens/chat'
import Analytics from '../screens/analytics'
import Search from '../screens/search'

import { commonButton, grayBtn } from '../../utils/global.style'

const { Navigator, Screen } = createDrawerNavigator()
const screenOptions = ({ navigation }) => ({
  headerTitle: '',
  headerStyle: { backgroundColor: '#181A20' },
  headerShadowVisible: false,
  headerLeft: () => <Button icon="menu" onPress={navigation.toggleDrawer} className={`${commonButton} ${grayBtn}`} />,
  headerRight: () => <Navbar />,
  sceneContainerStyle: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    margin: 0,
    backgroundColor: '#181A20',
  },
  drawerStyle: {
    padding: 0,
    margin: 0,
  },
})

const AppRoutes = () => {
  return (
    <Navigator
      initialRouteName="home"
      drawerContent={({ navigation }) => <CustomDrawer navigation={navigation} />}
      screenOptions={screenOptions}
    >
      <Screen name="home" component={Home} />
      <Screen name="profile" component={Profile} />
      <Screen name="plans" component={Plans} />
      <Screen name="instructions" component={Instructions} />
      <Screen name="help" component={Help} />
      <Screen name="notifications" component={Notifications} />
      <Screen name="chat" component={Chat} />
      <Screen name="analytics" component={Analytics} />
      <Screen name="search" component={Search} />
    </Navigator>
  )
}

export default AppRoutes
