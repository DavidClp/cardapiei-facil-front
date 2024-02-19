export function formatarParaBRL(valor) {
    // Verifique se o valor é um número válido
    if (typeof valor !== 'number' || isNaN(valor)) {
      return 'Valor inválido';
    }
  
    // Arredonde o valor para duas casas decimais
    valor = valor.toFixed(2);
  
    // Separe as partes inteira e decimal
    const partes = valor.split('.');
  
    // Adicione pontos para separar as milhares
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Retorne o valor formatado com o símbolo "R$"
    return `R$ ${partes.join(',')}`;
}