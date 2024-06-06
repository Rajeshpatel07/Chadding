import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Dialogs/Login";
import Signup from "../Dialogs/Signup";
import axios from "axios";

const NavBar: React.FC = () => {


  return (
    <div className="navbar flex justify-between items-center px-8 py-4 bg-black ">
      <div className="flex">
        <div className="flex items-center gap-10">
          <Link to="/" className=" flex items-center gap-2 ">
            <img src="/favicon.png" alt="Logo" width="45px" height="auto" />
            <h1 className="text-2xl text-white font-bold font-serif">
              Chadding
            </h1>
          </Link>
          <section className="hidden md:block">
            <ul className="flex gap-5 items-center">
              <li className="text-lg text-white">Trending</li>
              <li className="text-lg text-white">Gaming</li>
              <li className="text-lg text-white">Podcast</li>
            </ul>
          </section>
        </div>
      </div>

      <div className="form-control hidden  border lg:flex lg:flex-row items-center bg-gray-800 rounded-md">
        <label htmlFor="search" className="px-2 h-full bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 bg-gray-800">
            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
          </svg>
        </label>
        <input type="search" id="search" placeholder="Search..." className="outline-none rounded-md px-3 py-2 w-96" />
      </div>

      <div className="flex-none items-center gap-2">
        <UserStatus />
      </div>

    </div>
  );
};

export default NavBar;


const UserStatus: React.FC = () => {
  const [token, setToken] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get("/api/");
        if (response.data.error) {
          setToken(false);
          return;
        }
        setUsername(JSON.parse(localStorage.getItem("Username") || "''"))
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {
        token ?

          <>
            <div className="  px-8 hidden md:flex items-center gap-5">
              <div className="avatar placeholder">
                <div className=" text-neutral-content rounded-full w-8">
                  <span className="text-xs">UI</span>
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-xs">UI</span>
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <div className="avatar flex items-center gap-5">
                <h1 className="text-lg text-white font-bold">{username}</h1>
                <div className="w-10 rounded">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
          </>
          :
          <>
            <Signup />
            <Login />
          </>
      }
    </>

  )
}
