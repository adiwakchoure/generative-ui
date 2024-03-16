"use client"

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { BackgroundBeamsDemo } from '@/components/home-components';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function GridBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
}

export default function Mentat() {
  const { data, error } = useSWR('/api/health', fetcher);
  const [postData, setPostData] = useState(null);
  const [inputUrl, setInputUrl] = useState('');
  const [latency, setLatency] = useState(0); // Added latency state

  const pingHealthEndpoint = async () => {
    const startTime = performance.now(); // Start measuring latency
    const response = await fetch('/api/health');
    const endTime = performance.now(); // Stop measuring latency
    const newData = await response.json();
    setPostData(newData);
    mutate('/api');
    setLatency(endTime - startTime); // Update latency state
  };

  const sendData = async () => {
    const startTime = performance.now(); // Start measuring latency
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: inputUrl }),
    });
    const endTime = performance.now(); // Stop measuring latency
    const newData = await response.json();
    setPostData(newData);
    mutate('/api');
    setLatency(endTime - startTime); // Update latency state
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      
      <BackgroundBeamsDemo/>
      
      <h1 className="text-4xl mb-4">Mentat</h1>
      {/* <MultiStepLoader
        loadingStates={[
          { text: "Loading step 1" },
          { text: "Loading step 2" },
          { text: "Loading step 3" }
        ]}
        loading={true}
        duration={2000}
        loop={false}
      /> */}
      <div className='p-4 flex flex-row gap-12'>
        <div className="flex flex-col items-center">
          <button 
            className="px-4 py-2 mb-4 bg-blue-500 text-white rounded" 
            onClick={pingHealthEndpoint}
          >
            Ping Health Endpoint
          </button>
          <div className="p-4 bg-gray-800 rounded max-w-32">
            <h2 className="text-2xl mb-2">Received Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <input 
            type="text" 
            placeholder="Enter URL" 
            value={inputUrl} 
            onChange={e => setInputUrl(e.target.value)} 
            className="mb-4 px-2 py-1 rounded text-black"
          />
          <button 
            className="px-4 py-2 mb-4 bg-green-500 text-white rounded" 
            onClick={sendData}
          >
            Send Data
          </button>
          <div className="p-4 bg-gray-800 rounded max-w-32">
            <h2 className="text-2xl mb-2">Posted Data:</h2>
            {postData && (
              <pre>{JSON.stringify(postData, null, 2)}</pre>
            )}
          </div>
          <div className="p-4 bg-gray-800 rounded max-w-32">
            <h2 className="text-2xl mb-2">Latency:</h2>
            <p>{latency} ms</p> {/* Display latency */}
          </div>
        </div>
      </div>
    </main>
  );
}