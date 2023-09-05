import React, { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'

import navLogo from '../assets/images/logo.svg'
import arrowDown from '../assets/images/icon-arrow-down.svg'

import { fontSizes } from '../styles/fontSizes'
import { colors } from '../styles/colors'
import { dimensions } from '../styles/dimensions'

const NavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${dimensions.spacing.xxxl};
`
const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  font-weight: 700;
  align-items: center;
  font-size: ${fontSizes.bodyS};

  @media (min-width: 768px) {
    font-size: ${fontSizes.bodyM};
  }
`

const DividerBar = styled.div`
  width: 1px;
  height: 32px;
  background-color: ${colors.greys.grey2};
`

// toggle switch
const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Switch = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background: ${colors.greys.grey1};
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    top: 50%;
    background-color: ${colors.white};
    transform: translate(0, -50%);
  }
`

const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: ${colors.accents.info};

    &:before {
      transform: translate(16px, -50%);
    }
  }
`

type NavbarProps = {
  dropDownOptions: string[]
}

export const Navbar: React.FC<NavbarProps> = ({ dropDownOptions }) => {
  const [checked, setChecked] = useState(false) // store value

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked)

  return (
    <header>
      <NavStyled>
        <img src={navLogo} alt="Logo" />

        <FlexContainer>
          <>{dropDownOptions[0]}</>
          <img src={arrowDown} alt="" />

          <DividerBar />

          <Label>
            <Input type="checkbox" onChange={handleChange} />
            <Switch />
          </Label>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
          >
            <path
              fill="none"
              stroke={
                checked ? `${colors.accents.info}` : `${colors.greys.grey1}`
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </FlexContainer>
      </NavStyled>
    </header>
  )
}
