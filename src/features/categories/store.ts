import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CategoryType = "fixed" | "variable";

export type Category = {
  id: string;
  name: string;
  type: CategoryType;
};

export const DEFAULT_CATEGORIES: Category[] = [
  // Fijos
  { id: "RENT", name: "Alquiler", type: "fixed" },
  { id: "ELECTRICITY", name: "Luz", type: "fixed" },
  { id: "WATER", name: "Agua", type: "fixed" },
  { id: "INTERNET", name: "Internet", type: "fixed" },
  { id: "SUSCRIPTIONS", name: "Suscripciones", type: "fixed" },
  { id: "INSURANCE", name: "Seguros", type: "fixed" },
  { id: "SERVICES", name: "Servicios", type: "fixed" },
  // Variables
  { id: "SUPERMARKET", name: "Supermercado", type: "variable" },
  { id: "FOOD", name: "Comida", type: "variable" },
  { id: "TRANSPORT", name: "Transporte", type: "variable" },
  { id: "HEALTH", name: "Salud", type: "variable" },
  { id: "PHARMACY", name: "Farmacia", type: "variable" },
  { id: "ENTERTAINMENT", name: "Entretenimiento", type: "variable" },
  { id: "OTHERS", name: "Otros", type: "variable" },
  { id: "PETS", name: "Mascotas", type: "variable" },
  { id: "BEAUTY", name: "Belleza", type: "variable" },
];

type CategoriesActions = {
  add: (name: string, type: CategoryType) => string;
};

export type CategoriesStore = {
  categories: Category[];
  actions: CategoriesActions;
};

export const useCategoriesStore = create<CategoriesStore>()(
  persist(
    (set) => ({
      categories: DEFAULT_CATEGORIES,
      actions: {
        add: (name, type) => {
          const id = crypto.randomUUID();
          set((state) => ({
            categories: [...state.categories, { id, name, type }],
          }));
          return id;
        },
      },
    }),
    {
      name: "categories-store",
      partialize: (state) => ({ categories: state.categories }),
    }
  )
);
