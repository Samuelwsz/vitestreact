import React from "react"
import { render, fireEvent } from "@testing-library/react"
import CardIngrediente from "./index"
import { IngredientesContext } from "../IngredientesContext"

describe("CardIngrediente Component", () => {
  const categoria = {
    nome: "Exemplo Categoria",
    icone: "caminho/para/icone.svg",
    ingredientes: [
      { id: 1, nome: "Ingrediente 1" },
      { id: 2, nome: "Ingrediente 2" },
    ],
  }

  it("should render the category name", () => {
    const { getByText } = render(<CardIngrediente categoria={categoria} />)
    expect(getByText("Exemplo Categoria")).toBeInTheDocument()
  })

  it("should render the category icon", () => {
    const { getByRole } = render(<CardIngrediente categoria={categoria} />)
    expect(getByRole("img")).toHaveAttribute("src", "caminho/para/icone.svg")
  })

  it("should render ingredients", () => {
    const { getByText } = render(<CardIngrediente categoria={categoria} />)
    expect(getByText("Ingrediente 1")).toBeInTheDocument()
    expect(getByText("Ingrediente 2")).toBeInTheDocument()
  })

  it("should call alternarIngrediente when an ingredient is clicked", () => {
    const mockAlternarIngrediente = vi.fn()
    const { getByText } = render(<CardIngrediente categoria={categoria} />, {
      wrapper: (props) => (
        <IngredientesContext.Provider
          value={{
            alternarIngrediente: mockAlternarIngrediente,
            ingredienteEstaSelecionado: () => false,
          }}
        >
          {props.children}
        </IngredientesContext.Provider>
      ),
    })
    const ingrediente1 = getByText("Ingrediente 1")
    fireEvent.click(ingrediente1)
    expect(mockAlternarIngrediente).toHaveBeenCalledWith(
      categoria.ingredientes[0]
    )
  })
})
