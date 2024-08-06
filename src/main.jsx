import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { ContextQz } from './contextQz.jsx'
 
const query= new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <ContextQz>
        <App/>
      </ContextQz>
    </QueryClientProvider>
  </React.StrictMode>,
)
