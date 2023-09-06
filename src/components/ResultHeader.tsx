import React from 'react'
import { styled } from 'styled-components'
import { dimensions } from '../styles/dimensions'
import { fontSizes } from '../styles/fontSizes'
import { colors } from '../styles/colors'

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FoundWord = styled.h1`
  font-size: ${fontSizes.headingL};
  margin-bottom: ${dimensions.spacing.xxxs};

  @media (min-width: 768px) {
    font-size: ${fontSizes.headingXL};
  }
`
const PhoneticTranscription = styled.p`
  font-size: ${fontSizes.bodyM};
  color: ${colors.accents.info};

  @media (min-width: 768px) {
    font-size: ${fontSizes.headingM};
  }
`

const SVGStyled = styled.svg`
  cursor: pointer;
`

type ResultHeaderProps = {
  dictionaryEntry: {
    word: string
    phonetic: string[]
    audio: string[]
  }[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResultHeader: React.FC<ResultHeaderProps> = ({
  dictionaryEntry,
}) => {
  // eslint-disable-next-line prefer-const
  let audio = new Audio(dictionaryEntry[0].audio[0])

  const playAudio = () => {
    audio.play()
  }

  return (
    <FlexContainer>
      <div>
        <FoundWord>{dictionaryEntry[0].word}</FoundWord>

        <PhoneticTranscription>
          {dictionaryEntry[0].phonetic[0]}
        </PhoneticTranscription>
      </div>

      <SVGStyled
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 75 75"
        onClick={playAudio}
      >
        <g fill="#A445ED" fillRule="evenodd">
          <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
          <path d="M29 27v21l21-10.5z" />
        </g>
      </SVGStyled>
    </FlexContainer>
  )
}
