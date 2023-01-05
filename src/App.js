import { useState } from "react";
import Papa from "papaparse";
import { LineChart, Line, YAxis, XAxis } from 'recharts';


function App() {
  const [data, setData] = useState([]);

  const chartStyle = {
    width: "55%",
    height: "35%",
    margin: "auto",
  };

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);
        console.log(results.data.map((item) => item.Year));
        console.log(results.data.map((item) => item.Change));
        console.log(results.data.map((item) => item.AI));
      },
    });
  }

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />

    <div style={chartStyle}>
        <h2>AFFORDABILITY INDEX V. PRICE MOVEMENT HOUSE</h2>
        {data && 
          <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey={data} stroke="#8884d8" />
            <XAxis dataKey={{item.Year}} />
            <YAxis />
          </ LineChart>
        }
     </div>

    </div>
  );
}

export default App;
