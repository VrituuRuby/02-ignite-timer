import { HeaderContainer } from './styles'
import igniteLogo from '../../assets/Logo.svg'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <h1>
        <img src={igniteLogo} alt="Ignite Logo" />
      </h1>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={30} />
        </NavLink>
        <NavLink to="/history" title="Históricoa aplicação">
          <Scroll size={30} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
