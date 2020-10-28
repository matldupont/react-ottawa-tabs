import { ThemeProvider, GlobalStyle, Stack, Heading } from '@rebeldotcom/components'
import {TabView} from './TabView'

const tabs = [
  {title: "Tab 1", content: "This is Tab 1"},
  {title: "Tab 2", content: "This is Tab 2"},
  {title: "Tab 3", content: "This is Tab 3"},
  {title: "Tab 4", content: "This is Tab 4"},

]
  


function App() {
  return (
      <ThemeProvider >
        <GlobalStyle />
        <Stack as="main" alignItems="center" py={5}>
          <Heading as="h1" variant="teraBold">Tabbed Interface Demo</Heading>
          <TabView tabData={tabs} />
        </Stack>
      </ThemeProvider>
  );
}

export default App;
