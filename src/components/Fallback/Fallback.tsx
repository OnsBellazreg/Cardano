import { Button } from '@chakra-ui/react';

export const Fallback = ({ error, resetErrorBoundary }: any) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red.500' }}>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};
