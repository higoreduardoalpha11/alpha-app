import { Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AnalyticsFrame = ({ icon, value }) => {
  return (
    <View className="flex items-center justify-center bg-gray-50 p-[10px] w-[120px]">
      <MaterialIcons name={icon} size={30} color="#BDC3FF" />
      <Text className="text-xl font-bold text-brand-gray-900 uppercase mt-[10px]">{value}</Text>
    </View>
  )
}

export default AnalyticsFrame
