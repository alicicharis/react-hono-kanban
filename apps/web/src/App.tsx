import Board from './components/board';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <main>
        <Board />
      </main>
    </MantineProvider>
  );
}

export default App;
