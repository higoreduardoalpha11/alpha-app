import { TouchableOpacity, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Button = ({
  className,
  icon,
  sizeIcon,
  colorIcon,
  textClassName,
  text,
  ...props
}) => {
  return (
    <TouchableOpacity className={className} activeOpacity={0.7} {...props}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={sizeIcon || 15}
          color={colorIcon || '#E5E7EB'}
        />
      )}
      {text && <Text className={textClassName}>{text}</Text>}
    </TouchableOpacity>
  )
}
export default Button
