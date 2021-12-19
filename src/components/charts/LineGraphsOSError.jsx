import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default function LineGraphOsError() {


  const getErrorWRTOSReducer = useSelector(state => state.getErrorWRTOSReducer)
  const { data } = getErrorWRTOSReducer
  const piCount =
    data && data.typeWiseCount
      ? data.typeWiseCount
      : null;
  console.log("LineCount line graph", piCount)

  return (
    <BarChart
      width={450}
      height={400}
      data={piCount}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis dataKey="count" />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#3E8BE2" />
    </BarChart>
  );
}
