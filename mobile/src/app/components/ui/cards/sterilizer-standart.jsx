import { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import dgram from 'react-native-udp'

import { AppContext } from '../../../../contexts/app-context'
import { actions } from '../../../../@types/model.type'
import { blackBtn, commonButton, darkPurpleBtn, textBlackBtn, textDarkPurpleBtn } from '../../../../utils/global.style'
import { boolToString, stringToBool } from '../../../../utils/transform'
import Button from '../buttons/button'
import ToogleButton from '../buttons/toogle'
import ControlButton from '../buttons/control'
import AnalyticsFrame from '../frames/analytics'

const SterilizerStandart = ({ name, options, active, components, analytics }) => {
  const { founded, setFounded, target, setTarget } = useContext(AppContext)
  const socket = dgram.createSocket('udp4')
  
  socket.bind(options.port)
  socket.on('message', function (msg, info) {
    let buffer = msg.toString()
    console.log(buffer)
    const curFounded = { ...founded[0], components: { ...founded[0]?.components, [target]: buffer } }
    setFounded([curFounded])
  })
  
  function sendPacket(action, target, value, component) {
    socket.send(`|${action}|${target}|${value}|${component}|`, undefined, undefined, options.port, options.host, function (err) {
        if (err) console.log(err)
        setTarget(component)
      },
    )
  }
  
  return (
    <View className="bg-brand-darkwhite px-[10px] py-[20px] w-full">
      <View className="flex items-center justify-between flex-row mb-[40px]">
        <Text className="text-xl text-white font-semibold">{name}</Text>
        <ToogleButton onPress={() => sendPacket(actions.COMMAND, 15, !active)} active={active} rotate />
      </View>

      <Text className="text-sm text-white font-semibold mb-[30px]">Controles</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, marginBottom: 30 }}
        horizontal
      >
        <ControlButton onPress={() => sendPacket(actions.COMMAND, 16, boolToString(!stringToBool(components?.lights)), 'lights')} component="Lâmpadas" icon="lightbulb-outline" active={stringToBool(components?.lights)} />
        <ControlButton onPress={() => sendPacket(actions.COMMAND, 17, boolToString(!stringToBool(components?.fan)), 'fan')} component="Ventilador" icon="shutter-speed" active={stringToBool(components?.fan)} />
        <ControlButton onPress={() => sendPacket(actions.COMMAND, 18, boolToString(!stringToBool(components?.fins)), 'fins')} component="Paletas" icon="leak-add" active={stringToBool(components?.fins)} />
        <ControlButton onPress={() => sendPacket(actions.COMMAND, 19, boolToString(!stringToBool(components?.humidifier)), 'humidifier')} component="Umidificador" icon="device-thermostat" active={stringToBool(components?.humidifier)} />
      </ScrollView>

      <View className="flex items-center justify-between flex-row mb-[30px]">
        <Text className="text-sm text-white font-semibold">Coleta de dados</Text>
        <Button onPress={() => sendPacket(actions.READ)} className={`${commonButton}`} icon="rotate-left" sizeIcon={20} colorIcon="#F9FAFB" />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        horizontal
      >
        <AnalyticsFrame icon="alarm" value={`${analytics?.hours}h`} />
        <AnalyticsFrame icon="device-thermostat" value={`${analytics?.thermostat}°C`} />
        <AnalyticsFrame icon="invert-colors" value={`${analytics?.humidity}%`} />
        <AnalyticsFrame icon="warning" value={`${analytics?.co2}% Co2`} />
        <AnalyticsFrame icon="error" value={`${analytics.nh3}% NH3`} />
      </ScrollView>

      <View className="mt-[30px] flex space-y-[10px]">
        <Button className={`${commonButton} ${darkPurpleBtn}`} text="Estatísticas" textClassName={textDarkPurpleBtn} />
        <Button className={`${commonButton} ${blackBtn}`} text="Configurações" textClassName={textBlackBtn} />
      </View>
    </View>
  )
}

export default SterilizerStandart
