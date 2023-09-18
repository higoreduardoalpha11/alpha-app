import { View } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'

import Button from '../ui/buttons/button'
import { commonButton, darkPurpleBtn, textDarkPurpleBtn } from '../../../utils/global.style'

const TabBar = () => {
  const navigation = useNavigation()
  const screenName = useNavigationState((state) => state.routes[state.index].name)

  return (
    <View className="flex flex-row justify-between items-center p-1 border border-gray-700">
      <Button onPress={() => navigation.navigate('home')} className={`${commonButton} ${screenName === 'home' && darkPurpleBtn} border border-gray-700 px-3`} text="Dispositivos" textClassName={`${ screenName === 'home' ? textDarkPurpleBtn : 'text-gray-400'}`} />
      <Button onPress={() => navigation.navigate('analytics')} className={`${commonButton} ${screenName === 'analytics' && darkPurpleBtn} border border-gray-700 px-3`} text="Estatísticas" textClassName={`${screenName === 'analytics' ? textDarkPurpleBtn : 'text-gray-400'}`} />
      <Button onPress={() => navigation.navigate('search')} className={`${commonButton} ${screenName === 'search' && darkPurpleBtn} border border-gray-700 px-3`} text="Conectar" textClassName={`${screenName === 'search' ? textDarkPurpleBtn : 'text-gray-400'}`} />
    </View>
  )
}

export default TabBar
