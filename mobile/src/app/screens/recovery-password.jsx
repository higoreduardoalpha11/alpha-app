import { useNavigation } from '@react-navigation/native'
import { View, Image, Text, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormRecoveryPassword from '../components/forms/recovery-password'

const RecoveryPassword = () => {
  // const queries = useQueries();
  // const token = queries.get('token');
  // const isResetPassword = !!token;
  const navigation = useNavigation()
  const isResetPassword = false

  const title = !isResetPassword ? 'Recuparar senha' : 'Redefinir senha'
  const description = !isResetPassword ? 'Informe seu endereço de email para recuperar sua senha' : 'Informe a nova senha, e confirme para alterar'
  const action = !isResetPassword ? 'Redefinir senha' : 'Alterar senha'

  return (
    <View className="bg-brand-black-900">
      <ImageBackground source={require('../../assets/bg.png')} resizeMode="cover" style={{ width: "100%", height: "100%" }}>
        <SafeAreaView className="flex flex-col justify-between h-full px-4 py-6">
          <View className="flex items-center">
            <Image source={require('../../assets/favicon.png')} style={{ width: 162, height: 162 }} />
            <Text className="text-gray-50 font-semibold text-lg">{title}</Text>
            <Text className="text-gray-300 text-sm mb-[10px]">{description}</Text>
          </View>

          <FormRecoveryPassword action={action} isResetPassword={isResetPassword} />

          <View className="flex items-center flex-row justify-center space-x-1 mt-[20px]">
            <Text className="text-sm text-gray-200">Lembrou a senha?</Text>
            <Text className="text-sm text-gray-200 font-semibold" onPress={() => navigation.navigate('login')}>Entrar</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default RecoveryPassword
