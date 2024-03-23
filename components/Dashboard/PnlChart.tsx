import React, { PureComponent, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Text } from 'recharts';


import chartuparrow from "@/app/assets/chartuparrow.svg";
import Image from 'next/image';
interface DataPoint {
  name: string;
  uv?: number;
  amt?: number;
}





interface CustomTickProps {
  x: number;
  y: number;
  payload: any;
}

const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
  // Assuming you want to display 'amt' and 'uv' values
  const amtValue = payload.value; // Assuming 'value' corresponds to 'amt'
  const uvValue = payload.uv; // Accessing 'uv' from the payload




  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} fill="#666" fontSize={11} >
        <tspan textAnchor="middle" x="0">
          {amtValue}
        </tspan>
        <tspan dy={12} dx={-18}>{uvValue}</tspan>
      </text>
    </g>
  );
};

const CustomTooltip: React.FC<{ active?: boolean; payload?: any }> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].payload.name}</p>
      </div>
    );
  }
  return null;
};


const PnlChart: React.FC<{ currentPrice: number, collateralAmount: number, strikePrice: number }> = ({ currentPrice, collateralAmount, strikePrice }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data: DataPoint[] = [
    {
      name: "Page A",
      uv: 1500,
    },
    {
      name: "Page B",
      uv: 1500,
      amt: 22
    },
    {
      name: "Page C",
      uv: 1500,
    },
    {
      name: "Page D",
      uv: 1500,
    },
    {
      name: "Page D",
      uv: 1500,
    },
    {
      name: "Page D",
      uv: 1500,
      amt: 22
    },
   // add more data points here based on strike price (strike price is  1-5)
    {
      name: "Page E",
    },
  
    {
      name: "Page G",
      uv: 1500,
      amt: 25
    },
    {
      name: "Page G",
      uv: 2000,
      amt: 25
    },
    {
      name: "Page G",
      uv: 2500,
    },
    {
      name: "Page G",
      uv: 3000,
    },
    {
      name: "Page G",
      uv: 3500,
    },
    {
      name: "Page G",
      uv: 4000,
    },
  ];
  const newPageEData: DataPoint[] = Array.from({ length: strikePrice }, (_, index) => ({
    name: "Page E",
    // Add other properties as needed
  }));
  
  const index = data.findIndex(item => item.name === "Page E");
  if (index !== -1) {
    data.splice(index + 1, 0, ...newPageEData);
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className='relative pt-2 overflow-x-hidden'>

      <div className='absolute -rotate-90 top-20 text-[#1cc268] font-bold'>Payoff</div>
      <div className='relative  border-[#1cc268] left-8 '>
        <Image src={chartuparrow} className='absolute -left-[9px] -top-1 ' width={20} height={100} alt="chartuparrow" />
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="red" />
                <stop offset={`${13}%`} stopColor="red" />
                <stop offset={`${13}%`} stopColor="#1cc268" />
                <stop offset="100%" stopColor="#1cc268" />
              </linearGradient>
            </defs>
            <YAxis tick={false} width={1} strokeWidth={3} stroke='#1cc268' widths={10} />
            {/* <XAxis dataKey="amt"
              tick={<CustomTick x={0} y={0} payload={undefined} />}
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickFormatter={(tickValue) => {
                if (tickValue === 25) {
                  return "2202";
                }

                return "";
              }} /> */}

            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="url(#colorUv)"
              onMouseLeave={handleMouseLeave}
              activeDot={{ r: 10 }}

            />
          </AreaChart>
        </ResponsiveContainer>

      </div>
      <div className='flex'>

        <div className='text-[10px] font-medium ml-20 relative -left-3 text-red-500'>LP </div>
        <div className='text-[10px] font-medium ml-10'><div className={`relative -left-${strikePrice-1}`}>CP</div></div>
        <div className={`text-[10px] font-medium ml-12`}><div className={`relative ${strikePrice==1?"left-3": strikePrice==2?"left-5":strikePrice==3?"left-6":strikePrice==4?"left-7":"left-8"}`}>SP</div></div>
      </div>
      <div className='flex'>

        <div className='text-[10px] font-medium ml-16 text-red-500'>{(currentPrice * 0.8).toFixed(0)} </div>
        <div className='text-[10px] font-medium ml-10'><div className={`relative -left-${strikePrice-1}`}>{currentPrice.toFixed(0)}</div></div>
        <div className={`text-[10px] font-medium ml-10`}><div className={`relative ${strikePrice==1?"left-2": strikePrice==2?"left-4":strikePrice==3?"left-5":strikePrice==4?"left-6":"left-7"}`}>{(strikePrice == 1 ? currentPrice * 1.05 : strikePrice == 2 ? currentPrice * 1.10 : strikePrice == 3 ? currentPrice * 1.15 : strikePrice == 4 ? currentPrice * 1.20 : currentPrice * 1.25).toFixed(0)}</div></div>
      </div>
      <div className='mt-1 mr-4 text-sm font-medium text-gray-400 underline text-end underline-offset-2'>
        Settlement Price
      </div>

    </div>

  );
}
export default PnlChart;