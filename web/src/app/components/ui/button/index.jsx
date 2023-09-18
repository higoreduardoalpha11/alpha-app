import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './index.css'

export default function Button({ route, type, title, size, color, content, handleOnClick }) {
  const button = <button
    type={type || 'button'}
    title={title}
    onClick={handleOnClick}
    className={`button button-${size} button-${color} flex flex-row flex-center gap-5`}
  >{content}</button>

  if (route) return (<Link to={route}>{button}</Link>)
  return button
}
Button.propTypes = {
  route: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  handleOnClick: PropTypes.func,
}