import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const Profile: React.FC = () => {
  const [description, setDescription] = useState<boolean>(false);


  axios.defaults.withCredentials = true;

  useEffect(() => {
    (
      async function() {
        const Id: string = JSON.parse(localStorage.getItem('UserId'))
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
      <main className=' h-screen px-2 w-screen  flex flex-col items-center sm:px-5 md:px-8 lg:px-10 xl:px-16  '>
        <section className='w-full mt-5 flex gap-8 flex-col items-center'>
          <div className="hero h-[15vh] rounded-xl " style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
          </div>
          <div className='w-full '>
            <div className='flex gap-5 pl-5 md:pl-14 lg:pl-18 xl:pl-24'>
              <div className="avatar flex items-center">
                <div className="w-24 h-24 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className='flex flex-col'>
                <h1 className='text-2xl text-white font-medium'>Chadding</h1>
                <ul className='flex gap-1'>
                  <li>@Chadding</li>
                  <li>100k Subscribers</li>
                  <li>20 videos</li>
                </ul>
                <div>
                  <p
                    className={`  flex ${description ? 'h-full ' : 'overflow-hidden h-5 w-96'}  `}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit eveniet incidunt deleniti
                    itaque aut, veniam delectus aperiam dicta quae sapiente quam molestiae adipisci facilis
                    dolore. Ut et nostrum eius blanditiis?
                  </p>
                  <button className='text-blue-500'
                    onClick={() => setDescription(prev => !prev)}
                  >show more</button>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}
