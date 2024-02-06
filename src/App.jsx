import {useState} from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {TextField} from "@mui/material";
import StockChart from "./StockChart.jsx";
import axios from "axios";

function App() {
  const [value, setValue] = useState('');
  const [stockData, setStockData] = useState(null);

  let today = new Date();
  let priorDate = new Date(new Date().setDate(today.getDate() - 30));
  let dateTo = today.toLocaleDateString('sv');
  let dateFrom = priorDate.toLocaleDateString('sv');
  let interval = `${dateFrom}/${dateTo}`;

  async function handleChange(event) {
    event.preventDefault();
    setValue(event.target.value);
    const url = 'https://api.polygon.io/v2/aggs/ticker/' + event.target.value + '/range/1/day/' + interval
      + '?adjusted=true&sort=asc&limit=120&apiKey=82mwgyZuJcInkKxiqgoQt0EZ5NTcQDNc';
    await axios.get(url)
      .then(res => {
        setStockData(res.data);
      })
  }

  return (
    <>
      <h1>The Financial Chart</h1>
      <Box sx={{minWidth: 120}}>
        <TextField id='currency'
                   label='Choose stock..'
                   variant="outlined"
                   value={value}
                   select
                   fullWidth
                   onChange={handleChange}>
              <MenuItem value={'AMZN'}>AMZN</MenuItem>
              <MenuItem value={'AAPL'}>AAPL</MenuItem>
              <MenuItem value={'MSFT'}>MSFT</MenuItem>
              <MenuItem value={'TSLA'}>TSLA</MenuItem>

        </TextField>
      </Box>
      {stockData !== null && <StockChart stockData={stockData}/>}
    </>
  )
}

export default App
