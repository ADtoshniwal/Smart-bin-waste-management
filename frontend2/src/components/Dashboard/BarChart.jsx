import { Chart as ChartJS ,BarElement, CategoryScale, LinearScale } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/visualizetion");
        if (response.ok) {
          const data = await response.json();
          setChartData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChartData();
  }, []);

  // Format the fetched data into the format required by Chart.js
  const data = {
    labels: chartData.map(entry => entry.type),
    datasets: [{
      label: 'Disposed Tonnes',
      data: chartData.map(entry => entry.disposed_tonned),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }, {
      label: 'Recycled Tonnes',
      data: chartData.map(entry => entry.recycled_tonned),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Ensure key is unique to trigger re-render and destroy previous chart
  const key = new Date().getTime();

  return (
    <div key={key}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
