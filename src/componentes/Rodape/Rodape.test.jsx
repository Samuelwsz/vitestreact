import { render } from "@testing-library/react"
import Rodape from "./index"

test("Renderiza o componente Rodape corretamente", () => {
  // Renderiza o componente
  const { getByText } = render(<Rodape />)

  // Verifica se o texto está presente no componente
  const texto = getByText(
    "Desenvolvido por Alura | 2023 - Projeto fictício sem fins comerciais."
  )

  expect(texto).toBeInTheDocument()
})
