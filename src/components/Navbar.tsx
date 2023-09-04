import React from 'react'
import { styled } from 'styled-components'
import navLogo from '../assets/images/logo.svg'

const NavLogo = styled.img``
const NavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Navbar: React.FC = () => {
  return (
    <header>
      <NavStyled>
        <NavLogo src={navLogo} />

        <div>Something</div>
      </NavStyled>
    </header>
  )
}
