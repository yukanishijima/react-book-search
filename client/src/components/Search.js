import React, { Component } from 'react';
import API from "../API";
import socketIOClient from "socket.io-client";

// const endpoint = "";

// for testing with local machine
const endpoint = `localhost:${process.env.PORT || 3001}`;

class Search extends Component {

  state = {
    result: [],
    searchInput: "",
    endpoint: endpoint,
    title: ""
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
    if (document.querySelector("#search-input").value !== "") {
      this.searchBook(this.state.searchInput);
    }
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

                  this.setState({
                    title: bookData.volumeInfo.title
                  });

                  const socket = socketIOClient(this.state.endpoint);
                  socket.emit('message', this.state.title);
                  socket.on('message', (msg) => {
                    document.querySelector(".socket-msg p").innerHTML = msg;
                    document.querySelector(".socket-msg").classList.remove("hide");
                    setTimeout(() => {
                      document.querySelector(".socket-msg").classList.add("hide");
                    }, 2000);
                  });

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
          <div key={book.id}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book" />
            <p><a href={book.volumeInfo.previewLink}>{book.volumeInfo.title}</a></p>
            <p>{book.volumeInfo.authors}</p>
            <p>{book.volumeInfo.publishedDate}</p>
            <p>{book.volumeInfo.description}</p>
            <button id="save" onClick={this.handleSaveSubmit} name={book.id}>Save</button>
          </div>
        )}

      </main>
    )
  };
};

export default Search;