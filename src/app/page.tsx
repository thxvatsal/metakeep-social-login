import { useSession } from "next-auth/react";
import SignInButton from "~/components/layouts/SignInButton";
import WalletDisplay from "~/components/layouts/WalletDisplay";
import { cn } from "~/lib/utils";


export default function Home() {
  const {data} = useSession({
    required: true,
  
  })

  return (
      <main className={cn("h-screen w-screen flex justify-center items-center bg-background")}>
        {!data ? <SignInButton />: <WalletDisplay session={data} />}
      </main>
  );
}


