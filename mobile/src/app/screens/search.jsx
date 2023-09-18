import { useContext, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import dgram from 'react-native-udp'

import { AppContext } from '../../contexts/app-context'
import TabBar from '../components/navigation/tab-bar'
import Button from '../components/ui/buttons/button'
import QrButton from '../components/ui/buttons/qr-button'
import Input from '../components/ui/inputs/input'
import Checkbox from '../components/ui/inputs/checkbox'
import Loading from '../components/ui/loading'
import {
  commonButton,
  darkGreenBtn,
  primaryBtn,
  textDarkGreenBtn,
  textPrimaryBtn,
  textWhiteBtn,
  whiteBtn,
} from '../../utils/global.style'

const Search = () => {
  const { founded, setFounded } = useContext(AppContext)
  const [search, setSearch] = useState(false)
  const [connected, setConnected] = useState(false)
  const [identity, setIdentity] = useState(false)
  const [selected, setSelected] = useState('')

  const socket = dgram.createSocket('udp4')

  // const title = connected ? 'Conectando...' : search ? 'Procurando...' : identity ? 'Identificação' : 'Conecte seus dispositivos'
  // const description = connected ? `Aguarde enquanto estamos conectando com o aparelho: ${selected.name}`
  //   : search ? 'Aguarde enquanto estamos procurando pelos dispositivos em sua sua rede!'
  //     : identity ? 'Personalize seu dispositivo com a identificação que mais lhe agradar, ou ignore'
  //       : 'Clique no botão abaixo para pesquisar os aparelhos conectados na sua rede!'
  // const action = (search || connected) ? 'Cancelar' : identity ? 'Alterar nome' : 'Procurar'

  const title = 'Conecte seus dispositivos'
  const description = 'Informe o endereço IP e a porta UDP do dispositivo'
  const action = 'Conectar'

  const connectSearch = () => {
    const options = {
      port: 1234,
      host: '192.168.198.91',
      localAddress: '127.0.0.1',
      reuseAddress: true,
    }
    socket.bind(options.port)
    socket.once('listening', function() {
      socket.send('|connect|', undefined, undefined, options.port, options.host, function (err) {
        if (err) console.log(err)
        console.log('message sent')
      })
    })
  }
  socket.on('message', function(msg, info) {
    const buffer = msg.toString()
    console.log(buffer)
  })

  return (
    <View>
      <TabBar />
      <View className="flex flex-col space-y-[10px] items-center justify-center mt-[20px]">
        <Text className="text-gray-50 font-semibold text-base">{title}</Text>
        <Text className="text-gray-300 text-sm mb-[10px]">{description}</Text>

        <View className="flex flex-row space-x-4 items-center">
          <Button
            onPress={() => {
              setSearch(!search)
              setConnected(false)
              setSelected('')
            }}
            className={`${commonButton} ${(search || connected) ? primaryBtn : darkGreenBtn} px-12 mb-[20px]`}
            textClassName={`${(search || connected) ? textPrimaryBtn : textDarkGreenBtn} font-semibold`}
            text={action}
          />
          {
            ((selected && !connected) || identity) && (
              <Button
                onPress={() => {
                  setConnected(true)
                  setSearch(!search)
                  if (!identity) setIdentity(true)
                }}
                className={`${commonButton} ${whiteBtn} px-12 mb-[20px]`}
                textClassName={`${textWhiteBtn} font-semibold`}
                text={`${identity ? "Ignorar" : "Conectar"}`}
              />
            )
          }
        </View>

        <View className="my-1">
          <Input icon="network-wifi-1-bar" label="Endereço IP" placeholder="IP" value={""} />
        </View>
        <View className="my-1">
          <Input icon="network-check" label="Porta UDP" placeholder="UDP" value={""} />
        </View>
        {founded?.length > 0 && !connected && !search && !identity &&
          <ScrollView
            className="w-full flex flex-col space-y-2 h-[250px]"
            showsVerticalScrollIndicator={false}
          >
            {founded.map((item, i) => (
              <Checkbox key={i} label={item.name} onPress={() => setSelected(item)} checked={item === selected} />
            ))}
          </ScrollView>
        }
        {
          !search && !identity &&
          <View className="flex items-center flex-col mb-3">
            <Text className="text-base font-semibold text-gray-50">ou scaneie o QR Code</Text>
            <Text className="text-xs text-gray-400 mb-3">na caixa, manual ou dispositivo</Text>
            <QrButton />
          </View>
        }
        {
          identity && <Input icon="cast-connected" id="identity" label="Identificação" placeholder="Insira a identificação" />
        }
        {(search || connected) && <Loading size={170} />}
      </View>
    </View>
  )
}
export default Search
