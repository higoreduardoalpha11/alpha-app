import { StatusBar } from 'react-native'

import { AppProvider } from './src/contexts/app-context'
import Routes from './src/app/routes'

const App = () => {
  return (
    <AppProvider>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="#181A20" translucent={true} />
    </AppProvider>
  )
}

export default App
