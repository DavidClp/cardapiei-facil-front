import { formatarParaBRL } from "../../../../utils/formataParaBRL";
import { useStore } from "../../../../stores/bound";
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

${enderecoEntrega ? `Endereço entrega: ${enderecoEntrega}` : ''}`;

return mensagem
}