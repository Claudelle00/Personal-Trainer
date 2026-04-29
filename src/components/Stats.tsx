
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { groupBy, sumBy } from "lodash";

type Training = {
  activity: string;
  duration: number;
};

export default function Statistics() {
  const [data, setData] = useState<{ activity: string; duration: number }[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/gettrainings")
      .then((res) => res.json())
      .then((trainings: Training[]) => {
        const grouped = groupBy(trainings, "activity");
        const stats = Object.keys(grouped).map((activity) => ({
          activity,
          duration: sumBy(grouped[activity], "duration"),
        }));
        setData(stats);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: "100%", height: "500px", padding: "30px" }}>
      
      <ResponsiveContainer width="90%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: "Duration (min)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="duration" fill="#e495af" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}