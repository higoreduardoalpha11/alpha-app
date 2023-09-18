import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, ImageBackground, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormLogin from '../components/forms/login'

const Login = () => {
  const navigation = useNavigation()
  const [isLogin, setLogin] = useState(true)

  const title = isLogin ? 'Login' : 'Cadastro'
  const description = isLogin ? 'Digite seu email e senha para fazer login' : 'Informe seus dados pessoais para cadastrar';
  const action = isLogin ? 'Login' : 'Cadastro';
  const footer = isLogin ? 'Não possui uma conta?' : 'Já possui uma conta?'
  const link = isLogin ? 'Cadastre-se' : 'Entre'

  return (
    <View className="bg-brand-black-900">
      <ImageBackground source={require('../../assets/bg.png')} resizeMode="cover" style={{ width: "100%", height: "100%" }}>
        <SafeAreaView className="flex flex-col justify-between h-full  px-4 py-6 z-10">
          <View className="flex items-center">
            <Image source={require('../../assets/favicon.png')} style={{ width: 162, height: 162 }} />
            <Text className="text-gray-50 font-semibold text-lg">{title}</Text>
            <Text className="text-gray-300 text-sm mb-[10px]">{description}</Text>
          </View>
          
          <FormLogin isLogin={isLogin} action={action} />

          <View className="flex items-center justify-center">
            <Text className="text-white font-semibold bg-red-700 px-3 py-1" onPress={() => navigation.navigate('app')}>Login Development</Text>
            <Text className="text-sm text-gray-200">{footer}</Text>
            <Text onPress={() => setLogin(!isLogin)} className="text-sm text-gray-200 font-semibold">{link}</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}
export default Login
