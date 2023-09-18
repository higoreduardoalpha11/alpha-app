import { ActivityIndicator, View } from 'react-native'

const Loading = ({ size }) => {
  return (
    <View className="flex items-center justify-center">
      <ActivityIndicator size={size || 20} color="linear-gradient(45deg, rgb(101, 77, 238) 0%, rgba(255,255,255,1) 100%)" />
    </View>
  )
}

export default Loading
