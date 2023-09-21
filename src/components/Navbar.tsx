import React, { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'

import navLogo from '../assets/images/logo.svg'
import arrowDown from '../assets/images/icon-arrow-down.svg'

import { fontSizes } from '../styles/fontSizes'
import { colors } from '../styles/colors'
import { dimensions } from '../styles/dimensions'
import { dropDownType } from '../Types/types'

const NavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${dimensions.spacing.xxxl};
`
const FlexContainer = styled.div`
  display: flex;
  font-weight: 700;
  align-items: center;
  font-size: ${fontSizes.bodyS};

  svg,
  img {
    margin-left: 16px;
  }

  @media (min-width: 768px) {
    font-size: ${fontSizes.bodyM};
  }
`

const DropDownWrapper = styled(FlexContainer)`
  cursor: pointer;
`

const DividerBar = styled.div`
  width: 1px;
  height: 32px;
  background-color: ${colors.greys.grey2};
  margin-left: 16px;
`

const DropDownContainer = styled.div`
  position: relative;
`

const DropDownText = styled.div`
  color: ${({ theme }) => theme.mainText};
`

const DropDownOptions = styled.div`
  width: 183px;
  height: 152px;
  border-radius: ${dimensions.borderRadius.base};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  right: -32px;
  top: 32px;
  padding: 24px;
  z-index: 2;
  background-color: ${({ theme }) => theme.dropDown};
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.mainText};

  p:nth-child(1) {
    font-family: 'Inter';
  }
  p:nth-child(2) {
    font-family: 'Lora';
  }
  p:nth-child(3) {
    font-family: 'Inconsolata';
  }

  p:hover {
    color: ${colors.accents.info};
  }
`

// toggle switch
const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
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
  dropDownOptions: dropDownType
  checked: boolean
  handleToggleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDropDownFont: (style: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  dropDownOptions,
  checked,
  handleToggleChange,
  handleDropDownFont,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [fontNameDisplay, setFontNameDisplay] = useState(
    dropDownOptions[0].fontName
  )

  const handleDropDownClick = (fontValue: string, fontName: string) => {
    handleDropDownFont(fontValue)
    setFontNameDisplay(fontName)
  }

  const toggleDropdown = () => {
    setIsVisible((prevState) => !prevState)
  }

  return (
    <header>
      <NavStyled>
        <img src={navLogo} alt="Logo" />

        <FlexContainer>
          <DropDownWrapper onClick={toggleDropdown}>
            <DropDownText>{fontNameDisplay}</DropDownText>
            {isVisible && (
              <DropDownContainer>
                <DropDownOptions>
                  {dropDownOptions.map((opt) => (
                    <p
                      key={opt.fontName}
                      onClick={() =>
                        handleDropDownClick(opt.fontValue, opt.fontName)
                      }
                    >
                      {opt.fontName}
                    </p>
                  ))}
                </DropDownOptions>
              </DropDownContainer>
            )}
            <img src={arrowDown} alt="" />
          </DropDownWrapper>

          <DividerBar />

          <Label htmlFor="theme">
            <Input id="theme" type="checkbox" onChange={handleToggleChange} />
            <Switch />

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
          </Label>
        </FlexContainer>
      </NavStyled>
    </header>
  )
}
