import React, { Component } from 'react';
import API from "../API";

class Search extends Component {
  state = {
    result: [],
    searchInput: ""
  };

  searchBook = (input) => {
    API.searchBooks(input)
      .then(res => {
        console.log(res.data.items);
        this.setState({
          result: res.data.items
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = e => {
    const value = e.target.value;
    this.setState({
      searchInput: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.searchBook(this.state.searchInput);
  };


  handleSaveSubmit = e => {
    e.preventDefault();
    const id = e.target.name;
    let buttonValue = e.target;

    API.searchOneBook(id)
      .then(res => {
        const bookData = res.data;

        API.findSavedBook(res.data.id)
          .then(savedBook => {
            // console.log(savedBook);
            if (savedBook.data.length === 0) {

              API.saveBook({
                bookId: bookData.id,
                title: bookData.volumeInfo.title,
                authors: bookData.volumeInfo.authors,
                published: bookData.volumeInfo.publishedDate,
                description: bookData.volumeInfo.description,
                image: bookData.volumeInfo.imageLinks.thumbnail,
                link: bookData.volumeInfo.previewLink
              })
                .then(res => {
                  console.log("let's save");
                  buttonValue.innerHTML = "Saved";
                });

            } else {
              console.log("already saved");
              buttonValue.innerHTML = "Already saved";
            }

          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        <h1>Message</h1>
        <div>
          <label></label>
          <input onChange={this.handleInputChange} type="search" id="book-search" placeholder="Search any book..." />
          <button onClick={this.handleFormSubmit}>Search</button>
        </div>
        {this.state.result.map(book =>
          <div key={book.id}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book" />
            <p><a href={book.volumeInfo.previewLink}>{book.volumeInfo.title}</a></p>
            <p>{book.volumeInfo.authors}</p>
            <p>{book.volumeInfo.publishedDate}</p>
            <p>{book.volumeInfo.description}</p>
            <button onClick={this.handleSaveSubmit} name={book.id}>Save</button>
          </div>
        )}
      </div >
    )
  };
};

export default Search;