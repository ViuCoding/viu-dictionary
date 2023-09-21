import styled from 'styled-components'

const FooterStyled = styled.footer`
  padding-bottom: 3rem;
  color: ${({ theme }) => theme.mainText};
`

export const Footer: React.FC = () => {
  return <FooterStyled>LOL</FooterStyled>
}
