import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { BiPlus } from 'react-icons/bi';
const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState(null);
  
    React.useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/user/users");
            const data = await response.json();
            setUsers(data);
          } catch (err) {
            setError("Error fetching User");
          }
        };
    
        fetchUsers();
      }, [users]);

      const handleDeleteUser = async (userId) => {
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

  return (
    <div className=" mt-10 ">
      <table className=" text-[16px]   text-sky-900 bg-white   px-10 py-4  border-separate border-spacing-y-2 min-w-[800px] ">
          <tr className=" ">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td className=" text-center">
              <Link to={"/add-users"} className=" flex items-center gap-2 rounded-md border  text-white bg-blue-800  hover:text-white px-4 py-1 mr-1 font-semibold">
               <BiPlus/> Add 
              </Link>
            </td>
          </tr>
          <tr className=" bg-blue-800 font-semibold text-white ">
            <td className="p-2 px-4 ">Name </td>
            <td className="p-2 px-4 ">Username</td>
            <td className="p-2 px-4 ">Phone</td>
            <td className="p-2 px-4 ">Balance</td>
            <td className="p-2 px-4 ">Cut</td>
            <td className="p-2 px-4 ">Role</td>
            <td className="p-2 px-4 ">Branch</td>
          </tr>

          {users.map((data) => (
            <tr className=" hover:bg-slate-100">
              <td className=" flex gap-3 items-center">
                <img
                  src={data.avatar}
                  alt="profile"
                  style={{width:'23px' }}
                  className=" rounded-md  w-8 h-8"
                />{" "}
                {data.name}
              </td>
              <td className="p-2 px-4 ">{data.username}</td>
              <td className="p-2 px-4 ">{data.phone}</td>
              <td className="p-2 px-4 ">{data.balance}</td>
              <td className="p-2 px-4 ">{data.cut}</td>
              <td className="p-2 px-4 ">{data.role}</td>
              <td className="p-2 px-4 ">{data.branch}</td>

              <td className=" p-2 px-4    text-red-600     text-center">
                <button onClick={() => handleDeleteUser(data._id)} className='border-red-600  px-1 rounded-none ' >
                  Delete
                </button>
              </td>
              <td className=" text-center p-2 px-4  text-purple-600 ">
              <Link to={`/update-user/${data._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </table>
        {error && <p className=" text-red-500 ">{error}</p>}
    </div>
  )
}

export default Users
