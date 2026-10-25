import { Container } from 'react-bootstrap'
import showroom from '../assets/images/showroom.jfif'
import store from '../assets/images/store.jfif'

const AboutUs = () => {
  return (
    <Container className="about-container">
      <header className="about-header">
        <h1 className="about-title">Point Hardware</h1>
        <h2 className="about-subtitle">Tu punto de referencia en tecnología</h2>
        <p className="about-lead">
          Somos un equipo apasionado por la tecnología, dedicado a llevar la mejor experiencia
          de hardware a cada cliente con componentes de vanguardia y asesoramiento experto.
        </p>
      </header>

      <section className="about-section">
        <img className="about-image" src={showroom} alt="Showroom de Point Hardware" />
        <div className="about-content">
          <h2>Hardware para cada proyecto</h2>
          <p>
            Desde nuestros inicios, seleccionamos productos de las marcas más reconocidas a
            nivel mundial. Cada componente, desde una placa madre hasta una tarjeta gráfica de
            última generación, cumple altos estándares de calidad y rendimiento.
          </p>
          <p>
            Creemos que la tecnología es una herramienta para innovar y crear. Por eso
            facilitamos el acceso a equipos que acompañen tus ideas, tu trabajo y tu diversión.
          </p>
        </div>
      </section>

      <section className="about-section about-section--reverse">
        <div className="about-content">
          <h2>Asesoramiento que marca la diferencia</h2>
          <p>
            Nuestra visión es ser una tienda líder en hardware, ofreciendo un servicio
            transparente y cercano. Nuestro equipo está preparado para guiarte en tu próximo
            build, actualización o proyecto empresarial.
          </p>
          <p>
            Para nosotros, cada cliente es un socio tecnológico. Estamos para ayudarte a sacar
            el máximo potencial de tu equipo.
          </p>
        </div>
        <img className="about-image" src={store} alt="Local de Point Hardware" />
      </section>

      <section className="about-closing">
        <h2>Gracias por elegir Point Hardware</h2>
        <p>Nos alegra que formes parte de nuestra comunidad tecnológica.</p>
      </section>
    </Container>
  )
}

export default AboutUs
