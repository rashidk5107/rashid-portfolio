import React, { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }

    setAge(calculatedAge);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-3">
      <h2 className="text-xl font-semibold mb-3">Age Calculator</h2>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <button
        onClick={calculateAge}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Calculate Age
      </button>
      {age !== null && (
        <p className="mt-3 text-lg">
          You are <span className="font-bold">{age}</span> years old.
        </p>
      )}
    </div>
  );
}
