import React from 'react'
import { styled } from 'styled-components'
import { fontSizes } from '../styles/fontSizes'
import { colors } from '../styles/colors'
import { dimensions } from '../styles/dimensions'

import linkIcon from '../assets/images/icon-new-window.svg'

// type DefinitionBoxProps {

// }

const PartOfSpeech = styled.h3`
  font-size: ${fontSizes.bodyM};
  font-style: italic;
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
  background-color: ${colors.greys.grey2};
`

const DefinitionHeading = styled.p`
  color: ${colors.greys.grey1};
  margin-bottom: ${dimensions.spacing.base};
`
const SynonymsHeading = styled.p`
  color: ${colors.greys.grey1};
  margin: ${dimensions.spacing.md} 0;
  display: flex;
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
    color: ${colors.darks.dark3};
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

const SourceSection = styled.div`
  margin-top: ${dimensions.spacing.md};

  & p {
    margin-bottom: ${dimensions.spacing.xxxs};
    text-decoration-line: underline;
    font-size: ${fontSizes.bodyS};
    color: ${colors.greys.grey1};
  }
`
// this component need as props: partOfSpeech (noun, verb etc), wordDefinition, synonyms?, useExample?, sourceLink

export const DefinitionBox: React.FC = () => {
  return (
    <section>
      <FlexContainer>
        <PartOfSpeech>noun</PartOfSpeech>

        <DividerLine />
      </FlexContainer>

      <DefinitionHeading>Meaning</DefinitionHeading>

      <ListStyled>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          eligendi! Perferendis, qui esse nihil aperiam reprehenderit error
          iusto fugiat sint pariatur natus suscipit neque voluptatem quia! Porro
          voluptatum eos tempora et aut. Deleniti labore illum modi hic et esse
          tempora!
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          eligendi! Perferendis, qui esse nihil aperiam reprehenderit error
          iusto fugiat sint pariatur natus suscipit neque voluptatem quia! Porro
          voluptatum eos tempora et aut. Deleniti labore illum modi hic et esse
          tempora!
        </li>
      </ListStyled>

      <SynonymsHeading>
        Synonyms <SpanStyled>electronic keyboard</SpanStyled>
      </SynonymsHeading>

      <UseExample>
        “Keyboarding is the part of this job I hate the most.”
      </UseExample>

      <DividerLine />

      <SourceSection>
        <p>Source</p>

        <a href="#">
          https://en.wiktionary.org/wiki/keyboard <img src={linkIcon} alt="" />{' '}
        </a>
      </SourceSection>
    </section>
  )
}
