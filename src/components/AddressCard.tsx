
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
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

interface AddressCardProps {
  data: AddressData | null;
}

const AddressCard = ({ data }: AddressCardProps) => {
  const isMobile = useIsMobile();
  
  if (!data) return null;

  const displayLabels: Record<string, string> = {
    cep: "CEP",
    logradouro: "Logradouro",
    complemento: "Complemento",
    bairro: "Bairro",
    localidade: "Cidade",
    uf: "Estado",
    ddd: "DDD"
  };

  const fieldsToShow = Object.keys(displayLabels).filter(
    key => data[key] && data[key]?.trim() !== ''
  );

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 md:py-6">
        <div className="flex items-center gap-2">
          <MapPin size={isMobile ? 20 : 24} />
          <CardTitle className={isMobile ? "text-xl" : "text-2xl"}>Informações do Endereço</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6">
        <div className="space-y-2 md:space-y-3">
          {fieldsToShow.map(key => (
            <div key={key} className="flex border-b pb-2">
              <span className={`font-medium text-gray-700 ${isMobile ? 'min-w-[90px]' : 'min-w-[120px]'}`}>
                {displayLabels[key]}:
              </span>
              <span className="text-gray-800">{data[key]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
