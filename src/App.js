import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [date, setDate] = useState();

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"
      )
      .then((response) => {
        setData(response.data[date]);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, date]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-4">
            <h2 className="text-center text-white display-3">
              TÜRKİYE COVID-19 ARAMA MOTORU
            </h2>
            <input
              onChange={changeDate}
              className="form-control"
              type="text"
              placeholder="GG/AA/YY"
            />
            <table className="table table-striped text-white">
              <thead>
                <tr>
                  <th scope="col">Tarih</th>
                  <th scope="col">Test Sayısı</th>
                  <th scope="col">Hasta Sayısı</th>
                  <th scope="col">Vefat Sayısı</th>
                </tr>
              </thead>
              <tbody>
                <tr className={data === undefined ? "bg-danger" : "bg-success"}>
                  <th className="text-white" scope="row">
                    {data === undefined ? "Veri Bekleniyor" : data.date}
                  </th>

                  <td className="text-white">
                    {data === undefined ? "Veri Bekleniyor" : data.totalTests}
                  </td>
                  <td className="text-white">
                    {data === undefined ? "Veri Bekleniyor" : data.patients}
                  </td>
                  <td className="text-white">
                    {data === undefined ? "Veri Bekleniyor" : data.deaths}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
