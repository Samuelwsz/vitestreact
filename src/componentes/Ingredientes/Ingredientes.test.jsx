import { render } from "@testing-library/react"
import Ingredientes from "./index" // Importe o seu componente
import { IngredientesContext } from "../IngredientesContext"

test('Exibe o título "Ingredientes"', () => {
  const { getByText } = render(<Ingredientes />)
  const titulo = getByText("Ingredientes")
  expect(titulo).toBeInTheDocument()
})

test("Exibe a mensagem de seleção de ingredientes", () => {
  const { getByText } = render(<Ingredientes />)
  const mensagem = getByText(
    "Selecione abaixo os ingredientes que você quer usar nesta receita:"
  )
  expect(mensagem).toBeInTheDocument()
})

test("Renderiza os cartões de ingredientes", () => {
  const categorias = [
    { id: 1, name: "Categoria 1" },
    { id: 2, name: "Categoria 2" },
    { id: 3, name: "Categoria 3" },
  ]

  const { getAllByTestId } = render(<Ingredientes />, {
    // Mock do contexto de Ingredientes para fornecer categorias
    wrapper: ({ children }) => (
      <IngredientesContext.Provider value={{ categorias }}>
        {children}
      </IngredientesContext.Provider>
    ),
  })

  const cardIngredientes = getAllByTestId("card-ingrediente")
  expect(cardIngredientes).toHaveLength(categorias.length)
})
