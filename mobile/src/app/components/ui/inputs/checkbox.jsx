import { Text, TouchableOpacity, View } from 'react-native'

const Checkbox = ({ checked = false, label, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props} className={`flex items-center flex-row px-4 space-x-3 w-full bg-brand-black-800 mx-auto h-[60px] border ${checked ? 'border-gray-50' : 'border-gray-700'}`}>
      <View className={`w-4 h-4 border ${checked ? 'border-gray-50' : 'border-gray-700'} flex items-center justify-center rounded-lg`}>
        {checked && <View className="w-3 h-3 bg-gray-50 rounded-lg"></View>}
      </View>
      <Text className={`${checked ? 'text-gray-50' : 'text-brand-primary'} truncate`}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Checkbox
