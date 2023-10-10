import { render, fireEvent } from "@testing-library/react"
import IngredientesSelecionados from "./index"
import { IngredientesContext } from "../IngredientesContext/index"
import { vi } from "vitest"

// Função utilitária para renderizar o componente com o contexto
const renderWithIngredientesContext = (component, ingredientesSelecionados) => {
  const contextValue = {
    ingredientesSelecionados,
    alternarIngrediente: () => {},
  }

  return render(
    <IngredientesContext.Provider value={contextValue}>
      {component}
    </IngredientesContext.Provider>
  )
}

test("Renderiza 'Sua lista:' quando ingredientesSelecionados não está vazio", () => {
  const { getByText } = renderWithIngredientesContext(
    <IngredientesSelecionados />,
    [{ id: 1, nome: "Ingrediente 1" }]
  )

  const titulo = getByText("Sua lista:")
  expect(titulo).toBeInTheDocument()
})

test("Não renderiza 'Sua lista:' quando ingredientesSelecionados está vazio", () => {
  const { queryByText } = renderWithIngredientesContext(
    <IngredientesSelecionados />,
    []
  )

  const titulo = queryByText("Sua lista:")
  expect(titulo).toBeNull()
})

test("Renderiza tags de ingredientes selecionados", () => {
  const ingredientesSelecionados = [
    { id: 1, nome: "Ingrediente 1" },
    { id: 2, nome: "Ingrediente 2" },
  ]

  const { getAllByText } = renderWithIngredientesContext(
    <IngredientesSelecionados />,
    ingredientesSelecionados
  )

  const tags = getAllByText(/Ingrediente \d/)
  expect(tags).toHaveLength(2)
})

test(
  "Chama a função alternarIngrediente quando uma tag de ingrediente é clicada",
  () => {
    // Defina o contexto dentro do escopo do teste
    const contextValue = {
      ingredientesSelecionados: [{ id: 1, nome: "Ingrediente 1" }],
      alternarIngrediente: vi.fn(), // Mock da função alternarIngrediente
    }

    const { getByText } = render(
      <IngredientesContext.Provider value={contextValue}>
        <IngredientesSelecionados />
      </IngredientesContext.Provider>
    )

    // Encontre a tag de ingrediente pelo texto
    const tagIngrediente = getByText("Ingrediente 1")

    // Simule um clique na tag de ingrediente
    fireEvent.click(tagIngrediente)

    // Verifique se a função alternarIngrediente foi chamada com o ingrediente correto
    expect(contextValue.alternarIngrediente).toHaveBeenCalledWith({
      id: 1,
      nome: "Ingrediente 1",
    })
  }
)