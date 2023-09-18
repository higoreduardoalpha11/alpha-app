import { TouchableOpacity, View } from 'react-native'

const ToogleButton = ({ active, width = 40, height = 15, rotate, ...props }) => {
  
  return (
    <TouchableOpacity activeOpacity={0.7} {...props} className={`relative w-[${width}px] h-[${height}px] rounded-full ${rotate && "-rotate-90"} transition-all duration-200 ${active ? "bg-gray-900" : "bg-gray-400"}`}>
      <View className={`absolute w-[15px] h-[15px] rounded-[15px] bg-gray-50 ${active ? "right-0" : "left-0"}`}></View>
    </TouchableOpacity>
  )
}

export default ToogleButton
