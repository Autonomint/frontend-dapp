"use client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



const Charts: React.FC<{ chartData: string[],height?:number }> = ({ chartData,height=400 }) => {
  let currentDate = new Date();
// Create a new array of objects with name and price properties:
const data = chartData.map((price) => {
  let name;

  name = String(currentDate.getDate());

  currentDate.setDate(currentDate.getDate() - 1);

  return { name, price };
});
  return (
    <ResponsiveContainer style={{marginLeft:"-20px"}} width="100%" height={height}>
      <LineChart data={data}>
        <Line
          style={{
            filter:
              "drop-shadow(0px 2px 4px rgba(0, 110, 255, 0.98)) drop-shadow(0px 8px 8px rgba(0, 110, 255, 0.85)) drop-shadow(0px 18px 11px rgba(0, 110, 255, 0.50)) drop-shadow(0px 32px 13px rgba(0, 110, 255, 0.15)) drop-shadow(0px 49px 14px rgba(0, 110, 255, 0.02))",
          }}
          type="monotone"
          dataKey="price"
          stroke="#041A50"
        />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis dataKey="price"/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Charts;
