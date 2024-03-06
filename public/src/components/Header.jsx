import { useEffect, useState } from "react";

export const Header = () => {
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
    <div className="p-[20px] flex justify-between items-center rounded-lg bg-white shadow-sm">
      <div className="text-xl">
        <h1>Instance ID: {instanceId}</h1>
      </div>
      <div className="text-3xl  text-center">
        <h1>Welcome to your Heritage</h1>
      </div>
      <button className="bg-red-500 text-white p-[10px] shadow-lg hover:bg-red-700" onClick={simulateCrash}>
        Simulate Crash Server
      </button>
    </div>
  );
};
