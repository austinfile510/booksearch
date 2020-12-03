import React from 'react';


const api_key = 'AIzaSyDdiw_RlWpe3SVA1zdDXlMvkXuJ7NyyW48';
const api_URL = 'https://www.googleapis.com/books/v1/volumes';

export default class App extends React.Component{
  state = {
    books: []
  }
  onSubmit= e => {
    e.preventDefault();
    const params = {
      api_key,
      q: e.target.q.value,
      printType: e.target.printType.value,
      filter: e.target.filter.value
    }
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    fetch(api_URL +'?'+ queryString)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          books: data.items || []
        })
      })

  }
   render() {
     return ( 
     <div>     
     <header>
       <h1>Google Book Search</h1>
       </header>
       <main>
       <h2>Search:</h2>
        <form
        onSubmit={this.onSubmit}
        >
        <input
        type='text'
        name='q'
        ></input>
        <button>Search</button>
        <h2>Print Type:</h2>
        <select
        name='printType'
        >
        <option>all</option>
        <option>books</option>
        <option>magazines</option>
        </select>
        <h2>Book Type:</h2>
        <select
        name='filter'
        >
          <option>ebooks</option>
          <option>free-ebooks</option>
          <option>full</option>
          <option>paid-ebooks</option>
          <option>partial</option>
        </select>
        </form>
        {this.state.books.map(book => (
          <div>
            <h2>{book.volumeInfo.title}</h2>
            <img src={book.volumeInfo.imageLinks.thumbnail} />
            <h3>Author: {book.volumeInfo.authors[0]}</h3>
            <p>Price: ${book.saleInfo.listPrice.amount}</p>
            <br />
            <p>{book.volumeInfo.description}</p>
          </div>
        )
        )}
        </main>
     </div>
     )}

};
