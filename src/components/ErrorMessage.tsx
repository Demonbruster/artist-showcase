import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

interface ErrorMessageProps {
  title?: string
  message: string
}

const ErrorMessage = ({ title = 'Error', message }: ErrorMessageProps) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius="lg"
      py={8}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxW="sm">{message}</AlertDescription>
    </Alert>
  )
}

export default ErrorMessage

