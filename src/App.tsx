import { ChangeEvent, useState } from 'react'

import { createGlobalStyle } from 'styled-components'
import { styled } from 'styled-components'

import { dimensions } from './styles/dimensions'

import { Navbar } from './components/index'
import { colors } from './styles/colors'

import searchIcon from './assets/images/icon-search.svg'

const GlobalStyle = createGlobalStyle`
 *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
  }
  
  body{
    font-family: "Inter"; 
  }
  `

const Container = styled.div`
  width: 90%;
  max-width: 736px;
  margin: ${dimensions.spacing.xxxl} auto;
`

const InputWrapper = styled.div`
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${dimensions.spacing.sm} ${dimensions.spacing.md};
  border: none;
  border-radius: ${dimensions.borderRadius.base};
  background-color: ${colors.greys.grey3};
  font-weight: 700;

  &:focus-visible {
    outline: none;
    border: 1px solid ${colors.accents.info};
  }

  &.error {
    border-color: red; /* Define your error styles here */
  }
`

const SearchIcon = styled.img`
  position: absolute;
  right: ${dimensions.spacing.md};
  top: 50%;
  transform: translate(0, -50%);
`

// Navbar dropdown options passed as prop
const dropDownOptions = ['Sans Serif', 'Serif', 'Mono']

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar dropDownOptions={dropDownOptions} />

        <InputWrapper>
          <SearchInput
            type="text"
            placeholder="Search for any word…"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
          <SearchIcon src={searchIcon} alt="Search Icon" />
        </InputWrapper>
      </Container>
    </>
  )
}

export default App
