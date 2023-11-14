"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  { start: "#00C2FF", end: "#D4F5FF" },
  { start: "#fff", end: "#72FFB4" },
];

const data = [
  { name: "1", value: 75 },
  { name: "2", value: 25 },
];

const RatioChart = () => {
  return (
    <ResponsiveContainer width={"100%"}>
      <PieChart  style={{height:"117px"}}>
        <defs>
          {data.map((entry, index) => (
            <linearGradient id={`myGradient${index}`}>
              <stop
                offset="0%"
                stopColor={COLORS[index % COLORS.length].start}
              />
              <stop
                offset="100%"
                stopColor={COLORS[index % COLORS.length].end}
              />
            </linearGradient>
          ))}
        </defs>
        <Pie style={{height:"117px"}} data={data} dataKey="value" startAngle={180} endAngle={0}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default RatioChart;
