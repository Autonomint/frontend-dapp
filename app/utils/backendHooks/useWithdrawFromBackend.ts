import { BACKEND_API_URL } from "@/constants/BackendUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type withdrawData = {
  address: `0x${string}` | undefined;
  index: number;
  chainId: number;
  borrowDebt: string;
  withdrawTime: string;
  withdrawAmount: string;
  amountYetToWithdraw: string;
  noOfAbond: string;
};

async function withdrawFromBackend(data: withdrawData) {
  let bodyValue = JSON.stringify({
    ...data,
  });
  console.log(bodyValue);
  const response = await fetch(`${BACKEND_API_URL}/borrows/withdraw`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: bodyValue,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}


