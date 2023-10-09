import { render, fireEvent } from "@testing-library/react"
import TagIngrediente from "./index"

test("Renderiza o componente TagIngrediente com texto correto", () => {
  // Renderiza o componente com um ingrediente específico
  const { getByText } = render(
    <TagIngrediente ingrediente={{ nome: "Teste" }} ativo={true} />
  )

  // Verifica se o texto do ingrediente é renderizado corretamente
  const botaoAtivo = getByText("Teste")
  expect(botaoAtivo).toBeInTheDocument()
})

test("Chama a função de clique quando o botão é clicado", () => {
  // Função de clique simulada
  const onClick = vi.fn()

  // Renderiza o componente com a função de clique definida
  const { getByText } = render(
    <TagIngrediente
      ingrediente={{ nome: "Teste" }}
      ativo={true}
      onClick={onClick}
    />
  )

  // Simula um clique no botão
  const botaoAtivo = getByText(/Teste/)
  fireEvent.click(botaoAtivo)

  // Verifica se a função de clique foi chamada
  expect(onClick).toHaveBeenCalled(1)
})


test("Snapshot do botão ativo", () => {
  const { asFragment } = render(
    <TagIngrediente
      ingrediente={{ nome: "Teste Ativo" }}
      ativo={true}
      onClick={() => {}}
    />
  )

  // Captura o snapshot do botão ativo
  const buttonSnapshot = asFragment()

  // Compara o snapshot com o snapshot anterior
  expect(buttonSnapshot).toMatchSnapshot()
})

test("Snapshot do botão inativo", () => {
  const { asFragment } = render(
    <TagIngrediente
      ingrediente={{ nome: "Teste Inativo" }}
      ativo={false}
      onClick={() => {}}
    />
  )

  // Captura o snapshot do botão inativo
  const buttonSnapshot = asFragment()

  // Compara o snapshot com o snapshot anterior
  expect(buttonSnapshot).toMatchSnapshot()
})