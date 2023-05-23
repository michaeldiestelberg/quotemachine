import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTumblr } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import quotes from "./quotes.json";

function App() {
  return (
    <div className="container-fluid">
          <QuoteBox />
    </div>
  );
}

function QuoteBox() {
  const dynamicClassPartBackground = [
    "bg-primary",
    "bg-primary-subtle",
    "bg-secondary",
    "bg-secondary-subtle",
    "bg-success",
    "bg-success-subtle",
    "bg-danger",
    "bg-danger-subtle",
    "bg-warning",
    "bg-warning-subtle",
    "bg-info",
    "bg-info-subtle",
    "bg-dark",
    "bg-dark-subtle"
  ];

  function randomNumber(min, max) {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  };
  
  const [color, setColor] = useState(dynamicClassPartBackground[randomNumber(0, dynamicClassPartBackground.length)]);
  const initialQuoteSelect = randomNumber(0, quotes.quotes.length);
  const [quote, setQuote] = useState(quotes.quotes[initialQuoteSelect].quote);
  const [author, setAuthor] = useState(quotes.quotes[initialQuoteSelect].author);
  
  // Define corresponding button color based on the current background color
  const regex = /^bg-([a-z]+)-*[a-z]*$/ig;
  const buttonColor = "btn-" + color.replace(regex, "$1");

  function handleClick() {
    setColor(dynamicClassPartBackground[randomNumber(0, dynamicClassPartBackground.length)]);
    const quoteSelect = randomNumber(0, quotes.quotes.length);
    setQuote(quotes.quotes[quoteSelect].quote);
    setAuthor(quotes.quotes[quoteSelect].author);
  };

  return (
    <div className={`row justify-content-center align-items-center vh-100 ${color}`}>
      <div className='col-md-6 bg-white p-4' id="quote-box">
        <p className='text-center h3' id="text">{quote}</p>
        <p className='text-end fw-lighter' id="author">- {author}</p>
        <div className='row gy-2'>
          <div className='col-sm-6'>
            <div className='text-sm-start text-center'>
              <TwitterShareButton buttonColor={buttonColor} quote={quote} author={author} />
              <TumblrShareButton buttonColor={buttonColor} quote={quote} author={author} />
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='text-sm-end text-center'>
              <NewQuoteButton onClick={handleClick} buttonColor={buttonColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function NewQuoteButton({onClick, buttonColor}) {
  return(
    <button type="button" className={`btn ${buttonColor}`} onClick={onClick} id="new-quote">New Quote</button>
  );
};

function TwitterShareButton({buttonColor, quote, author}) {
  return (
    <a className={`btn ${buttonColor}`} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote).concat(" -", encodeURIComponent(author))}`} target="_blank" rel="noreferrer" id="tweet-quote"><FontAwesomeIcon icon={faTwitter} fixedWidth /></a>
  )
}

function TumblrShareButton({buttonColor, quote, author}) {
  return(
    <a className={`btn ms-2 ${buttonColor}`} href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(author)}&content=${encodeURIComponent(quote)}&canonicalUrl=${encodeURIComponent("https://www.tumblr.com/buttons")}`} target="_blank" rel="noreferrer" id="tumblr-quote"><FontAwesomeIcon icon={faTumblr} fixedWidth /></a>
  )
}

export default App;
