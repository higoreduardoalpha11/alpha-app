import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerActions } from '@react-navigation/native'
import { View, Image } from 'react-native'

import { AppContext } from '../../contexts/app-context'
import Button from '../components/ui/buttons/button'
import { commonButton, darkGreenBtn } from '../../utils/global.style'

const COMMON_SCREEN = `flex flex-row items-center pl-[20px] space-x-[20px] border-l-4 rounded-l-sm border-transparent`
const ACTIVE_SCREEN = `border-brand-lightpurple`
const COMMON_TEXT = `font-semibold text-gray-600 text-base ml-[20px]`
const ACTIVE_TEXT = `text-brand-lightpurple`

const CustomDrawer = (props) => {
  const { route } = useContext(AppContext)
  
  return (
    <SafeAreaView className="bg-brand-gray-900 px-6 pb-4 pt-6 h-full">
      <Button icon="menu-open" sizeIcon={20} className={`w-[45px] ${commonButton} ${darkGreenBtn}`} onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} />

      <View className="flex flex-col gap-6 py-4 mt-[20px]">
        {menuItems.map((item, i) => (
          <Button
            key={i}
            onPress={() => props.navigation.navigate(item.url)}
            icon={item.icon} sizeIcon={item.sizeIcon} colorIcon={item.colorIcon || (route == item.url ? '#BDC3FF' : '#4B5563')}
            text={item.text} textClassName={item.textClassName || (`${COMMON_TEXT} ${route == item.url && ACTIVE_TEXT}`)}
            className={item.className || (`${COMMON_SCREEN} ${route === item.url && ACTIVE_SCREEN}`)} />
        ))}
      </View>

      <Image source={require('../../assets/robot.png')} resizeMode='cover' className='mt-auto mx-auto' />
    </SafeAreaView>
  )
}

const menuItems = [
  {
    url: 'home',
    icon: 'dashboard-customize',
    sizeIcon: 20,
    text: 'Dispositivos',
  },
  {
    url: 'profile',
    icon: 'account-circle',
    sizeIcon: 20,
    text: 'Perfil',
  },
  {
    url: 'plans',
    icon: 'shopping-bag',
    sizeIcon: 20,
    text: 'Planos',
  },
  {
    url: 'instructions',
    icon: 'menu-book',
    sizeIcon: 20,
    text: 'Instruções',
  },
  {
    url: 'help',
    icon: 'support-agent',
    sizeIcon: 20,
    text: 'Ajuda',
  },
  {
    url: 'auth',
    icon: 'logout',
    sizeIcon: 20,
    text: 'Sair',
    colorIcon: '#EF4444',
    className: `${COMMON_SCREEN}`,
    textClassName: `${COMMON_TEXT} text-red-500`
  }
]

export default CustomDrawer
