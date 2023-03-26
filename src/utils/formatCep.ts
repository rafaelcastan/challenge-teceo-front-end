export function formatCep(cep: string) {
  cep = cep.replace(/\D/g, ""); // Remove tudo que não for dígito
  cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2"); // Adiciona o traço entre o quinto e sexto dígitos

  return cep;
}
