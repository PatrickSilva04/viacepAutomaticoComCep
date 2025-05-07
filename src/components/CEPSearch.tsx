
import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CEPSearchProps {
  onSearch: (cep: string) => void;
  isLoading: boolean;
}

const CEPSearch = ({ onSearch, isLoading }: CEPSearchProps) => {
  const [cep, setCep] = useState('');

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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-grow">
        <Input
          type="text"
          value={cep}
          onChange={handleCEPChange}
          placeholder="Digite o CEP (apenas números)"
          className="pl-10 h-12 text-lg"
          maxLength={9}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={24} />
      </div>
      <Button 
        type="submit" 
        className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </Button>
    </form>
  );
};

export default CEPSearch;
