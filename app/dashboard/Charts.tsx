"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_API_URL } from "@/constants/BackendUrl";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { useEffect } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { set } from "zod";

const AmintData =[
 "1","1","1","1","1","1","1","1","1","1","1","1","1"
]
const AbondData =[
  "4.0","4.0","4.0","4.0","4.0","4.0","4.0","4.0","4.0","4.0","4.0","4.0","4.0",
]


const Charts: React.FC<{ height?:number,title:string }> = ({ height=400,title }) => {
  let currentDate = new Date();
  const [time, setTime] = React.useState("10");
  const [chartData, setChartData] = React.useState<string[]>([]);
  async function changeTime() {
    if(title==="AMINT"){
      setChartData(AmintData)
    }
    else if(title==="ABOND"){
      setChartData(AbondData)
    }
    else{
      try {
      const res = await fetch(`${BACKEND_API_URL}/borrows/chart/${title}/11155111/${time}/No`);
      const data = await res.json();
      console.log(title,data)
      setChartData(data)
      } catch (error) {
        console.log(error)
        setChartData(AmintData)
      }
    }
  }
  useEffect (()=>{
    changeTime()
  },[time,title])
const data = chartData.map((value) => {
  let name;

  name = String(currentDate.getDate()) + "/" + String(currentDate.getMonth() + 1);

  currentDate.setDate(currentDate.getDate() - 1);

  return { name, value };
}).reverse();
  return (
    <div className="p-4">
                    <div className="flex items-center justify-end">
                      <div className="flex gap-[10px] mr-5">
                        <Button
                          variant={"showMore"}
                          size={"timeline"}
                          className={` ${time==="720"?"text-[#020202] rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]":"text-borderGrey"} `}
                          onClick={() => setTime("720")}
                        >
                          All Time
                        </Button>
                        <Button
                          variant={"showMore"}
                          size={"timeline"}
                          className={` ${time==="365"?"text-[#020202] rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]":"text-borderGrey"} `}
                          onClick={() => setTime("365")}
                        >
                          1Y
                        </Button>
                        <Button
                          variant={"showMore"}
                          size={"timeline"}
                          className={` ${time==="180"?"text-[#020202] rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]":"text-borderGrey"} `}
                          onClick={() => setTime("180")}
                        >
                          6M
                        </Button>
                        <Button
                          variant={"showMore"}
                          size={"timeline"}
                          className={` ${time==="30"?"text-[#020202] rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]":"text-borderGrey"} `}
                          onClick={() => setTime("30")}
                        >
                          1M
                        </Button>
                        <Button
                          variant={"showMore"}
                          size={"timeline"}
                          className={` ${time==="10"?"text-[#020202] rounded-[4px] border border-[#004795] bg-[linear-gradient(180deg,#E4EDFF_-0.23%,#F4F8FF_100%)]":"text-borderGrey"} `}
                          onClick={() => setTime("10")}
                        >
                          10D
                        </Button>
                        {/* <Button
                          variant={"showMore"}
                          size={"timeline"}
                          className="text-borderGrey"
                        >
                          1D
                        </Button> */}
                      </div>
                    </div>
                    
    <ResponsiveContainer style={{marginLeft:"-20px"}} width="100%" height={height}>
      <LineChart data={data}>
        <Line
          style={{
            filter:
              "drop-shadow(0px 2px 4px rgba(0, 110, 255, 0.98)) drop-shadow(0px 8px 8px rgba(0, 110, 255, 0.85)) drop-shadow(0px 18px 11px rgba(0, 110, 255, 0.50)) drop-shadow(0px 32px 13px rgba(0, 110, 255, 0.15)) drop-shadow(0px 49px 14px rgba(0, 110, 255, 0.02))",
          }}
          type="monotone"
          dataKey="value"
          stroke="#041A50"
        />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis dataKey="value"/>
      </LineChart>
    </ResponsiveContainer>
    <div className="flex items-center justify-between px-10 ">
                      <Button
                        variant={"secondary"}
                        size={"arrow"}
                        className="flex items-center bg-[#EEE] "
                      >
                        <ArrowLeftIcon width={12} height={9} />
                      </Button>
                      <p>Time</p>
                      <Button
                        variant={"secondary"}
                        size={"arrow"}
                        className="flex items-center bg-[#EEE]"
                      >
                        <ArrowRightIcon width={12} height={9} />
                      </Button>
                    </div>
                  </div>
  );
};

export default Charts;
