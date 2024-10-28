import {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from './ColorArray';

const quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote,setQuote] = useState("When I let go of what I am, I become what I might be.") 
  const [author,setAuthor] = useState("Lao Tzu")
  const [randomNumber,setRandomNumber] = useState(0)
  const [quotesArray,setQuotesArray] = useState(null)
  const [bgColor,setBgColor] = useState('#B71C1C')

  const fetchQuotes = async (url) =>{
    const response = await fetch(url)
    const parsedJson = await response.json()
    setQuotesArray(parsedJson.quotes)
  }
  
  useEffect(()=>{
    fetchQuotes(quotesUrl)
  },[quotesUrl])

  const changeQuotes = () =>{
    let randomNumber = Math.floor(quotesArray.length*Math.random());
    let randomBg = Math.floor(COLORS_ARRAY.length*Math.random());
    setRandomNumber(randomNumber)
    setQuote(quotesArray[randomNumber].quote)
    setAuthor(quotesArray[randomNumber].author)
    setBgColor(COLORS_ARRAY[randomBg])
  }

  

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: bgColor, color:bgColor}}>
        <div id="quote-box">
          <p id="text" style={{color:bgColor}}>
            "{quote}"
          </p>
          <p id="author" style={{color:bgColor}}>- {author}</p>
          <div className="buttons">
            <a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} target="_blank" style={{backgroundColor:bgColor}}> Tweet it</a>
            <button id="new-quote" onClick={()=>changeQuotes()} style={{backgroundColor:bgColor}}>New Quote</button></div>
        </div>
      </header>
    </div>
  );
}

export default App;
