import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Filler,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Filler, Tooltip)

export default function StockChart({stockData}) {
  let labelItems = [];
  for (let i = 0; i < stockData.resultsCount; i++) {
    let date = new Date(stockData.results[i].t);
    let dayMonth = `${date.getDate()} ${date.toLocaleString('default', {month: 'short'})}`;
    labelItems.push(dayMonth);
  }

  const data = {
    labels: labelItems.map((item) => item.toString()),
    datasets: [
      {
        label: `Stock of ${stockData.ticker}`,
        data: stockData.results.map((result) => result.c),
        backgroundColor: '#fff0c0',
        borderColor: 'black',
        pointBorderColor: '#f03030',
        fill: true,
        tension: 0
      }
    ]
  }
  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {
        min: Math.round(stockData.results[0].l - 60),
        max: Math.round(stockData.results[0].h + 60)
      }
    }
  }

  return (
    <div className='chart'>
      <Line
        data={data}
        options={options}
      ></Line>
    </div>
  )
}