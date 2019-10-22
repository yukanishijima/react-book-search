import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import API from "../../API";
import socketIOClient from "socket.io-client";

const useStyles = makeStyles({
  card: {
    width: "90vw",
    maxWidth: 480,
    background: "#f9f8f4",
    margin: 15,
    display: "inline-block",
    verticalAlign: "top",
    textAlign: "left",
  },
  media: {
    height: 170,
    backgroundSize: "contain",
    width: "46%",
    display: "inline-block",
  },
  cardActionArea: {
    background: "white",
  },
  cardTitle: {
    display: "inline-block",
    width: "50%",
    paddingRight: "4%",
    verticalAlign: "top",
  },
  cardFonts: {
    fontFamily: "'Abhaya Libre', sans-serif",
    fontSize: "1.7em",
    lineHeight: "1em",
    paddingBottom: 5,
  },
  aStyle: {
    textDecoration: "none",
    fontSize: "1em",
    color: "rgba(43, 42, 42, 0.9)",
  },
  subStyle: {
    color: "rgba(43, 42, 42, 0.9)",
  },
  pStyle: {
    height: 140,
    overflow: "hidden",
  },
  button: {
    border: "none",
    background: "#f7ebbf",
    borderRadius: 6,
    fontSize: 15,
    padding: "8px 17px",
    color: "rgba(43, 42, 42, 0.9)",
    '&:hover': {
      background: "#f1d87e",
    }
  },
});


function SearchCard(props) {

  const classes = useStyles();

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    const id = e.target.name;
    let buttonValue = e.target;

    API.searchOneBook(id)
      .then(res => {
        const bookData = res.data;

        API.findSavedBook(res.data.id)
          .then(savedBook => {
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

                  const title = bookData.volumeInfo.title
                  // const endpoint = `localhost:${process.env.PORT || 3001}`;

                  // const socket = socketIOClient(endpoint);
                  const socket = socketIOClient();
                  socket.emit('message', title);
                  socket.on('message', (msg) => {
                    console.log("socket is working!");
                    console.log(msg);
                    document.querySelector(".socket-msg p").innerHTML = msg;
                    document.querySelector(".socket-msg").classList.remove("hide");
                    setTimeout(() => {
                      document.querySelector(".socket-msg").classList.add("hide");
                    }, 3500);
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


  return (
    <Card className={classes.card}>
      <div key={props.id}>
        <CardActionArea className={classes.cardActionArea}>
          <a href={props.href} className={classes.aStyle}>
            <CardContent>
              <div className={classes.cardTitle}>
                <Typography variant="h6" component="h5" className={classes.cardFonts}>
                  {props.title}
                </Typography>
                <Typography variant="body2" component="p" className={classes.subStyle}>
                  {props.authors}
                  <br></br>
                  {props.published}
                </Typography>
              </div>
              <CardMedia
                className={classes.media}
                image={props.image}
                title="Book"
              />
            </CardContent>
          </a>
        </CardActionArea>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.pStyle}>
            {props.description}
          </Typography>
        </CardContent>

        <CardActions>
          <button id="save" onClick={handleSaveSubmit} name={props.id} className={classes.button}>
            Save
          </button>
        </CardActions>
      </div>
    </Card>
  );
}


export default SearchCard;