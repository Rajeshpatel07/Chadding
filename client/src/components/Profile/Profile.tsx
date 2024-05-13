import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Profile: React.FC = () => {
  const [description, setDescription] = useState<boolean>(false);
  const params = useParams();
  console.log(params)

  axios.defaults.withCredentials = true;

  useEffect(() => {
    (
      async function () {
        const Id: string = JSON.parse(localStorage.getItem('UserId') || '""')
        console.log(Id)
        try {
          const response = await axios.get(`/api/profile/${Id}`,)
          console.log(response)

        } catch (error) {
          console.log(error)
        }
      }
    )()
  }, [])

  return (
    <div className='flex items-center justify-center' >
      <main className='px-2 w-screen  flex flex-col  sm:px-5'>
        <div className="p-6 sm:p-12 ">
          <div className="flex justify-between items-center">
            <section className='flex space-x-6  space-y-4 '>
              <img src="https://source.unsplash.com/75x75/?portrait" alt="" className="self-center flex-shrink-0 w-20 h-20 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300" />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-center md:text-left">Leroy Jenkins</h4>
                <p>2,2523 subscribers</p>
              </div>
            </section>
            <button className='text-xl text-white font-bold px-5 py-2 bg-violet-600 rounded'>Subscribe</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile;