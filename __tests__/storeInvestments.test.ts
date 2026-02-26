import {
    useInvestmentStore,
    createInvestmentInitialData,
    INVESTMENT_STORE_STORAGE_KEY,
  } from "@/features/investment/store";
  import { InvestmentType, Currency } from "@/types/finance";
  
  beforeEach(() => {
    localStorage.removeItem(INVESTMENT_STORE_STORAGE_KEY);
  
    useInvestmentStore.setState(
      { ...createInvestmentInitialData(), actions: useInvestmentStore.getState().actions },
      true
    );
  });
  
  describe("Investment Store", () => {
    it("should add items when we call add", () => {
      const stateBefore = useInvestmentStore.getState();
      const prevLen = stateBefore.items.length;
  
      const newInvestment = {
        id: "1",
        name: "Test Investment",
        type: "ETF" as InvestmentType,
        provider: "Test Provider",
        currency: "CLP" as Currency,
        investedAmount: 100000,
        currentValue: 100000,
        createdAt: "2026-02-01",
      };
  
      stateBefore.actions.add(newInvestment);
  
      const stateAfter = useInvestmentStore.getState();
      expect(stateAfter.items).toHaveLength(prevLen + 1);
      expect(stateAfter.items[stateAfter.items.length - 1]).toEqual(newInvestment);
    });
  });