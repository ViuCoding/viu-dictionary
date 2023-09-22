import { ChangeEvent, useRef, useState } from 'react'

import { createGlobalStyle, styled, ThemeProvider } from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import axios from 'axios'

import { DropdownType, Meaning } from './Types/types'

import {
  ErrorMsg,
  LoadingSpinner,
  Navbar,
  ResultHeader,
  DefinitionBox,
} from './components/index'

import { dimensions, colors, fontSizes } from './styles/index'

import searchIcon from './assets/images/icon-search.svg'
import linkIcon from './assets/images/icon-new-window.svg'
import { DividerLine } from './styles/styledComponents'

type FontFamily = {
  fontFam: string
}

const GlobalStyle = createGlobalStyle<FontFamily>`
 *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
  }
  
  body{
    font-family: ${({ fontFam }) => fontFam}; 
    background-color: ${({ theme }) => theme.bodyBg};
    transition: all 0.3s linear;
  }
    `

const Container = styled.div`
  width: 90%;
  max-width: 736px;
  margin: 0 auto;
  padding-top: ${dimensions.spacing.xxxl};
  display: flex;
  flex-direction: column;
  height: 100vh;

  footer {
    margin-top: auto;
  }
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

const SearchButton = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
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

// Navbar dropdown options passed as prop
const dropDownOptions: DropdownType = [
  { fontValue: 'Inter', fontName: 'Sans Serif' },
  { fontValue: 'Lora', fontName: 'Serif' },
  { fontValue: 'Inconsolata', fontName: 'Mono' },
]

const getWord = (query: string) => {
  const data = axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  )
  return data
}

// Styled Components Themes

const lightTheme = {
  bodyBg: colors.white,
  mainText: colors.darks.dark3,
  dropDown: colors.white,
  inputBox: colors.greys.grey3,
  dividerLine: colors.greys.grey2,
  boxShadow: `0px 5px 30px 0px rgba(0, 0, 0, 0.10)`,
}
const darkTheme = {
  bodyBg: colors.darks.dark1,
  mainText: colors.white,
  dropDown: colors.darks.dark2,
  inputBox: colors.darks.dark2,
  dividerLine: colors.darks.dark4,
  boxShadow: `0px 5px 30px 0px #A445ED`,
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isQueryEmpty, setIsQueryEmpty] = useState(false)
  const [checked, setChecked] = useState(false)
  const [colorTheme, setColorTheme] = useState('light')
  const textInputRef = useRef<HTMLInputElement | null>(null)
  const [fontFam, setFontFam] = useState('Inter')

  const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    setColorTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    removeErrorClass()
    setSearchQuery(value)
  }

  const displaySearchError = () => {
    textInputRef?.current?.classList.add('error')
    setIsQueryEmpty(true)
  }

  const removeErrorClass = () => {
    textInputRef?.current?.classList.remove('error')
    setIsQueryEmpty(false)
  }

  const handleSearchSubmit = () => {
    removeErrorClass()
    refetch()
    setSearchQuery('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchQuery) {
      displaySearchError()
    } else {
      handleSearchSubmit()
    }
  }

  const handleDropDownFont = (style: string) => {
    setFontFam(style)
  }

  // Queries
  const { data, refetch, isError, isFetching } = useQuery({
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
      <GlobalStyle fontFam={fontFam} />

      <Container>
        <Navbar
          dropDownOptions={dropDownOptions}
          checked={checked}
          handleToggleChange={handleToggleChange}
          handleDropDownFont={handleDropDownFont}
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
            <SearchButton type="submit">
              <img src={searchIcon} alt="Search Icon" />
            </SearchButton>
          </form>
        </InputWrapper>

        {isQueryEmpty && <InputError>Whoops, can’t be empty…</InputError>}

        {isFetching && <LoadingSpinner />}

        {data && !isError && !isFetching && (
          <ResultHeader
            word={mappedDictionaryEntry[0].word}
            phonetic={mappedDictionaryEntry[0].phonetic[0]}
            audio={mappedDictionaryEntry[0].audio[0]}
          />
        )}
        {isError && <ErrorMsg />}
        {data && !isError && !isFetching && (
          <>
            {data?.data[0].meanings.map((meaning: Meaning) => {
              return (
                <DefinitionBox
                  key={nanoid()}
                  partOfSpeech={meaning.partOfSpeech}
                  definitions={meaning.definitions}
                  synonyms={meaning.synonyms}
                />
              )
            })}
          </>
        )}
        {data && !isError && !isFetching && (
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

        {/* <Footer /> */}
      </Container>
    </ThemeProvider>
  )
}

export default App
