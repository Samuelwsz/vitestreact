import { useContext } from "react"
import { render, fireEvent } from "@testing-library/react"
import { IngredientesProvider, IngredientesContext } from "./index"
import { expect } from "vitest"

// Mock de um componente consumidor do contexto
const MockConsumer = () => {
  const {
    categorias,
    ingredientesSelecionados,
    alternarIngrediente,
    ingredienteEstaSelecionado,
  } = useContext(IngredientesContext)

  return (
    <div>
      <div data-testid="categorias">{categorias.join(", ")}</div>
      <div data-testid="ingredientesSelecionados">
        {ingredientesSelecionados
          .map((ingrediente) => ingrediente.nome)
          .join(", ")}
      </div>
      <button
        data-testid="toggleIngrediente"
        onClick={() => alternarIngrediente({ id: 1, nome: "Ingrediente 1" })}
      >
        Toggle Ingrediente
      </button>
      <div data-testid="ingredienteSelecionado">
        Ingrediente Selecionado:{" "}
        {ingredienteEstaSelecionado({ id: 1, nome: "Ingrediente 1" })
          ? "Sim"
          : "Não"}
      </div>
    </div>
  )
}

test("Alternar Ingrediente - Adiciona e remove", () => {
  const { getByTestId } = render(
    <IngredientesProvider>
      <MockConsumer />
    </IngredientesProvider>
  )

  // Verifica se o botão de alternar ingrediente funciona corretamente
  const toggleButton = getByTestId("toggleIngrediente")

  fireEvent.click(toggleButton) // Adiciona o ingrediente
  fireEvent.click(toggleButton) // Remove o ingrediente

  // Verifica se o ingrediente foi adicionado e removido corretamente
  const ingredientesSelecionados = getByTestId("ingredientesSelecionados")
  expect(ingredientesSelecionados.textContent).toBe("")

  // Verifica se a função ingredienteEstaSelecionado funciona corretamente
  const ingredienteSelecionado = getByTestId("ingredienteSelecionado")
  expect(ingredienteSelecionado.textContent).toBe(
    "Ingrediente Selecionado: Não"
  )
})


test("Verifica se o ingrediente está selecionado", () => {
  const TestComponent = () => {
    const { ingredienteEstaSelecionado } = useContext(IngredientesContext)

    const ingrediente = { id: 1, nome: "Tomate" }
    const estaSelecionado = ingredienteEstaSelecionado(ingrediente)

    return <div data-testid="estaSelecionado">{estaSelecionado.toString()}</div>
  }

  const { getByTestId } = render(
    <IngredientesProvider>
      <TestComponent />
    </IngredientesProvider>
  )
  const estaSelecionado = getByTestId("estaSelecionado")

  expect(estaSelecionado.textContent).toBe("false")
})
