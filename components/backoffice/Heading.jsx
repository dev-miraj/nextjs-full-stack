import React from "react";

export default function Heading({ title }) {
  return (
    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-50">
      {title}
    </h2>
  );
}
