import React, { useEffect, useState } from 'react';
import { Bar, Pie , Line} from 'react-chartjs-2';
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
  Legend
} from 'chart.js';
import { useSelector } from 'react-redux';

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

const AgentDash = () => {
  const [aggregatedSales, setAggregatedSales] = useState({});
  const [salesByBranch, setSalesByBranch] = useState([]);
  const [salesByCashier, setSalesByCashier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/branch/getbranch/${currentUser.username}`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching User");
      }
    };

    fetchUsers();
  }, [currentUser.username]);

  useEffect(() => {
    const fetchSalesData = async () => {
      if (users.length === 0) return;

      try {
        const branchNames = users.map(user => user.name);

        const aggregatedResponse = await fetch(
          `/api/sales/salesTimeByBranch?branch=${branchNames.join(',')}`
        );
        const aggregatedData = await aggregatedResponse.json();
        setAggregatedSales(aggregatedData);

        const groupedResponse = await fetch(
          `/api/sales/salesBranchByBranch?branch=${branchNames.join(',')}`
        );
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
  }, [users]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formatNumber = (num) => {
    if (num < 1000) return num; // No formatting for numbers below 1000
    return (num / 1000).toFixed(1) + 'K'; // Format numbers above 1000 with "K"
  };
  
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
      <div className='tw-flex tw-gap-10'>
        <div style={{ marginBottom: '20px' }} className='tw-grid tw-grid-cols-2 tw-gap-7'>
          <div className='tw-rounded-lg tw-flex-col tw-justify-center tw-items-center tw-gap-2 tw-bg-white tw-p-9 tw-shadow-lg'>
            <p className='tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${formatNumber(aggregatedSales.dailyTotal)}</p>
            <p className='tw-text-center'>Today's sales</p>
          </div>
          <div className='tw-rounded-lg tw-bg-white tw-p-9 tw-shadow-lg'>
            <p className='tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${formatNumber(aggregatedSales.weeklyTotal)}</p>
            <p className='tw-text-center'>Weekly sales</p>
          </div>
          <div className='tw-rounded-lg tw-bg-white tw-p-9 tw-shadow-lg'>
            <p className='tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${formatNumber(aggregatedSales.monthlyTotal)}</p>
            <p className='tw-text-center'>Monthly sales</p>
          </div>
          <div className='tw-rounded-lg tw-bg-white tw-p-9 tw-shadow-lg'>
            <p className='tw-text-center tw-text-red-500 tw-font-bold tw-text-2xl'>${formatNumber(aggregatedSales.yearlyTotal)}</p>
            <p className='tw-text-center'>Yearly sales</p>
          </div>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 className='tw-text-blue-800'>Sales by Branch</h2>
          <Pie data={pieData(salesByBranch)} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Branch' }}}}/>
        </div>
      </div>
      <div className='tw-flex tw-justify-between tw-items-center'>
        <div>
          <h2 className='tw-text-blue-800'>Sales by Cashier</h2>
          <Bar data={barData(salesByCashier, 'Sales by Cashier')} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Cashier' }}}}/>
        </div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h2 className='tw-text-blue-800'>Sales by Branch (Line Chart)</h2>
        <Line
          data={lineData(salesByBranch)}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Sales by Branch Over Time' },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AgentDash;