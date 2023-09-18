import { models } from '../../../../@types/model.type'
import SterilizerStandart from './sterilizer-standart'

const SwitchCard = (props) => {
  switch (props.model) {
    case models.STERILIZER_STANDART_4T23_V1:
      return <SterilizerStandart {...props} />
    default:
      return null
  }
}

export default SwitchCard
