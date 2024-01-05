"use client"
import { type Session } from 'next-auth';
import React, { useEffect } from 'react'
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';
import SignOutButton from './SignOutButton';
import { Button } from '../ui/button';
import { MetaKeep } from 'metakeep';
import { env } from '~/env';

const WalletDisplay: React.FC<{
    session: Session | null
}> = ({session}) => {
    const [signature, setSignature] = React.useState<string>("")
    const [sdk, setSdk] = React.useState<MetaKeep | null>(null)

    const {data, isLoading} = api.wallets.getWallet.useQuery({emailId: session?.user.email})

    useEffect(()=> {
      const sdk = new MetaKeep({
      appId: env.NEXT_PUBLIC_METAKEEP_APP_ID,
      user: {
        email: session?.user.email,
        },
      });
      setSdk(sdk)
    }, [session?.user.email])


    const signMessage = async (message: string, reason: string) => {
      if (!sdk) return
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const r = (await sdk.signMessage(message, reason)) as {
        signature: string;
        status: string;
        r?: string;
        s?: string;
        v?: string;
      };

      console.log(r)

      setSignature(r.signature)
      // setTimeout(() => {
      //   setSignature("")
      // }, 10000);

    }


    return (
    <div className={cn("flex flex-col justify-center items-start gap-4 p-4 bg-primary-foreground")}>
        <span>Welcome, {session?.user.name}</span>
        <span>Email: {session?.user.email}</span>
        <span>Wallet: <b>{!isLoading ? data?.wallet : "Loading ..."}</b></span>
        <div className={cn("flex flex-col justify-center gap-2")}>
          <Button variant='default' className='text-white' onClick={() => signMessage( "Hello world!", "testing")}>
            Sign Message
          </Button>
          <span className='truncate max-w-50%'>{signature}</span>
        </div>
        <div className={cn("w-full flex justify-end")}>
          <SignOutButton />
        </div>
    </div>
  )
}

export default WalletDisplay