import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AppContext = createContext({})

export function AppProvider({ children }) {
  const [route, setRoute] = useState('')
  const [target, setTarget] = useState('')
  const [founded, setFounded] = useState([
    {
      _id: 'abvs1hsgj1989fjk',
      sku: 'ALPSTERSTAN4T23V1',
      model: 'sterilizer-standart-4T23-V1',
      name: 'Esterilizador Sala',
      options: {
        port: 1234,
        host: '192.168.237.148',
        localAddress: '0.0.0.0',
        reuseAddress: true,
      },
      active: '0',
      components: {
        lights: '1',
        fan: '1',
        fins: '1',
        humidifier: '1',
      },
      analytics: {
        hours: '10:30',
        thermostat: 21.5,
        humidity: 50.80,
        co2: 58.90,
        nh3: 42.80,
      }
    }
  ])

  const localStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    localStorage('founded', JSON.stringify(founded))
  }, [founded])

  return (
    <AppContext.Provider value={{
      route, setRoute,
      founded, setFounded,
      target, setTarget,
    }}>
      {children}
    </AppContext.Provider>
  )
}
