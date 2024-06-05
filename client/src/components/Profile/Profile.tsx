import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Profile: React.FC = () => {
  const params = useParams();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    (
      async function() {
        const Id: string = JSON.parse(localStorage.getItem('UserId') || '""')
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
            <section className='flex items-center gap-8'>
              <img src="https://rajesh-patel.vercel.app/Rlogo.png" alt="" className="self-center flex-shrink-0 w-12 h-12 border rounded-full" />
              <section className='self-start'>
                <h1 className='text-md text-white font-medium'>{params.username}</h1>
                <p>22,123 Subscribers</p>
              </section>
            </section>
            <button className='text-md text-white px-5 py-2 font-medium bg-violet-600 rounded'>Subscribe</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile;
