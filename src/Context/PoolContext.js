
import React, { createContext, useState, useEffect } from "react";
 
import axiosInstance from "Services/AxiosInstane";

import { getEnv } from "utils/getEnv";

export const PoolContext = createContext();
const backendUrl = getEnv('BACKEND_URL');
 
const PoolContextProvider = ({ children, token, tokenParsed }) => {
  let [isPoolAvailable, setIsPoolAvailable] = useState(false);
  let [availablePools, setAvailablePools] = useState([]);
  let [users, setUsers] = useState([]);
  let [isClusterAvailable, setIsClusterAvailable] = useState(false);
  let [availableClusters, setAvailableClusters] = useState([]);
  let [isDomainAvailable, setisDomainAvailable] = useState(false);
  let [availableDomains, setAvailableDomains] = useState([]);
  let getPools = () => {
  
 
    axiosInstance
      .get(`${backendUrl}/v1/pools`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((res) => {
       
        if (res.data && res.data.data && res.data.data.length > 0) {
          setIsPoolAvailable(true);
          setAvailablePools(res.data?.data);
        } else {
          setIsPoolAvailable(false);
          setAvailablePools([]);
        }
      })
      .catch((err) => {
        setIsPoolAvailable(false);
        setAvailablePools([]);
      });
  };
  let getClusters = () => {
    axiosInstance
      .get(
        `${backendUrl}/v1/clusters`,
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setIsClusterAvailable(true);
          setAvailableClusters(res.data?.data);
        } else {
          setIsClusterAvailable(false);
          setAvailableClusters([]); 
        }
      })
      .catch((err) => {
        setIsClusterAvailable(false);
        setAvailableClusters([]);
      });
  };
  
  let getDomains = () => {
    axiosInstance.get(`${backendUrl}/v1/ldaps`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.data?.data && res.data?.data.length > 0) {
        setisDomainAvailable(true);
        setAvailableDomains(res.data?.data);
      } else {
        setisDomainAvailable(false);
        setAvailableDomains([]);
      }
    }).catch((err) => {
      setisDomainAvailable(false);
      setAvailableDomains([]);
    });
  };
  
  useEffect(() => {
    if (token) {
      getPools();
      getClusters();
      getDomains();
    }
  }, [token]);
  let value = {
    isPoolAvailable: isPoolAvailable,
    setIsPoolAvailable: setIsPoolAvailable,
    availablePools: availablePools,
    setAvailablePools: setAvailablePools,
    users: users,
    setUsers: setUsers,
    isClusterAvailable: isClusterAvailable,
    setIsClusterAvailable: setIsClusterAvailable,
    availableClusters: availableClusters,
    setAvailableClusters: setAvailableClusters,
    getClusters: getClusters,
    getPools: getPools,
    isDomainAvailable: isDomainAvailable,
    setisDomainAvailable: setisDomainAvailable,
    availableDomains: availableDomains,
    setAvailableDomains: setAvailableDomains,
    token: token,
    tokenParsed: tokenParsed
  };
  
  return (
    <PoolContext.Provider value={value}>
      {children}
    </PoolContext.Provider>
  );
};
 
export default PoolContextProvider;
