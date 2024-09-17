'use client';

import Image from "next/image";
import { useAuthContext } from "./cognito-auth/cognito-auth-provider";
import { axiosClient } from "./axios/axios-client";

export default function Home() {

  const { user, signOut } = useAuthContext();

  const handleTestApiCall = async () => {
    const response = await axiosClient.get("/api/test");
    console.log(response);
    alert(JSON.stringify(response.data));
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl">Welcome <span>{user?.userName}</span></h1>
        <div className="flex gap-2">
          <button
            onClick={signOut}
            className="px-4 py-2 text-white bg-blue-500 rounded-md">
            Sign out
          </button>
          <button
            onClick={handleTestApiCall}
            className="px-4 py-2 text-white bg-slate-600 rounded-md">
            test api call
          </button>
        </div>
      </main>
    </div>
  );
}
