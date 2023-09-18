import { TouchableOpacity, View } from "react-native"

const QrButton = ({ ...props }) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.7} className="relative w-[100px] h-[100px] border-2 border-gray-700 bg-brand-black-800">
      <View className="absolute top-[10px] left-[10px] w-[10px] h-[10px] border-t-2 border-l-2 border-gray-700"></View>
      <View className="absolute top-[10px] right-[10px] w-[10px] h-[10px] border-t-2 border-r-2 border-gray-700"></View>
      <View className="absolute bottom-[10px] left-[10px] w-[10px] h-[10px] border-b-2 border-l-2 border-gray-700"></View>
      <View className="absolute bottom-[10px] right-[10px] w-[10px] h-[10px] border-b-2 border-r-2 border-gray-700"></View>
    </TouchableOpacity>
  )
}

export default QrButton
