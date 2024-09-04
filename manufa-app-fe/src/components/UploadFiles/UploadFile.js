import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // Đường dẫn tới file firebaseConfig.js

function FileUpload() {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Xử lý tiến trình tải lên nếu cần
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDownloadURL(url);
                        console.log("File available at", url);
                        // Gửi URL này đến server của bạn để lưu vào SQL Server
                    });
                }
            );
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {downloadURL && <p>File URL: {downloadURL}</p>}
            <img src={downloadURL}></img>
        </div>
    );
}

export default FileUpload;
