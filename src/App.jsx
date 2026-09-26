import './App.css'
import Footer from './components/Footer'
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
        {/* <Product /> */}
        <Footer/>
      </main>
      
    </>
  )
}

export default App
