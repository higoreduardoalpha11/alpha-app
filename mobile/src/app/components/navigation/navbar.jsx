import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../ui/buttons/button'

import { commonButton, grayBtn } from '../../../utils/global.style'

const Navbar = () => {
  const navigation = useNavigation()

  return (
    <View className="flex items-center flex-row gap-4">
      <Button onPress={() => navigation.navigate('chat')} icon="question-answer" className={`${commonButton} ${grayBtn}`} />
      <Button onPress={() => navigation.navigate('notifications')} icon="notifications" className={`${commonButton} ${grayBtn}`} />
      <Button onPress={() => navigation.navigate('profile')} icon="account-circle" className={`${commonButton} ${grayBtn}`} />
    </View>
  )
}

export default Navbar
