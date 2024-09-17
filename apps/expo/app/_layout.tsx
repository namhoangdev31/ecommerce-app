import { Provider } from 'app/provider'
import { Stack } from 'expo-router/stack'

export default function Root() {
  return (
    <Provider>
      <Stack />
    </Provider>
  )
}
