import { Provider } from "react-redux"
import { AppRouter } from "./AppRouter"
import { store } from "./store/store"
import { PieDePagina } from "./components/layout/PieDePagina"
//import { PrimeReactProvider } from "primereact/api"


export const UsersApp = () => {
return(
    <Provider store={store}>
       
    <AppRouter />
  
  
   </Provider>
)
   
}