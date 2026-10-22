import { Outlet } from 'react-router'

const Footer = () => {
  return (
    <>
    <main><Outlet/></main>
    <section className='min-vh-40 d-flex text-center justify-content-top mt-4 flex-column'>
        <h2>Point Hardware</h2>
    </section>
    </>
  )
}

export default Footer