export async function obterDadosViaCEP(cep) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET'
    });

    const dadosCEP = await resposta.json();

    if (dadosCEP.erro) {
      return false;
    }

    return dadosCEP;
  } catch (error) {
    return false;
  }
}