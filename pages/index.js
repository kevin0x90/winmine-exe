import styled, {ThemeProvider} from "styled-components"
import win95Theme from "~/lib/win95Theme"
import Desktop from "~/components/Desktop"
import TaskManager from "~/components/TaskManager"
import useMouseButtonIdentifier from "~/lib/useMouseButtonIdentifier"

const Windows95 = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${win95Theme.colors.teal};
  color: ${win95Theme.colors.gray[3]};
  overflow: hidden;
  font-family: ${win95Theme.fontFamilies.default};
  font-size: ${win95Theme.fontSizes[0]};
  user-select: none;
  cursor: ${win95Theme.cursors.default};
  cursor: ${win95Theme.cursors.webkitDefault};
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;

  * {
    cursor: inherit;
  }

  img {
    pointer-events: none;
    image-rendering: pixelated;
  }
`

const Index = () => {
  useMouseButtonIdentifier()
  return (
    <Windows95>
      <ThemeProvider theme={win95Theme}>
        <TaskManager>
          <Desktop />
        </TaskManager>
      </ThemeProvider>
    </Windows95>
  )
}

export default Index
