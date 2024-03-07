import { formatarParaBRL } from "../../../../utils/formataParaBRL";
import { CarrinhoProps } from "../../../../stores/carrinho/carrinho-slice-store";


interface Props{
    carrinho: CarrinhoProps[],
    valorTotal: number,
    nomeCliente: String
    enderecoEntrega: String
}

export function criaMensagemPedido({carrinho, valorTotal, nomeCliente, enderecoEntrega}: Props) {
    const produtosMsg = carrinho
    .map((produto) => `\n${produto.quantidade}x ${produto.nome}`)
    .join("");

  const mensagem =   `🍔 NOVO PEDIDO 🍔    
${nomeCliente ? `Cliente: ${nomeCliente}\n` : ''}${produtosMsg}
    
Valor Total: ${formatarParaBRL(valorTotal)}

${enderecoEntrega ? `Endereço de entrega: ${enderecoEntrega}` : ''}`;

return mensagem
}