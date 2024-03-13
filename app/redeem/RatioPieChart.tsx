"use client";
import React, { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  { start: "#fff", end: "#72FFB4" },
  { start: "#fff", end: "#fff" },
];
const COLORS2 = [
  { start: "#00B655", end: "#93F3BA" },
  { start: "#E4E4E4", end: "#BBBBBB" },
];

const data = [
  { name: "1", value: 0 },
  { name: "2", value: 0 },
];
interface RatioPieChartProps {
  collaterals: string;
  dcds: string;
}

const RatioPieChart:React.FC<RatioPieChartProps> = ({collaterals,dcds}) => {
  useEffect(() => {
    data[0].value = Number(collaterals);
    data[1].value = Number(dcds);
    console.log(data)
  }, [collaterals, dcds]);
  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width={"100%"}>
        <PieChart margin={{ bottom: -157 }}>
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
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            blendStroke
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-0 w-full h-full">
        <ResponsiveContainer width={"100%"}>
          <PieChart margin={{ bottom: -157 }}>
            <defs>
              {data.map((entry, index) => (
                <linearGradient id={`myGradient2${index}`}>
                  s
                  <stop
                    offset="0%"
                    stopColor={COLORS2[index % COLORS2.length].start}
                  />
                  <stop
                    offset="100%"
                    stopColor={COLORS2[index % COLORS2.length].end}
                  />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={130}
              blendStroke
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#myGradient2${index})`}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default RatioPieChart;
