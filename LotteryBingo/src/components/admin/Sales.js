import React from 'react'


const Sales = () => {
    const [sales, setSales] = React.useState([]);
    const [error, setError] = React.useState(null);
  
    React.useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/sales/getSales");
            const data = await response.json();
            setSales(data);
          } catch (err) {
            setError("Error fetching Sales");
          }
        };
    
        fetchUsers();
      }, [sales]);

      {/*const handleDeleteUser = async (userId) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
    
          if (response.data.success) {
            setUsers([...users.filter((users) => users._id !== userId)]);
          } else {
            setError("Error deleting User");
          }
        } catch (err) {
          
          setError("Error deleting User");
        }
      };
    */}

  return (
    <div className="tw-mt-10 ">
      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] ">
          <tr className=" ">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td >
              
            </td>
          </tr>
          <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white ">
            <td className="tw-p-2 tw-px-4 ">Date </td>
            <td className="tw-p-2 tw-px-4 ">Bet</td>
            <td className="tw-p-2 tw-px-4 ">Player#</td>
            <td className="tw-p-2 tw-px-4 ">Total Won</td>
            <td className="tw-p-2 tw-px-4 ">Cut</td>
            <td className="tw-p-2 tw-px-4 ">Won</td>
            <td className="tw-p-2 tw-px-4 ">#Call</td>
            <td className="tw-p-2 tw-px-4 ">Winners</td>
            <td className="tw-p-2 tw-px-4 ">Branch</td>
            <td className="tw-p-2 tw-px-4 ">Cashier</td>
          </tr>

          {sales.map((data) => (
            <tr className="tw-hover:bg-slate-100">
              <td className="tw-flex tw-gap-3 tw-items-center">
                {data.createdAt}
              </td>
              <td className="tw-p-2 tw-px-4 ">&#36;{data.bet} </td>
              <td className="tw-p-2 tw-px-4 ">{data.player}</td>
              <td className="tw-p-2 tw-px-4 ">&#36;{data.total} </td>
              <td className="tw-p-2 tw-px-4 ">&#36;{data.cut} </td>
              <td className="tw-p-2 tw-px-4 ">&#36;{data.won} </td>
              <td className="tw-p-2 tw-px-4 ">{data.call}</td>
              <td className="tw-p-2 tw-px-4 ">{data.winner} </td>
              <td className="tw-p-2 tw-px-4 ">{data.branch}</td>
              <td className="tw-p-2 tw-px-4 ">{data.cashier}</td>

              <td className=" tw-p-2 tw-px-4    tw-text-red-600     tw-text-center">
                <button className='tw-border-red-600  tw-px-1 tw-rounded-none ' >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        {error && <p className="tw-text-red-500 ">{error}</p>}
    </div>
  )
}

export default Sales
