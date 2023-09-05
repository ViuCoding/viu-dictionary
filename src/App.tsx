import { styled } from 'styled-components'
import { dimensions } from './styles/dimensions'
import { createGlobalStyle } from 'styled-components'
import { Navbar } from './components/Navbar'

const dropDownOptions = ['Sans Serif', 'Serif', 'Mono']

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

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar dropDownOptions={dropDownOptions} />
      </Container>
    </>
  )
}

export default App
