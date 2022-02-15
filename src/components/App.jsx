import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import 'index.css'

export default class App extends Component {
  state = {
    pictureName: '',
    page: 1,
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictureName={this.state.pictureName} page={this.state.page}/>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
