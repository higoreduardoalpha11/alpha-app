import { useRef, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from 'tailwindcss/colors'

const Input = ({ icon, placeholder, label, ...props }) => {
  const inputRef = useRef()
  const [focused, setFocused] = useState(false)

  return (
    <View className={`group w-full mx-auto h-[80px] py-2 px-3 bg-brand-black-800 border ${focused ? "border-gray-50" : "border-gray-700"} overflow-hidden`}>
      <Text className={`${focused ? "text-brand-primary" : "text-gray-500"} text-xs pointer-events-none transition-all duration-200`}>
        {label}
      </Text>
      <View className="flex flex-row space-x-4">
        <View className="flex items-center justify-center h-full">
          <MaterialIcons name={icon} size={15} color={colors.gray[300]} />
        </View>
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          cursorColor={colors.gray[300]}
          placeholderTextColor={colors.gray[300]}
          onFocus={() => setFocused(true)}
          // onBlur={() => setFocused(false)}
          onPressOut={() => {if (!inputRef.current.focus) setFocused(false)}}
          {...props}
          className="text-gray-50 text-sm w-full h-full outline-none"
        />
      </View>
    </View>
  )
}

export default Input
