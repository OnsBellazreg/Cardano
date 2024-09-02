import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Fallback } from '@/components/Fallback/Fallback';
import { ROUTES } from '@/constants/routes';
import { AppProvider, FavoriteProvider } from '@/context';
import { client } from '@/graphql/client';
import { TrailDetail, Trails } from '@/pages';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <FavoriteProvider>
          <ChakraProvider theme={theme}>
            <ErrorBoundary
              FallbackComponent={Fallback}
              onReset={() => {
                window.location.reload();
              }}
            >
              <Router>
                <Routes>
                  <Route path={ROUTES.TRAILS} element={<TrailDetail />} />
                  <Route path={ROUTES.HOME} element={<Trails />} />
                </Routes>
              </Router>
            </ErrorBoundary>
          </ChakraProvider>
        </FavoriteProvider>
      </AppProvider>
    </ApolloProvider>
  );
};
