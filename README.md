# React + Vite


```
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom vitest
```

no package.json adicione o script
```
"teste": "vitest"
```
no vite.config.js adicione as seguintes linhas

```
export default defineConfig({
  plugins: [react()],
  test: {
        globals: true,
        setupFiles: "./setupFile.js"
        environment: "jsdom"
    }
})
```
Na raiz do projeto crie um arquivo chamado setupFile.js
```
import "@testing-library/jest-dom"
```
exemplo de teste

Rodape.test.tsx
```
import { render } from "@testing-library/react";

import Rodape from "./Rodape";

test("Renderiza o texto corretamente", () => {

      const { getByText} render(<Rodape />);

      const texto getByText(/Desenvolvido por Alura - Projeto fictício sem fins comerciais./i);

      expect(texto).toBeInTheDocument();

});
```
```
npm run teste
```
