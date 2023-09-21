import React from 'react'
import { styled } from 'styled-components'

import sadFace from '../assets/images/sadFace.png'
import { fontSizes, dimensions, colors } from '../styles/index'

const CenteredSection = styled.section`
  text-align: center;
`

const ErrorImg = styled.img`
  width: 124px;
  margin-top: ${dimensions.spacing.xxxxl};
  margin-bottom: ${dimensions.spacing.xxl};
`

const SubHeading = styled.h2`
  font-size: ${fontSizes.headingS};
  color: ${({ theme }) => theme.mainText};
  margin-bottom: ${dimensions.spacing.md};
`

const TextStyled = styled.p`
  font-size: ${fontSizes.bodyM};
  color: ${colors.greys.grey1};
`

export const ErrorMsg: React.FC = () => {
  return (
    <CenteredSection>
      <ErrorImg src={sadFace} />
      <SubHeading>No Definitions Found</SubHeading>
      <TextStyled>
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </TextStyled>
    </CenteredSection>
  )
}
