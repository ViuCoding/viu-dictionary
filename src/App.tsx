import { styled } from 'styled-components'
import { colors } from './styles/colors'
import { dimensions } from './styles/dimensions'
import { createGlobalStyle } from 'styled-components'
import { Navbar } from './components/Navbar'

const GlobalStyle = createGlobalStyle`
 *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 }
`

const Title = styled.h1`
  color: ${colors.darks.dark1};
`
const Container = styled.div`
  width: 90%;
  max-width: 736px;
  margin: ${dimensions.spacing.xxxl} auto;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar />
        <Title>TITLE</Title>
      </Container>
    </>
  )
}

export default App
