
export interface CEPResponse {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
  [key: string]: string | boolean | undefined;
}

export const fetchAddressByCEP = async (cep: string): Promise<CEPResponse> => {
  // Remove any non-numeric characters
  const cleanCEP = cep.replace(/\D/g, '');
  
  if (cleanCEP.length !== 8) {
    throw new Error('CEP deve conter 8 dígitos');
  }
  
  try {
    // First API: ViaCEP
    const viaCEPResponse = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    const viaCEPData = await viaCEPResponse.json();
    
    // Check if ViaCEP returned an error
    if (viaCEPData.erro) {
      // Second API: APIcep as fallback
      const apiCEPResponse = await fetch(`https://cdn.apicep.com/file/apicep/${cleanCEP.slice(0, 5)}-${cleanCEP.slice(5)}.json`);
      const apiCEPData = await apiCEPResponse.json();
      
      if (apiCEPData.status === 200) {
        return {
          cep: apiCEPData.code,
          logradouro: apiCEPData.address,
          bairro: apiCEPData.district,
          localidade: apiCEPData.city,
          uf: apiCEPData.state
        };
      } else {
        throw new Error('CEP não encontrado');
      }
    }
    
    return viaCEPData;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error;
  }
};
