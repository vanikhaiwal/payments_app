
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Balance() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/account/getbalance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching balance", err);
      }
    };

    fetchBalance();
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-left h-full p-4 ml-4 mt-4 ">
      <h2 className="text-[30px] font-bold text-gray-800">
        {userData.firstName?.toUpperCase()} {userData.lastName?.toUpperCase()}
      </h2>
      <p className="text-2xl font-bold text-gray-700 mt-2">
        Balance : ₹ {Math.floor(userData.balance)}
      </p>
    </div>
  );
}
