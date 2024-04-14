import { useState, useRef } from "react";


const useRecorder = () => {

  const [permission, setPermission] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const chunks = useRef<Array<Blob>>([]);
  const VideoElement = useRef<HTMLVideoElement | null>(null);
  const RecordedVideo = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [url, seturl] = useState<string | null>(null);



  const getPermissions = async () => {
    try {
      const datastream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      setStream(datastream);
      setPermission(true);
      console.log(datastream)
    } catch (error) {
      console.log(error);
    }
  }


  const startVideo = async () => {
    try {
      if (!stream) {
        return getPermissions();
      }
      VideoElement.current.srcObject = stream;
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.onstart = () => {
        console.log("MediaRecorder started recording");
        mediaRecorder.current.ondataavailable = (event) => {
          chunks.current.push(event.data);
          const superbuffer = new Blob(chunks.current);
          const videoUrl = window.URL.createObjectURL(superbuffer)
          console.log(videoUrl);
          seturl(videoUrl);
        };
      };

      mediaRecorder.current.onerror = (error) => {
        console.error("MediaRecorder error:", error);
      };

      mediaRecorder.current.start();

    } catch (error) {
      console.error("Error starting video recording:", error);
    }
  };



  const shareScreen = async () => {
    try {
      const Datastream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always"
        },
        audio: false
      })
      setStream(Datastream);
      VideoElement.current.srcObject = Datastream;

      mediaRecorder.current = new MediaRecorder(Datastream);

      mediaRecorder.current.onstart = () => {
        console.log("MediaRecorder started recording");
        mediaRecorder.current.ondataavailable = (event) => {
          chunks.current.push(event.data);
          const superbuffer = new Blob(chunks.current);
          const videoUrl = window.URL.createObjectURL(superbuffer)
          console.log(videoUrl);
          seturl(videoUrl);
        };
      };

      mediaRecorder.current.onerror = (error) => {
        console.error("MediaRecorder error:", error);
      };

      mediaRecorder.current.start();


    } catch (error) {
      console.log(error)
    }
  }


  const stopVideo = async () => {
    console.log(chunks.current)
    try {
      mediaRecorder.current.stop();
      stream?.getTracks().forEach(track => {
        track.stop();
      })
    } catch (error) {
      console.log(error)
    }
  }


  return {
    permission,
    startVideo,
    stopVideo,
    shareScreen,
    url,
    VideoElement,
    mediaRecorder,
    RecordedVideo,
    getPermissions,
  }
}

export default useRecorder;

