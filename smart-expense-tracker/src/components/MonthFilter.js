import { useState } from "react";

function MonthFilter({ setMonth }) {
  return (
    <input
      type="month"
      onChange={(e) => setMonth(e.target.value)}
      className="border p-1 rounded"
    />
  );
}

export default MonthFilter;
