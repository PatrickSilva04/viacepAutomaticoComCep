
import { useState } from 'react';
import { toast } from 'sonner';
import CEPSearch from '@/components/CEPSearch';
import AddressCard from '@/components/AddressCard';
import { fetchAddressByCEP, CEPResponse } from '@/services/cepService';
import { useIsMobile } from '@/hooks/use-mobile';

interface AddressData {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ddd?: string;
  [key: string]: string | undefined;
}

const Index = () => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const handleSearch = async (cep: string) => {
    setIsLoading(true);
    try {
      const data = await fetchAddressByCEP(cep);
      if (data.erro) {
        toast.error('CEP não encontrado');
        setAddressData(null);
      } else {
        // Convert CEPResponse to AddressData
        const addressData: AddressData = {
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          ddd: data.ddd
        };
        setAddressData(addressData);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao buscar CEP');
      setAddressData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="text-center mb-6 md:mb-10">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-blue-800 mb-3 md:mb-4`}>
            Buscador de CEP
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Digite um CEP válido para obter informações detalhadas sobre o endereço.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
          <CEPSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center p-6 md:p-12">
            <div className="animate-pulse text-blue-600 text-lg md:text-xl">Buscando informações...</div>
          </div>
        ) : (
          <div className={`transition-all duration-500 ${addressData ? 'opacity-100' : 'opacity-0'}`}>
            {addressData && <AddressCard data={addressData} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
