import { useContext } from "react";
import ContaContext from "./ContaContext";

export const useConta = () => {
  const context = useContext(ContaContext);
  if (!context) {
    throw new Error("useConta deve ser usado dentro de um ContaProvider");
  }
  return context;
};