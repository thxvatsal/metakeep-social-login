import SignInButton from "~/components/layouts/SignInButton";
import WalletDisplay from "~/components/layouts/WalletDisplay";
import { cn } from "~/lib/utils";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
      <main className={cn("h-screen w-screen flex justify-center items-center bg-background")}>
        {!session ? <SignInButton />: <WalletDisplay session={session} />}
      </main>
  );
}


