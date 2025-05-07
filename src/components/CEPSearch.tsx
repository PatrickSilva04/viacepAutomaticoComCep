
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface CEPSearchProps {
  onSearch: (cep: string) => void;
  isLoading: boolean;
}

const CEPSearch = ({ onSearch, isLoading }: CEPSearchProps) => {
  const [cep, setCep] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cep.trim().length > 0) {
      onSearch(cep);
    }
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and format as users type
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 8) {
      // Format as 00000-000
      if (value.length <= 5) {
        setCep(value);
      } else {
        setCep(`${value.slice(0, 5)}-${value.slice(5)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 w-full`}>
      <div className="relative flex-grow">
        <Input
          type="text"
          value={cep}
          onChange={handleCEPChange}
          placeholder="Digite o CEP (apenas números)"
          className="pl-10 h-10 md:h-12 text-base md:text-lg"
          maxLength={9}
        />
        <Search className="absolute left-3 top-2.5 md:top-3 text-gray-400" size={isMobile ? 20 : 24} />
      </div>
      <Button 
        type="submit" 
        className={`h-10 md:h-12 px-4 md:px-6 ${isMobile ? 'w-full' : ''} bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all`}
        disabled={isLoading}
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </form>
  );
};

export default CEPSearch;
