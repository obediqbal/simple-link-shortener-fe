import './App.css'
import React, {useEffect, useState} from 'react';

function App() {
  const [urlText, setUrlText] = useState(import.meta.env.VITE_SHORT_RESULT_URL+'/xxxxxx');
  const [inputOriginalText, setInputOriginalText] = useState('');
  const [inputShortText, setInputShortText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(loading) return;

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append('original_url', inputOriginalText);
    formData.append('short_url', inputShortText);
    
    const service = import.meta.env.VITE_SHORT_SERVICE_URL;
    
    await fetch(service, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        console.log(data);
        setUrlText(data);
        setInputOriginalText('');
        setInputShortText('');
        setLoading(false);
        return data;
    })
    .catch(error => {
        console.error('Error making POST request ', error.message)
      });
    }
  
  useEffect(() => {
    if(urlText.length == 0){
    }
  }, [urlText]);
    
  return (
    <>
      <h1>Link Shortener</h1>
      <form id='shortenerForm' onSubmit={handleSubmit}>
        <div id='originalContainer'>
          <label htmlFor='originalURL'>Link to be shortened</label>
          <input id='originalURL'
            name='originalURL'
            type='text'
            placeholder='https://google.com'
            value={inputOriginalText}
            onChange={(event) => setInputOriginalText(event.target.value)}>
          </input>
        </div>
        <div id='shortContainer'>
          <label htmlFor='shortURL'>Custom short link</label>
          <input id='shortURL'
            name='shortURL'
            type='text'
            placeholder='gugel'
            value={inputShortText}
            onChange={(event) => {
              if(parseInt(import.meta.env.VITE_MAX_SHORT_URL_LEN) >= event.target.value.length){
                setInputShortText(event.target.value)
                if(event.target.value.length == 0){
                  setUrlText(import.meta.env.VITE_SHORT_RESULT_URL+'/xxxxxx');
                }
                else{
                  setUrlText(import.meta.env.VITE_SHORT_RESULT_URL+'/'+event.target.value)
                }
              }
            }}>
          </input>
        </div>
        <button type='submit'>Shorten</button>
      </form>
      <p id='result'>{urlText}</p>
    </>
  )
}

export default App
