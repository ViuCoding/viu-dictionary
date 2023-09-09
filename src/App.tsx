import { ChangeEvent, useState } from 'react'

import { createGlobalStyle } from 'styled-components'
import { styled } from 'styled-components'

import { ErrorMsg, Navbar, ResultHeader } from './components/index'

import { dimensions } from './styles/dimensions'
import { colors } from './styles/colors'
import { fontSizes } from './styles/fontSizes'

import searchIcon from './assets/images/icon-search.svg'
import linkIcon from './assets/images/icon-new-window.svg'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DefinitionBox } from './components/DefinitionBox'

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
  margin-bottom: ${dimensions.spacing.xxl};
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

  @media (min-width: 768px) {
    font-size: ${fontSizes.headingS};
  }
`

const SearchIcon = styled.img`
  position: absolute;
  right: ${dimensions.spacing.md};
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`

const SourceSection = styled.div`
  margin-top: ${dimensions.spacing.md};

  & p {
    margin-bottom: ${dimensions.spacing.xxxs};
    text-decoration-line: underline;
    font-size: ${fontSizes.bodyS};
    color: ${colors.greys.grey1};
  }
`

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.greys.grey2};
`

// Navbar dropdown options passed as prop
const dropDownOptions = ['Sans Serif', 'Serif', 'Mono']

const getWord = (query: string) => {
  return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch()
  }

  const handleImageClick = () => {
    refetch()
  }

  // Queries
  const { data, refetch, isError } = useQuery({
    queryKey: ['word'],
    queryFn: () => getWord(searchQuery),
    enabled: false,
  })

  // Mapped Prop for ResultHeaderComponent
  // TO BE UPDATED TO INCLUDE MEANING AND DEFINITION, TO PASS IT AS PROP TO THE DEFINITION BOX
  // TO BE UPDATED TO INCLUDE MEANING AND DEFINITION, TO PASS IT AS PROP TO THE DEFINITION BOX
  // TO BE UPDATED TO INCLUDE MEANING AND DEFINITION, TO PASS IT AS PROP TO THE DEFINITION BOX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dictionaryEntry = data?.data.map((word: any) => {
    return {
      word: word.word,
      phonetic: word.phonetics
        .filter((i: { text: undefined | string }) => i.text)
        .map((i: { text: string[] }) => i.text),
      audio: word.phonetics
        .filter((i: { audio: undefined | string }) => i.audio)
        .map((i: { audio: string[] }) => i.audio),
    }
  })

  return (
    <>
      <GlobalStyle />

      <Container>
        <Navbar dropDownOptions={dropDownOptions} />
        <InputWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="Search for any word…"
              value={searchQuery}
              onChange={handleSearchQuery}
            />
          </form>
          <SearchIcon
            src={searchIcon}
            alt="Search Icon"
            onClick={handleImageClick}
          />
        </InputWrapper>

        {data && !isError && <ResultHeader dictionaryEntry={dictionaryEntry} />}

        {isError && <ErrorMsg />}

        {data && !isError && <DefinitionBox />}

        {data && !isError && (
          <>
            <DividerLine />

            <SourceSection>
              <p>Source</p>

              <a href="#">
                https://en.wiktionary.org/wiki/keyboard{' '}
                <img src={linkIcon} alt="" />{' '}
              </a>
            </SourceSection>
          </>
        )}
      </Container>
    </>
  )
}

export default App
