import React from 'react'
import Webcam from "react-webcam";
function Camera() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
             break;
          }
       }
    }
    return cookieValue;
 }
  const handleStartCaptureClick = React.useCallback(() => {
    console.log("Starting caputure")
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const fetchData = React.useCallback(()=>{
    console.log("Fetching data")

  })
  const handleStopCaptureClick = React.useCallback(() => {
    console.log("Stopped")
    mediaRecorderRef.current.stop();
    setCapturing(false);
    console.log("Recorded Chunks length",recordedChunks.length)
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    // console.log("recordedChunks",recordedChunks.length)
    let csrftoken = getCookie('csrftoken');
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      console.log("Blob conatins",blob.arrayBuffer())
      // converting blob to string
      // const reader = new FileReader();
      // reader.addEventListener("loadend", () => {
      //   // reader.result contains the contents of blob as a typed array
      // });
      // reader.readAsArrayBuffer(blob);
      // const reader = blob.stream()
      // console.log("Reader: ",reader)
      var form = new FormData();
      form.append('video', blob);
      var url = 'http://127.0.0.1:8000/api/task-create/'
      console.log("formdata: ",form)
      fetch(url, {
        method:'POST',
        contentType:false,
        processData: false,
        data:form
      }).then((response) =>{
          console.log("Posted....")
          fetchData()
      }).catch(function (e){
        console.log("Error: ",e)
      })
      setRecordedChunks([]);
    }
  }, [recordedChunks]);
  return (
    <>
    <h1>Camera is starting</h1>
      <Webcam audio={false} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  )
}

export default Camera