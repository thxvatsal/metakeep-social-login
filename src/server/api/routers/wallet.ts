import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
import { type GetWalletResponse } from "~/lib/metakeep";
import { env } from "~/env";

export const walletRouter = createTRPCRouter({
  getWallet: protectedProcedure
    .input(z.object({ emailId: z.string().nullish() }))
    .query(async ({ input }) => {
      try {
        if (!input.emailId) {
          return {
            wallet: undefined,
          };
        }
        const { data } = await axios.request<GetWalletResponse>({
          method: "POST",
          url: "https://api.metakeep.xyz/v3/getWallet",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": env.METAKEEP_API_KEY,
          },
          data: {
            user: {
              email: input.emailId,
            },
          },
        });

        if (data.status !== "SUCCESS" || !data.wallet) {
          return {
            wallet: undefined,
          };
        }

        return {
          wallet: data.wallet.ethAddress,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          return;
        }
        console.error(error);
      }
    }),
});
