import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';

const data = [
  { name: 'Group A', value: 780 },
  { name: 'Group B', value: 20 },
  { name: 'Group C', value: 200 },
];
const COLORS = ['#007AFF', 'rgb(255, 0, 0)', '#00b564'];

export default class LoanPieChart extends PureComponent {

    onPieEnter: CategoricalChartFunc | undefined;

  render() {
    return (
      <PieChart width={300} height={250} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={100}
          // cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={50}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}