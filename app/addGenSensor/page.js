"use client";
import { useEffect, useState } from "react";
import { addGenStation } from "../../utils";
import NavBar from "@/components/Navbar";
function AddGenSensor() {
  const [code, setCode] = useState("");
  function handleAddSensor() {
    addGenStation(code);
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="mt-40 text-center border w-1/2 ml-96 rounded-lg pt-5 pb-5">
        <label className="text-3xl" htmlFor="">
          Enter Secret Code
        </label>
        <br />
        <input
          className="text-black text-2xl font-semibold h-8 w-64 mt-10 rounded-md"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            //console.log(code);
          }}
          type="text"
        />

        <button
          className="border ml-8 px-5 py-1 text-white font-bold rounded-xl hover:bg-white hover:text-black"
          onClick={() => {
            handleAddSensor();
          }}
        >
          ADD
        </button>

        <p className="text-xl mt-24">
        &quot; Add sensors to make sure their reportings are added to your account
        &quot;
        </p>
      </div>
    </>
  );
}
export default AddGenSensor;
