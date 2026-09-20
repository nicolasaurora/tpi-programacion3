import './App.css'
import Hero from './components/Hero'
import Nabvar from './components/Nabvar'
import ProductItem from './components/product/ProductItem'

function App() {
  

  return (
    <>
      <header>
        <Nabvar />
      </header>
      <main>
        <Hero />
        <ProductItem />
      </main>
      
    </>
  )
}

export default App
