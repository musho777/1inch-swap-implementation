import React from "react";
import { useSwap1Inch } from "@/hooks/one-inch.ts";

const SwapComponent = () => {
  const { swap1Inch } = useSwap1Inch() || {};

  const handleSwap = async () => {
    try {
      const result = await swap1Inch();
      if (result) {
      } else {
        console.error("Swap failed or cancelled.");
      }
    } catch (error) {
      console.error("Error during swap:", error);
    }
  };

  return (
    <button onClick={() => handleSwap()}>
      Swap Tokens
    </button>
  );
};

export default SwapComponent;
