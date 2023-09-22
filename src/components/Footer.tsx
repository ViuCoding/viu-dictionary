import styled from 'styled-components'

import { colors, dimensions, fontSizes } from '../styles'
import footerLogo from '../assets/images/footerLogo.png'
import gitHub from '../assets/images/gitHub.png'
import linkedIn from '../assets/images/linkedIn.png'
import portfolio from '../assets/images/anchor.png'

const FooterStyled = styled.footer`
  padding: ${dimensions.spacing.xxl} 0;
  color: ${({ theme }) => theme.mainText};
`

const FlexContainer = styled.div`
  display: flex;
  font-weight: 700;
  gap: ${dimensions.spacing.xs};
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const FooterLogo = styled(FlexContainer)`
  gap: ${dimensions.spacing.xxxs};
  flex-direction: row;
  p {
    font-size: ${fontSizes.headingM};
    font-family: monospace;
  }
  span {
    color: ${colors.accents.info};
  }
  img {
    width: 34px;
  }
`

const SocialMedias = styled(FlexContainer)`
  gap: ${dimensions.spacing.xxs};
  flex-direction: row;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.mainText};
  }
  img {
    width: 34px;
  }
`

export const Footer: React.FC = () => {
  return (
    <FooterStyled>
      <FlexContainer>
        <FooterLogo>
          <p>
            <span>viu</span>Dictionary
          </p>
          <img src={footerLogo} alt="" />
        </FooterLogo>

        <SocialMedias>
          <a href="https://vincenzocristiano.dev/" target="_blank">
            <img src={portfolio} alt="" />
          </a>
          <a href="https://github.com/ViuCoding" target="_blank">
            <img src={gitHub} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/vincenzo-cristiano/"
            target="_blank"
          >
            <img src={linkedIn} alt="" />
          </a>
        </SocialMedias>
      </FlexContainer>
    </FooterStyled>
  )
}
