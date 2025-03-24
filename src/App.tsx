import React from 'react';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ServicesProvider } from './contexts/ServicesContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppContent from './components/AppContent';

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <LoadingProvider>
              <AuthProvider>
                <ServicesProvider>
                  <AppContent />
                </ServicesProvider>
              </AuthProvider>
            </LoadingProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;