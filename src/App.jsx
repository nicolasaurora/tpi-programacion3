import './App.css'
import Hero from './components/Hero'
import Nabvar from './components/Nabvar'
import Product from './components/product/Product'

function App() {
  

  return (
    <>
      <header>
        <Nabvar />
      </header>
      <main>
        <Hero />
        <Product />
      </main>
      
    </>
  )
}

export default App
