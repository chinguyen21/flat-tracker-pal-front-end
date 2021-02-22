
import React, {useState, useEffect} from 'react';
import News from './News'

const Unauthorization = () => {
  
  const [allNews, setAllNews] = useState([])

  useEffect(() =>{
    fetch("http://localhost:3000/articles")
    .then(res => res.json())
    .then(setAllNews)
  },[])

  return (
    <header className="App-page">
      <h1 className="news-header">Welcome to FlatTrackerPal</h1>
      <div className="container-news">
        {allNews.map(news => {
          return <News key={news.id} news={news} />
        }) 
        }
      </div>
    </header>
  )
}

export default Unauthorization;