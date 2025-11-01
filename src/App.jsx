
import Body from "./components/Body"
import store  from "../src/utils/store"
import { Provider } from 'react-redux'


const App = () => {
  return ( 
    <>
    <div>
    <Provider store={store}>
       <Body/>
    </Provider>
    </div>
    </>
  )
}

export default App

