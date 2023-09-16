import { ChangeEvent, useRef, useState } from 'react'

import { createGlobalStyle } from 'styled-components'
import { styled } from 'styled-components'
import { ThemeProvider } from 'styled-components'

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
    background-color: ${({ theme }) => theme.bodyBg};
    transition: all 0.3s linear;
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
  background-color: ${({ theme }) => theme.inputBox};
  color: ${({ theme }) => theme.mainText};
  font-weight: 700;

  &:focus-visible {
    outline: none;
    border: 1px solid ${colors.accents.info};
  }

  &.error {
    border: 1px solid ${colors.accents.error};
  }

  @media (min-width: 768px) {
    font-size: ${fontSizes.headingS};
  }
`
const InputError = styled.p`
  color: ${colors.accents.error};
  position: relative;
  top: -30px;
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

  & a {
    color: ${({ theme }) => theme.mainText};
  }
`

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.dividerLine};
`

// Navbar dropdown options passed as prop
const dropDownOptions = ['Sans Serif', 'Serif', 'Mono']

const getWord = (query: string) => {
  return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
}

// Styled Components Themes

const lightTheme = {
  bodyBg: colors.white,
  mainText: colors.darks.dark3,
  inputBox: colors.greys.grey3,
  dividerLine: colors.greys.grey2,
}
const darkTheme = {
  bodyBg: colors.darks.dark1,
  mainText: colors.white,
  inputBox: colors.darks.dark2,
  dividerLine: colors.darks.dark4,
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isQueryEmpty, setIsQueryEmpty] = useState(false)
  const [checked, setChecked] = useState(false)
  const [colorTheme, setColorTheme] = useState('light')
  const textInputRef = useRef<HTMLInputElement | null>(null)

  const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    setColorTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    textInputRef?.current?.classList.remove('error')
    setIsQueryEmpty(false)
    setSearchQuery(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery) {
      textInputRef?.current?.classList.add('error')
      setIsQueryEmpty(true)
    } else {
      textInputRef?.current?.classList.remove('error')
      setIsQueryEmpty(false)
      refetch()
    }
  }

  const handleImageClick = () => {
    if (!searchQuery) {
      textInputRef?.current?.classList.add('error')
      setIsQueryEmpty(true)
    } else {
      textInputRef?.current?.classList.remove('error')
      setIsQueryEmpty(false)
      refetch()
    }
  }

  // Queries
  const { data, refetch, isError } = useQuery({
    queryKey: ['word'],
    queryFn: () => getWord(searchQuery),
    enabled: false,
  })

  // Mapped Prop for ResultHeaderComponent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedDictionaryEntry = data?.data.map((word: any) => {
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
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />

      <Container>
        <Navbar
          dropDownOptions={dropDownOptions}
          checked={checked}
          handleToggleChange={handleToggleChange}
        />

        <InputWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="Search for any word…"
              value={searchQuery}
              onChange={handleSearchQuery}
              ref={textInputRef}
            />
          </form>

          <SearchIcon
            src={searchIcon}
            alt="Search Icon"
            onClick={handleImageClick}
          />
        </InputWrapper>
        {isQueryEmpty && <InputError>Whoops, can’t be empty…</InputError>}

        {data && !isError && (
          <ResultHeader
            word={mappedDictionaryEntry[0].word}
            phonetic={mappedDictionaryEntry[0].phonetic[0]}
            audio={mappedDictionaryEntry[0].audio[0]}
          />
        )}

        {isError && <ErrorMsg />}

        {data && !isError && (
          <>
            {data?.data[0].meanings.map(
              (meaning: {
                partOfSpeech: string
                definitions: {
                  definition: string
                  synonyms: string[]
                  antonyms: string[]
                  example: string
                }[]
                synonyms: string[]
              }) => {
                return (
                  <DefinitionBox
                    key={Math.random() * 1000}
                    partOfSpeech={meaning.partOfSpeech}
                    definitions={meaning.definitions}
                    synonyms={meaning.synonyms}
                  />
                )
              }
            )}
          </>
        )}

        {data && !isError && (
          <>
            <DividerLine />

            <SourceSection>
              <p>Source</p>

              <a href={data?.data[0].sourceUrls} target="_blank">
                {data?.data[0].sourceUrls} <img src={linkIcon} alt="" />{' '}
              </a>
            </SourceSection>
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
