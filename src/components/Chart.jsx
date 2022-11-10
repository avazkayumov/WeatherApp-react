import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import styled from "styled-components";

function Chart({ data }) {
  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={400} bgColor="#FFFFFF">
        <LineChart
          width={1200}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt_txt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="main.temp_max"
            stroke="#ff7300"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="main.temp_min"
            stroke="#387908"
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default Chart;

const Wrapper = styled.div`
`;
