import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export const PieChart = () => {
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

  
  const data = {
    labels: chartData.map(entry => entry.type),
    datasets: [{
      label: 'Disposed Tonnes',
      data: chartData.map(entry => entry.recyc_rate),
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1
    }]
  };

  const options = {
    maintainAspectRatio: false,
  };

  const customOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14, 
            weight: 'bold' 
          }
        }
      }
    }
  };

  return (
    <div className="h-96 bg-white border rounded-md shadow-md p-4 mb-8">
      <Pie data={data} options={options} plugins={customOptions} />
    </div>
  );
};
