import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '@/app/components/ui/button/index.jsx'
import Icon from '@/app/components/ui/icons/index.jsx'
import logo from '/public/images/logo.svg'
import './index.css'

export default function Header() {
  const [openNavbar, setOpenNavbar] = useState(false)

  return (
    <header className="header">
      <section className="container">
        <Link to="/" className="header--logo">
          <img src={logo} alt="Alpha 11" />
        </Link>

        <div className="header--menu">
          <Button title="Menu" size="base" color="none" content={<Icon icon="menu" />} handleOnClick={() => setOpenNavbar(!openNavbar)} />
        </div>

        <nav className={`header--navbar flex flex-row gap-10 ${openNavbar ? 'active' : ''}`}>
          <Button route="/" title="Início" size="sm" color="none" content="Início" />
          <Button route="/produtos" title="Produtos" size="sm" color="none" content="Produtos" />
          <Button route="/sobre" title="Sobre" size="sm" color="none" content="Sobre" />
        </nav>

        <div className="header--buttons flex flex-row gap-5">
          <Button route="/equipe" title="Equipe" size="sm" color="none" content={<><Icon icon="time" /> Equipe</>} />
          <Button route="/contato" title="Contato" size="sm" color="none" content={<><Icon icon="mail" /> Contato</>} />
        </div>
      </section>
    </header>
  )
}