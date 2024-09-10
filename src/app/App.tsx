import '../App.css'
import {AppRouter} from "../presentation/routes/AppRouter.tsx";

function App() {

  return (
    <>
        <h1 className="text-xl font-bold text-red-500">Qué vamos a mirar?</h1>
        <AppRouter />
    </>
  )
}

export default App
