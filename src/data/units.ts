export type StoreUnit = {
  id: string;
  name: string;
  address: string;
  hours: string;
  locationUrl?: string;
};

export const storeUnits: StoreUnit[] = [
  {
    id: "centro",
    name: "Unidade Centro",
    address: "Endereço a definir",
    hours: "Horário a definir",
  },
  {
    id: "unidade-2",
    name: "Unidade 2",
    address: "Endereço a definir",
    hours: "Horário a definir",
  },
];
