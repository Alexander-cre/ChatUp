import { ReactMic } from "react-mic";
import { useState } from "react";
import { storage, firestore } from "./firebase"; // your firebase setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function VoiceNote() {
  const [record, setRecord] = useState(false);

  const startRecording = () => setRecord(true);
  const stopRecording = async (recordedBlob) => {
    setRecord(false);
    const file = recordedBlob.blob;
    const storageRef = ref(storage, `voiceNotes/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(firestore, "messages"), {
      type: "voice",
      url,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={stopRecording}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onMouseDown={startRecording} onMouseUp={stopRecording}>
        Hold to Record
      </button>
    </div>
  );
}
