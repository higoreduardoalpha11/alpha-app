import { useCallback, useContext } from 'react'
import { useFocusEffect, useNavigationState } from '@react-navigation/native'
import { Text } from 'react-native'

import { AppContext } from '../../contexts/app-context'

const Plans = () => {
  const { setRoute } = useContext(AppContext)
  const screenName = useNavigationState((state) => state.routes[state.index].name)

  useFocusEffect(useCallback(() => { setRoute(screenName) }, [])) // eslint-disable-line react-hooks/exhaustive-deps

  return <Text className="text-red-200">Plans</Text>
}
export default Plans
