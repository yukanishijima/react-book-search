import React, { Component } from 'react';
import API from "../API";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.loadBooks();
  };

  loadBooks = () => {
    API.getSavedBooks()
      .then(res => {
        console.log(res.data);
        this.setState({
          savedBooks: res.data
        })
      })
      .catch(err => console.log(err));
  };

  handleDelete = e => {
    e.preventDefault();
    const id = e.target.name;
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Saved Books</h1>

        {this.state.savedBooks.map(book =>
          <div key={book.bookId}>
            <img src={book.image} alt="book" />
            <p><a href={book.link}>{book.title}</a></p>
            <p>{book.authors}</p>
            <p>{book.published}</p>
            <p>{book.description}</p>
            <button onClick={this.handleDelete} name={book.bookId}>Delete</button>
          </div>
        )}

      </div>
    )
  };
};

export default Saved;