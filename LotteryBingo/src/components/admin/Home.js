import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { BiDollar } from 'react-icons/bi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [aggregatedSales, setAggregatedSales] = useState({});
  const [salesByBranch, setSalesByBranch] = useState([]);
  const [salesByCashier, setSalesByCashier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const aggregatedResponse = await fetch('http://localhost:4000/api/sales/salesTime');
        const aggregatedData = await aggregatedResponse.json();
        setAggregatedSales(aggregatedData);

        const groupedResponse = await fetch('http://localhost:4000/api/sales/salesBranch');
        const groupedData = await groupedResponse.json();
        setSalesByBranch(groupedData.salesByBranch);
        setSalesByCashier(groupedData.salesByCashier);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sales data');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const barData = (data, label) => ({
    labels: data.map(item => item._id),
    datasets: [
      {
        label,
        data: data.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(5, 38, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  });

  const pieData = (data) => ({
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
        ],
      },
    ],
  });

  const lineData = (data) => ({
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Sales by Branch',
        data: data.map(item => item.total),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(5, 38, 255, 1)',
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  });

  return (
    <div style={{ padding: '10px' }}>
      <div className=' tw-flex tw-gap-10'>
      <div style={{ marginBottom: '20px' }} className=' tw-grid tw-grid-cols-2 tw-gap-7'>
        <div className=' tw-rounded-lg tw-flex-col tw-justify-center tw-items-center tw-gap-2 tw-bg-white tw-p-9 tw-shadow-lg'> <p  className=' tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${aggregatedSales.dailyTotal}</p> <p className=' tw-text-center'>Today's sales</p></div>
        <div className='tw-rounded-lg tw-bg-white tw-p-9 tw-shadow-lg'> <p className=' tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${aggregatedSales.weeklyTotal}</p><p className=' tw-text-center '>Weekly sales</p></div>
        <div className='tw-rounded-lg tw-bg-white tw-p-9 tw-shadow-lg'> <p className=' tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${aggregatedSales.monthlyTotal}</p><p className=' tw-text-center '>Monthly sales</p></div>
        <div className='tw-rounded-lg tw-bg-white tw-p-9 tw-shadow-lg'> <p className=' tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl' >${aggregatedSales.yearlyTotal}</p><p className=' tw-text-center '>Yearly sales</p></div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h2 className=' tw-text-blue-800'>Sales by Branch</h2>
        <Pie data={pieData(salesByBranch)} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Branch' }}}} />
      </div>
      </div>
      <div className=' tw-flex tw-justify-between tw-items-center'>
      <div style={{ marginBottom: '40px' }}>
        <h2 className=' tw-text-blue-800'>Sales by Branch</h2>
        <Bar data={barData(salesByBranch, 'Sales by Branch')} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Branch' }}}} />
      </div>
      <div>
        <h2 className=' tw-text-blue-800'>Sales by Cashier</h2>
        <Bar data={barData(salesByCashier, 'Sales by Cashier')} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Cashier' }}}} />
      </div>
      
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 className=' tw-text-blue-800'>Sales by Branch (Line Chart)</h2>
        <Line data={lineData(salesByBranch)} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Branch Over Time' }}}} />
      </div>
    </div>
  );
};

export default AdminDashboard;