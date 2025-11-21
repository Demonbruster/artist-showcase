import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          padding={8}
          textAlign="center"
        >
          <Box maxWidth="md">
            <Heading size="xl" marginBottom={4} color="red.500">
              Oops! Something went wrong
            </Heading>
            <Text marginBottom={6} color="gray.600">
              {this.state.error?.message ||
                'An unexpected error occurred. Please try again.'}
            </Text>
            <Button colorScheme="blue" onClick={this.handleReset}>
              Try Again
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

