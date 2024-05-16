import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import { AuthProvider } from './auth/context/AuthProvider'
import './styles.css'
import { UsersApp } from './UsersApp'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <PrimeReactProvider >
     
    <BrowserRouter>
    
 {/* esto se utiliza con context <AuthProvider> */}
        <UsersApp />
        
 {/* </AuthProvider>*/}
    </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
)
