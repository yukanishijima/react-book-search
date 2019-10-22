import React, { Component } from 'react';
import API from "../API";
import SearchCard from "./Card/SearchCard";

class Search extends Component {

  state = {
    result: [],
    searchInput: "",
  };

  searchBook = (input) => {
    API.searchBooks(input)
      .then(res => {
        document.querySelector("#search-input").value = "";
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
    if (document.querySelector("#search-input").value !== "") {
      this.searchBook(this.state.searchInput);
    }
  };


  render() {
    return (
      <main>

        <div className="title-container">
          <div className="title">
            <h1 id="message">You know you've read a good book when you turn the last page and feel a little as if you have lost a friend.</h1>
            <h2>- Paul Sweeney</h2>
            <div id="search-box">
              <label></label>
              <input onChange={this.handleInputChange} type="text" id="search-input" placeholder="Search any book..." />
              <button onClick={this.handleFormSubmit} id="search-button"><i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        {this.state.result.map(book =>
          <>
            <SearchCard
              id={book.id}
              image={book.volumeInfo.imageLinks.thumbnail}
              href={book.volumeInfo.previewLink}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors}
              published={book.volumeInfo.publishedDate}
              description={book.volumeInfo.description}
            />
          </>
        )}
      </main>
    )
  };
};

export default Search;