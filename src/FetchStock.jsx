import {useEffect, useState} from "react";
import axios from "axios";
import StockChart from "./StockChart.jsx";

export default function FetchStock({value}) {
  const [stockData, setStockData] = useState({});
  const [isValue, setIsValue] = useState(false);

  let interval;
  let today = new Date();
  let priorDate = new Date(new Date().setDate(today.getDate() - 30));
  let dateTo = today.toLocaleDateString('sv');
  let dateFrom = priorDate.toLocaleDateString('sv');
  interval = `${dateFrom}/${dateTo}`;
  console.log(interval)

  const url = `https://api.polygon.io/v2/aggs/ticker/${value}/range/1/day/${interval}?adjusted=true&sort=asc&limit=120&apiKey=82mwgyZuJcInkKxiqgoQt0EZ5NTcQDNc`;

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setStockData(res.data);
      });
    return () => isValue = false
  }, [url]);

  return (
    <div>
      {stockData !== undefined && <StockChart stockData={stockData}/>}
    </div>
  );
}
