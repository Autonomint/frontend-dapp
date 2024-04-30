import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
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

 const LoanPieChart:React.FC = () =>{
    // onPieEnter: CategoricalChartFunc | undefined;
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
              innerRadius={45}
              outerRadius={100}
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



