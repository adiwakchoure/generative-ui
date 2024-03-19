"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { forum } from "@/app/fonts";

import { BackgroundBeams } from "@/components/ui/background-beams";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { MultiStepLoader } from '@/components/ui/multi-step-loader';

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function InputWithButton() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingStates = [
    { text: `Searching for: "${searchTerm}"...` },
    { text: "Preparing search..." },
    { text: "Retrieving results..." },
  ];

  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();

  const { data, isLoading } = useSWR(
    searchTerm ? `https://mentat-backend.fly.dev/query?query=${encodeURIComponent(searchTerm)}` : null,
    fetcher
  );

  const handleSearch = async () => {
  if (searchTerm.trim() === "") return;
  setLoading(true);

  const response = await fetch(`http://localhost:8000/query/send?query=${encodeURIComponent(searchTerm)}`, {
    method: 'POST',
  });

  if (response.ok) {
    const data = await response.json();
    const ulid = data;
    router.push(`/chat?query=${ulid}`);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     router.push(`/chat`);
  //   }
  // }, [data, router, pathname]);

  return (
    <div className="flex flex-row w-full max-w-md items-center space-x-2">
      <Input
        type="text"
        placeholder="Find out more about an AI company called Madeline & Co."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="bg-white text-gray-800 border-purple-800 focus:border-purple-800 flex-1 min-w-full"
      />
      <Button
        type="button"
        variant="outline"
        color="purple"
        onClick={handleSearch}
        className="w-16"
      >
        Search
      </Button>
      {loading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={true}
          duration={2000}
          loop={true}
        />
      )}
    </div>
  );
}

function SearchUI() {
  return (
    <div className="h-screen w-full bg-white antialiased grid place-items-center">
      <div className="max-w-2xl z-50 flex flex-col items-center">
        <h2 className={`pt-8 pb-4 ${forum.className} z-10 text-2xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-purple-800 to-violet-950 text-center font-bold`}>
          Mentat
        </h2>
        <h1 className="z-10 text-2xl md:text-5xl mb-4 text-gray-700 text-center font-bold">
          Market Research, Redefined.
        </h1>
        <h3 className="z-10 text-2xl md:text-xl mb-12 text-gray-500 text-center font-bold">
          Automate the drudgery of research. Enter the name of a company & sector or just ask a question to get AI-powered, verifiable insights!
        </h3>
        <InputWithButton />
      </div>
      <div className="z-10">
        <BackgroundBeams />
      </div>
    </div>
  );
}

export default function Mentat() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <SearchUI/>
    </main>
  );
}