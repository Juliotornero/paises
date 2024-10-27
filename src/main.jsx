// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router.jsx';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import { CountryProvider } from './context/CountryContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CountryProvider> 
        <Router />
      </CountryProvider>
    </ApolloProvider>
  </StrictMode>,
);
