# Painel Interativo com Controles Gráficos

Este projeto consiste na criação de um painel interativo com elementos gráficos, controlado por um painel de controles estilizados. O objetivo é permitir que o usuário altere diversos aspectos visuais da interface de forma dinâmica.

## Funcionalidades

- O painel gráfico será representado por uma `div` contendo outros elementos visuais.
- Um painel de controle composto por formulários e/ou botões permitirá alterações no painel gráfico.
- As alterações de valores e posições nos controles afetam o conteúdo gráfico em tempo real, permitindo modificações como:
  - Cor de fundo, borda, texto, figuras, etc.
  - Tamanho de elementos e sua posição.
  
### Requisitos

- **Mínimo de 5 aspectos gráficos alteráveis** no painel.
- **Pelo menos uma alteração de tamanho** de elemento.
- **Pelo menos uma alteração em um elemento textual**.
- O formulário de controle e o painel gráfico devem estar na **mesma página**. 
- As alterações feitas nos controles devem ser refletidas imediatamente no painel gráfico.
- Deve-se prever e prevenir erros do usuário (como impedir entradas inválidas, limitar opções, desabilitar campos já preenchidos, etc.).
- O design visual deve ser cuidadoso, com uso de títulos, bordas, fundos e cores apropriadas.

### Responsividade e Validação

- O gadget deve ser **responsivo**, funcionando adequadamente tanto em **desktop** quanto em **dispositivos móveis**.
- O código HTML deve passar pelo validador da W3C (https://validator.w3.org/) sem erros.
- O console JavaScript dos navegadores **não deve apresentar erros**.

### Tecnologias

- Utilização de **HTML, CSS, JavaScript**.
- Uso de **CSS frameworks** como Bootstrap (ou outro) para garantir um bom visual.
- Manipulação de eventos em tempo real utilizando o evento `input` do JavaScript e o campo `range` no HTML para dinâmica fluida.

## Estrutura Base

O projeto pode seguir a estrutura básica fornecida nos arquivos:
- **`11painel.html`**: Exemplo de estrutura básica de controle e painel com eventos dinâmicos.
- **`10classlist.html`**: Exemplo de interação com botões para alterações no painel com código otimizado.

## Dicas para Ponto Extra

- As interações gráficas não precisam ter uma utilidade prática, porém, **se conseguir criar uma lógica interessante ou uma utilidade real** para o painel e o controle, poderá ser concedido um ponto extra. Exemplos incluem:
  - Simulação de análise de dados estatísticos.
  - Construção dinâmica de uma interface visual (como a fachada de uma casa).

## Como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
