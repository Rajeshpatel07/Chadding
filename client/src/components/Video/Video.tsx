import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import useStreamer from '../../hooks/useStreamer';

const Video: React.FC = () => {

  const [edit, setEdit] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null); // Add a state variable to store the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [readonly, setReadonly] = useState<boolean>(false);

  const { localVideoRef, getCameraPermission, endStream, startStream, VideoTitle, getDisplayPermission, check, setCheck, Imageurl } = useStreamer();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEdit(true)
    setReadonly(true);
    startStream();
    Imageurl.current = previewUrl;
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); // Update the file state when a file is selected
    }
  }

  useEffect(() => {
    if (!file) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

  }, [file]);


  return (
    <div className="flex flex-col gap-3 justify-center w-full ">
      <video className='w-full  h-64  md:h-46  bg-black' ref={localVideoRef} autoPlay />
      <div className='flex justify-between items-center  flex-wrap p-5'>

        {/* Form Input */}
        <section className="flex flex-col justify-center w-full">
          <button className="btn" onClick={getCameraPermission}>getCameraPermission</button>
          <button className="btn" onClick={getDisplayPermission}>Screen Share</button>
          {edit &&
            <div className="flex justify-end ">
              <button className="px-6 py-2 rounded bg-gray-700 text-white text-lg"
                onClick={() => setReadonly(prev => !prev)}
              >{edit ? "Save" : "Edit"}</button>
            </div>
          }
          <div className='space-y-3'>
            <label className='text-white text-xl font-medium' htmlFor="title">Title
              <span className='text-red-500'>*</span>
            </label>
            <br />
            <input type="text" id='title' ref={VideoTitle} placeholder='Enter the video Title..' readOnly={readonly}
              className='py-2 px-2 text-lg placeholder-white text-white bg-black rounded-lg outline-none w-full md:w-[50vw]' />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="files" className="block text-xl text-white font-medium">Thumbnail
              <span className='text-red-500'>*</span>
            </label>
            <div className="flex flex-col items-center md:flex-row gap-5">
              <div className='flex flex-col gap-3 '>
                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-96" readOnly={readonly} />
                <p className='text-2xl text-white'>OR</p>
                <input type="text" id='Image_url' name='Image_url' onChange={(e) => setPreviewUrl(e.target.value)} placeholder='Enter the Thumbnail url' readOnly={readonly}
                  className='py-2 px-2 text-lg placeholder-white text-white bg-black rounded-lg outline-none w-full md:w-[50vw]' />
              </div>
              {previewUrl && <img src={previewUrl} alt="Preview" className="w-64" />}
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <input type="checkbox" id="checkbox" className="w-5 h-5" checked={check} onChange={() => setCheck(prev => !prev)} />
            <label htmlFor="checkbox" className="text-white text-md">If you want to upload you stream to the server</label>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <button className="px-10 py-3 rounded-lg bg-violet-500 text-xl text-white"
              onClick={handleSubmit}
            >Start</button>
            <button className="px-10 py-3 rounded-lg bg-violet-500 text-xl text-white"
              onClick={endStream}
            >Stop</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Video;
