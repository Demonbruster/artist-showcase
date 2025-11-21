import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ErrorBoundary'
import { AppRouter } from './router'
import { queryClient } from './api/queryClient'
import theme from './theme'

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AppRouter />
        </ChakraProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
