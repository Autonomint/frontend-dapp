'use client'
import React, { PureComponent, useCallback, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer ,Tooltip,TooltipProps} from 'recharts';
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';
const COLORS = [
  { start: "#D4F5FF", end: "#00C2FF" },
  { start: "#fff", end: "#ff6d6d" },
  { start: "#fff", end: "#72FFB4" },

];
const COLORS2 = [
  { start: "#007AFF", end: "#91B2FF" },
  { start: "#ff6d6d", end: "#ff6d6d" },
  { start: "#00B655", end: "#93F3BA" },
];


const data = [
  { name: 'Group A', value: 78 },
  { name: 'Group B', value: 2 },
  { name: 'Group C', value: 20 },
];

// const renderActiveShape = (props: { cx: any; cy: any; midAngle: any; innerRadius: any; outerRadius: any; startAngle: any; endAngle: any; fill: any; payload: any; percent: any; value: any; }) => {
//   const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
//     fill, payload, percent, value } = props;

//   return (
//     <g>
      // <Sector
      //   cx={cx}
      //   cy={cy}
      //   innerRadius={innerRadius}
      //   outerRadius={outerRadius+5}
      //   startAngle={startAngle}
      //   endAngle={endAngle}
      //   fill={fill}
      // />
//     </g>
//   );
// };
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 10) * cos;
  // const sy = cy + (outerRadius + 10) * sin;
  // const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  // const ey = my;
  // const textAnchor = cos >= 0 ? "start" : "end";
  const sin = Math.sin(-RADIAN * midAngle);
const cos = Math.cos(-RADIAN * midAngle);
const sx = cx + (outerRadius + 5) * cos; // reduced from 10 to 5
const sy = cy + (outerRadius + 5) * sin; // reduced from 10 to 5
const mx = cx + (outerRadius + 15) * cos; // reduced from 30 to 15
const my = cy + (outerRadius + 15) * sin; // reduced from 30 to 15
const ex = mx + (cos >= 0 ? 1 : -1) * 22;
const ey = my;
const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius+5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text> */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) *-32}
        y={ey-12}
        dy={8}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={10}
        
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};



 const LoanPieChart:React.FC = () =>{
    // onPieEnter: CategoricalChartFunc | undefined;
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-black ">
            <p className="label">{`${label} : ${payload[0].value}`}</p>
          </div>
        );
      }
    
      return null;
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const onMouseOver = useCallback((data:any, index:any) => {
      setActiveIndex(index);
    }, []);
    const onMouseLeave = useCallback((data:any, index:any) => {
      setActiveIndex(0);
    }, []);
    const onPieEnter = useCallback(
      (_: any, index: React.SetStateAction<number>) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );
  
  return (
   
      <div className="relative w-full h-full ">
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
            outerRadius={80}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
            ))}
          </Pie>
          {/* <Tooltip content={<CustomTooltip active={true}  payload={[]} label={''} />}  cursor={{ fill: "transparent" }} /> */}
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-0 w-full h-full">
        <ResponsiveContainer width={"100%"}>
          <PieChart margin={{ bottom: -157 }}>
            <defs>
              {data.map((entry, index) => (
                <linearGradient id={`myGradient2${index}`}>
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
              innerRadius={30}
              outerRadius={80}
              blendStroke
              activeShape={renderActiveShape}
              onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
              // activeShape={renderActiveShape}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#myGradient2${index})`}
                />
              ))}
            </Pie>
            {/* <Tooltip  /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
      // <PieChart width={300} height={250} onMouseEnter={this.onPieEnter}>
      //   <Pie
      //     data={data}
      //     cx={100}
      //     // cy={200}
      //     startAngle={180}
      //     endAngle={0}
      //     innerRadius={50}
      //     outerRadius={100}
      //     fill="#8884d8"
      //     paddingAngle={5}
      //     dataKey="value"
      //   >
      //     {data.map((entry, index) => (
      //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      //     ))}
      //   </Pie>
      // </PieChart>
    );
}
export default LoanPieChart


