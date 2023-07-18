import { useEffect, useState } from "react";
import { Cino, CinoConfig } from "cino-core";
import { createModel } from "./basic/use-model";

export function useCino() {
  const [cino, setCino] = useState<Cino>();
  useEffect(() => {
    const cinoInstance = Cino.getInstance();
    setCino(cinoInstance);
  }, []);

  return {
    cino,
  };
}

export const CinoModel = createModel(useCino);
