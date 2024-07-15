import React, {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { BiPlus } from 'react-icons/bi';

import CreateAgent from './CreateAgent';
import CreateBranch from './CreateBranch';
const Branch = () => {
    const [users, setUsers] = React.useState([]);
    const [branch, setBranch] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(`/api/user/branch`);
            const data = await response.json();
            setUsers(data);
          } catch (err) {
            setError("Error fetching User");
          }
        };
    
        fetchUsers();
      }, [users]);
      React.useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(`/api/branch/branch`);
            const data = await response.json();
            setBranch(data);
          } catch (err) {
            setError("Error fetching User");
          }
        };
    
        fetchUsers();
      }, [branch]);


      const handleDeleteUser = async (userId) => {
        try {
          const response = await axios.delete(`/api/user/deletebranch/${userId}`);
    
          if (response.data.success) {
            setUsers([...users.filter((users) => users._id !== userId)]);
          } else {
            setError("Error filtering User");
          }
        } catch (err) {
          
          setError("Error deleting User");
        }
      };

      const handleDeleteBranch = async (userId) => {
        try {
          const response = await axios.delete(`/api/branch/deletebranch/${userId}`);
    
          if (response.data.success) {
            setBranch([...users.filter((users) => users._id !== userId)]);
          } else {
            setError("Error filtering branch");
          }
        } catch (err) {
          
          setError("Error deleting branch");
        }
      };

      const [isModalOpen, setIsModalOpen] = useState(false);

      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      const [isModalBranchOpen, setIsModalBranchOpen] = useState(false);

      const openBranchModal = () => {
        setIsModalBranchOpen(true);
      };
    
      const closeBranchModal = () => {
        setIsModalBranchOpen(false);
      };
  return (
    <div>
    <div className="tw-mt-10 ">
      <div>Agent</div>
      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] ">
          <tr className=" ">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td className="tw-text-center">
              
              <button onClick={openModal} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'><BiPlus/> Add User</button>
            </td>
          </tr>
          <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white ">
            <td className="tw-p-2 tw-px-4 ">Name </td>
            <td className="tw-p-2 tw-px-4 ">Username</td>
            <td className="tw-p-2 tw-px-4 ">Phone</td>
            <td className="tw-p-2 tw-px-4 ">Balance</td>
            <td className="tw-p-2 tw-px-4 ">Cut</td>
            <td className="tw-p-2 tw-px-4 ">Role</td>

          </tr>

          {users && users.map((data) => (
            <tr className="tw-hover:bg-slate-100">
              <td className="tw-flex tw-gap-3 tw-items-center">
                <img
                  src={data.avatar}
                  alt="profile"
                  style={{width:'23px' }}
                  className="tw-rounded-md  tw-w-8 tw-h-8"
                />{" "}
                {data.name}
              </td>
              <td className="tw-p-2 tw-px-4 ">{data.username}</td>
              <td className="tw-p-2 tw-px-4 ">{data.phone}</td>
              <td className="tw-p-2 tw-px-4 ">{data.balance}</td>
              <td className="tw-p-2 tw-px-4 ">{data.cut}%</td>
              <td className="tw-p-2 tw-px-4 ">{data.role}</td>


              <td className=" tw-p-2 tw-px-4    tw-text-red-600     tw-text-center">
                <button onClick={() => handleDeleteUser(data._id)} className='tw-border-red-600  tw-px-1 tw-rounded-none ' >
                  Delete
                </button>
              </td>
              <td className="tw-text-center tw-p-2 tw-px-4  tw-text-purple-600 ">
              <Link to={`/updateagent/${data._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </table>
        {error && <p className="tw-text-red-500 ">{error}</p>}
    </div>
    <div className="tw-mt-10 ">
      <div>Branch</div>
      <table className="tw-text-[16px] tw-text-sky-900 tw-bg-white tw-px-10 tw-py-4 tw-border-separate tw-border-spacing-y-2 tw-min-w-[800px] ">
          <tr className=" ">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td className="tw-text-center">
              
              <button onClick={openBranchModal} className='tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800'><BiPlus/> Add Branch</button>
            </td>
          </tr>
          <tr className="tw-bg-blue-800 tw-font-semibold tw-text-white ">
            <td className="tw-p-2 tw-px-4 ">Name </td>
            <td className="tw-p-2 tw-px-4 ">Agent</td>
            <td className="tw-p-2 tw-px-4 ">location</td>
    

          </tr>

          {branch && branch.map((data) => (
            <tr className="tw-hover:bg-slate-100">
              <td className="tw-flex tw-gap-3 tw-items-center">
                
                {data.name}
              </td>
              <td className="tw-p-2 tw-px-4 ">{data.agent}</td>
              <td className="tw-p-2 tw-px-4 ">{data.location}</td>


              <td className=" tw-p-2 tw-px-4    tw-text-red-600     tw-text-center">
                <button onClick={() => handleDeleteBranch(data._id)} className='tw-border-red-600  tw-px-1 tw-rounded-none ' >
                  Delete
                </button>
              </td>
              <td className="tw-text-center tw-p-2 tw-px-4  tw-text-purple-600 ">
              <Link to={`/updatebranch/${data._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </table>
        {error && <p className="tw-text-red-500 ">{error}</p>}
    </div>
    {isModalOpen && (
        <div className='tw-absolute tw-top-4 tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50'>
          <div className='tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative'>
            <button className='tw-absolute tw-top-2 tw-right-2 tw-text-gray-800' onClick={closeModal}>X</button>
            <CreateAgent/>
          </div>
        </div>
      )}
      {isModalBranchOpen && (
        <div className='tw-absolute tw-top-4 tw-inset-0 tw-flex tw-justify-center tw-items-center tw-bg-gray-800 tw-bg-opacity-50'>
          <div className='tw-bg-white tw-p-4 tw-rounded-md tw-shadow-lg tw-relative'>
            <button className='tw-absolute tw-top-2 tw-right-2 tw-text-gray-800' onClick={closeBranchModal}>X</button>
            <CreateBranch/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Branch
