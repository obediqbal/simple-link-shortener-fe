import './App.css'
import React, {useState} from 'react';

function App() {
  const [urlText, setUrlText] = useState('');
  const [inputOriginalText, setInputOriginalText] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('original_url', inputOriginalText);

    await fetch('http://localhost:8080/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
      .then(response => {
        if(!response.ok){
          throw new Error("Not OK");
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        setUrlText(data);
        return data;
      })
      .catch(error => {
        console.error('Error making POST request ', error.message)
      });
  }

  return (
    <>
      <h1>Link Shortener</h1>
      <form id='shortenerForm' onSubmit={handleSubmit}>
        <input id='originalURL'
         name='originalURL'
        type='text'
        placeholder='https://google.com'
        value={inputOriginalText}
        onChange={(event) => setInputOriginalText(event.target.value)}></input>
        <button type='submit'>Shorten</button>
      </form>
      <p id='result'>{urlText}</p>
    </>
  )
}

export default App
