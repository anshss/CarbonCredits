"use client";
import { useEffect, useState } from "react";
import { addGenStation } from "../../utils";
import NavBar from '@/components/Navbar';
function addGenSensor() {
  const [code, setCode] = useState("");
  function handleAddSensor() {
    addGenStation(code);
  }
  return (
    <>
    <NavBar></NavBar>
    <div className="mt-96">
      <label htmlFor="">Enter Secret Code</label>
      <input
        className="text-black"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          //console.log(code);
        }}
        type="text"
      />
      <button
        onClick={() => {
          handleAddSensor();
        }}
      >
        ADD
      </button>
    </div>
    </>
  );
}
export default addGenSensor;
