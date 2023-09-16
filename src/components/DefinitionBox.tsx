import React from 'react'
import { styled } from 'styled-components'
import { fontSizes } from '../styles/fontSizes'
import { colors } from '../styles/colors'
import { dimensions } from '../styles/dimensions'

const PartOfSpeech = styled.h3`
  font-size: ${fontSizes.bodyM};
  font-style: italic;
  color: ${({ theme }) => theme.mainText};
`

const FlexContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: ${dimensions.spacing.xl} 0;
`

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.dividerLine};
`

const DefinitionHeading = styled.p`
  color: ${colors.greys.grey1};
  margin-bottom: ${dimensions.spacing.base};
`
const SynonymsHeading = styled.p`
  color: ${colors.greys.grey1};
  margin: ${dimensions.spacing.md} 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${dimensions.spacing.md};
`

const SpanStyled = styled.span`
  color: ${colors.accents.info};
  font-weight: 700;
`

const ListStyled = styled.ul`
  list-style-position: inside;
  text-indent: -${dimensions.spacing.sm};
  margin-left: ${dimensions.spacing.sm};

  & li {
    line-height: ${dimensions.spacing.md};
    color: ${({ theme }) => theme.mainText};
    margin-bottom: ${dimensions.spacing.xs};
  }
  & li::marker {
    color: ${colors.accents.info};
  }
`

const UseExample = styled.p`
  margin-left: ${dimensions.spacing.sm};
  margin-bottom: ${dimensions.spacing.lg};
  color: ${colors.greys.grey1};
`

// this component need as props: partOfSpeech (noun, verb etc), wordDefinition, synonyms?, useExample?, sourceLink

type DefinitionBoxProps = {
  partOfSpeech: string
  definitions: {
    definition: string
    synonyms: string[]
    antonyms: string[]
    example: string
  }[]
  synonyms: string[]
}

export const DefinitionBox: React.FC<DefinitionBoxProps> = ({
  partOfSpeech,
  definitions,
  synonyms,
}) => {
  return (
    <section>
      <FlexContainer>
        <PartOfSpeech>{partOfSpeech}</PartOfSpeech>

        <DividerLine />
      </FlexContainer>

      <DefinitionHeading>Meaning</DefinitionHeading>

      <ListStyled>
        {definitions && (
          <>
            {definitions.map((word) => {
              return <li key={word.definition}>{word.definition}</li>
            })}
          </>
        )}
      </ListStyled>

      {synonyms.length > 0 && (
        <SynonymsHeading>
          Synonyms
          {synonyms.map((syn) => (
            <SpanStyled key={syn}>{syn}</SpanStyled>
          ))}
        </SynonymsHeading>
      )}

      {definitions && (
        <>
          {definitions.map((word) => {
            if (!word.example) return null
            return <UseExample key={word.example}>“{word.example}”</UseExample>
          })}
        </>
      )}
    </section>
  )
}
