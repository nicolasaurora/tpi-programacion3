import { Outlet } from 'react-router'
import { FaLocationDot } from 'react-icons/fa6'
import { SiGmail, SiInstagram } from 'react-icons/si'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="page-layout">
      <main className="page-main"><Outlet/></main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h2 className="footer-brand">Point Hardware</h2>
              <p className="footer-description">
                Tecnología y componentes para potenciar tu equipo.
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Contacto</h3>
              <a className="footer-link" href="mailto:contacto@pointhardware.com">
                <SiGmail className="footer-icon" aria-hidden="true" />
                Gmail
              </a>
              <a
                className="footer-link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <SiInstagram className="footer-icon" aria-hidden="true" />
                Instagram
              </a>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Atención</h3>
              <p className="footer-description">Comprá online de forma simple y segura.</p>
              <p className="footer-description">Lunes a viernes, 9 a 18 h.</p>
              <a
                className="footer-address-link"
                href="https://www.google.com/maps/search/?api=1&query=Zeballos+1300,+Rosario,+Santa+Fe"
                target="_blank"
                rel="noreferrer"
              >
                <FaLocationDot className="footer-icon" aria-hidden="true" />
                Zeballos 1300, Rosario, Santa Fe
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            © {currentYear} Point Hardware. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
