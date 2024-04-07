import { Chart as ChartJS, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend

);


const LineChart = () => {
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
            beginAtZero: true,
            ticks: {
              font: {
                weight: 'bold', // Make text bold
                size: 14 // Increase text size
              }
            }
          },
          x: {
            ticks: {
              font: {
                weight: 'bold', // Make text bold
                size: 14, // Increase text size
              },
              align: 'center' // Align text horizontally to the x-axis
            }
          }
        }
      };
  
    // Ensure key is unique to trigger re-render and destroy previous chart
    const key = new Date().getTime();
  
    return (
    <div className="h-96 bg-white border rounded-md shadow-md p-4 mb-8">
      
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default LineChart;
  