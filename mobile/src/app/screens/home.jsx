import { useCallback, useContext } from 'react'
import { useFocusEffect, useNavigationState, useNavigation } from '@react-navigation/native'
import { ScrollView, View, Text } from 'react-native'

import { AppContext } from '../../contexts/app-context'
import TabBar from '../components/navigation/tab-bar'
import Button from '../components/ui/buttons/button'
import { commonButton, darkGreenBtn, textDarkGreenBtn } from '../../utils/global.style'
import SwitchCard from '../components/ui/cards/switch-card'

const Home = () => {
  const navigation = useNavigation()
  const { setRoute, founded } = useContext(AppContext)
  const screenName = useNavigationState((state) => state.routes[state.index].name)

  useFocusEffect(useCallback(() => { setRoute(screenName) }, [])) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View>
      <TabBar />
      {!founded?.length > 0 ? (
        <View className="flex-grow flex flex-col space-y-[20px] items-center justify-center h-full pb-40">
          <Text className="text-gray-300">
            Nenhum dispositivo conectado. Clique no botão abaixo para pesquisar os
            aparelhos conectados na sua rede!
          </Text>
          <Button onPress={() => navigation.navigate('search')} className={`${commonButton} ${darkGreenBtn} px-12`} textClassName={`${textDarkGreenBtn} font-semibold`} text="Procurar" />
        </View>
      ) : (
        <View className="flex-grow flex flex-col space-y-[20px] mt-[30px] items-center justify-center h-full pb-40">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            <Text>{JSON.stringify(founded, null, 2)}</Text>
            {founded.map((item, i) => (
              <SwitchCard key={i} {...item} />
            ))}
            {/* <SterilizerStandart name="Esterilizador Standart Sala" /> */}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
export default Home
