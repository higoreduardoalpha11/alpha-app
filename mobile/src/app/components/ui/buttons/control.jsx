import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from 'tailwindcss/colors'

import ToogleButton from './toogle'

const ControlButton = ({ component, icon, active, ...props }) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.7} className={`flex items-center justify-center p-[20px] w-[160px] ${active ? "bg-brand-darkgreen" : "bg-gray-300"}`}>
      <View className="flex flex-row items-center w-full justify-between mb-[15px]">
        <Text className={`text-xs font-normal ${active ? "text-gray-50" : "text-gray-900"}`}>{component}</Text>
        <ToogleButton active={active} />
      </View>

      <MaterialIcons name={icon} size={60} color={active ? colors.gray[200] : colors.gray[600]} />
    </TouchableOpacity>
  )
}

export default ControlButton
