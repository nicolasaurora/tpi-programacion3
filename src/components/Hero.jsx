import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import logo from '../assets/images/ph-celeste.png';



const Hero = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <section className='min-vh-80 d-flex text-center align-items-center justify-content-top flex-column'>

        <img 
          src={logo} 
          alt="Logo Point Hardware"
          width={600}
          height={200} 
        />
        <h3>Potenciá tu mundo, componente por componente.</h3>
        <p>Somos una tienda especializada en tecnología y componentes de PC. Ofrecemos productos confiables para que armes, mejores y disfrutes tu equipo al máximo.</p>
      
      </section>

      <section>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={4000}>
          <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Componentes de PC"
                  style={{ height: '70vh', objectFit: 'cover', filter: 'brightness(45%)'}}
                />
            <Carousel.Caption>
              <h3>Componentes de calidad</h3>
              <p>Todo lo que necesitás para potenciar tu PC.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c"
              alt="Hardware"
              style={{ height: '70vh', objectFit: 'cover', filter: 'brightness(45%)' }}
            />
            <Carousel.Caption>
              <h3>La mejor tecnología</h3>
              <p>Elegí componentes para cada necesidad.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        
      </section>  
    </>
  )
}

export default Hero