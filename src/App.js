import './App.css';
import React, { useState } from 'react';

// IPFS dependencies
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {

  // State
  const [file, setFile] = useState('');
  const [notesList, setNotesList] = useState([]);

  /**
   * Uploads a file to IPFS
   */
  const uploadFile = async () => {
    const { cid } = await client.add(file);
    
    if (notesList.find(note => note.cid === cid.toString())) {
      alert('This note has already been uploaded');
    } else {
      setNotesList([...notesList, { cid: cid.toString(), name: file.name }]);
    }
  };

  /**
   * Changes the file to upload next
   * @param {*} event the event for changing the file to upload
   */
  const changeFile = (event) => {
    setFile(event.target.files[0]);
  };

  // Construct the list of uploaded notes
  const list = (
    <ul>
      {(notesList || []).map(note => {
          return <li key={note.cid}>{note.name} - <a href={`https://ipfs.io/ipfs/${note.cid}`} target="_blank">{note.cid}</a></li>
        })}
    </ul>
  );

  return (
    <div className="App">
      <div>
        <h1>File Upload</h1>
        <input type="file" id="file" name="file" onChange={changeFile}></input>
        <button onClick={uploadFile}>Upload</button>
      </div>
      <div>
        <h1>Your Uploaded Notes</h1>
        {(notesList && notesList.length > 0) && list}
        {!(notesList && notesList.length > 0) && <p>No notes have been uploaded yet</p>}
      </div>
    </div>
  );
}

export default App;
