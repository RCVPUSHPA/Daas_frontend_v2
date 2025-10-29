import React, { useContext, useState, useEffect } from "react";
import { PoolContext } from "../../Context/PoolContext";
import CreateNewPool from "./CreateNewPool";
import ShowPools from "./ShowPools";
import ShowPoolsSkeleton from "./ShowPoolsSkeleton";
import "./css/Pools.css";

const Pools = () => {
  
  const pc = useContext(PoolContext);
 
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // Simulate an API call or data fetch
    const fetchPools = async () => {
      setIsLoading(true); // Set loading to true before starting data fetch
      try {
        // Simulate a delay for fetching data
        setIsLoading(false);

      } catch (error) {
      
        setIsLoading(false);
      }
    };

    fetchPools();
  }, []);

  return (
    // <div className="pools w-[98%] h-[86vh] flex-1 mx-auto bg-white rounded-lg p-4 shadow-md flex flex-col overflow-hidden">
    //   {!pc.isPoolAvailable ? (
    //     <div className="flex flex-col items-center justify-center">
    //       <img
    //         src={Loading}
    //         alt="Loading..."
    //         className="w-12 h-12 animate-spin" // Tailwind classes for loader image
    //       />
    //       <p className="mt-4 text-lg text-gray-600">Loading...</p>
    //     </div>
    //   ) : pc.isPoolAvailable ? (
    //     <ShowPools />
    //   ) : (
    //     <CreateNewPool />
    //   )}
    // </div>

<div className="pools-wrapper flex flex-col h-[90vh]  min-h-[75vh] w-[98%] m-auto mt-4 bg-white rounded-lg shadow-md overflow-hidden">
    <div className="overflow-y-auto">
      {isLoading ? (
        <ShowPoolsSkeleton />
      ) : pc.isPoolAvailable ? (
        <ShowPools />
      ) : (
        <CreateNewPool />
      )}
    </div>
  </div>
  );
};

export default Pools;
