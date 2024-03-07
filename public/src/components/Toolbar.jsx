import React, { useState, useEffect } from "react";

export const Toolbar = () => {
  const [instanceId, setInstanceId] = useState("pod");

  useEffect(() => {
    updateInstanceId();
  }, []);

  function updateInstanceId() {
    fetch("/hostname")
      .then((res) => res.json())
      .then((data) => {
        setInstanceId(data.data);
      })
      .catch((err) => console.log(err));
  }

  function simulateCrash() {
    fetch("/simulate-crash")
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));
    window.alert("Server has crash");
  }

  return (
    <div className="p-[10px] gap-[10px] flex flex-wrap justify-between items-center rounded-lg bg-white shadow-sm">
      <div className="text-lg flex-1 text-center md:text-left">
        Instance ID: {instanceId}
      </div>
      <div className="text-lg flex-3  text-center md:text-left">
        {window.location.hostname}
      </div>
      <div className="flex-1 text-center md:text-right">
        <button
          className="bg-red-500 w-max text-white p-[10px] shadow-lg rounded-md hover:bg-red-700"
          onClick={simulateCrash}
        >
          Simulate Crash Server
        </button>
      </div>
    </div>
  );
};
