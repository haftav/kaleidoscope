import React, { Component } from 'react';
import SearchBar from './Waterfall/SearchBar';

import axios from 'axios';

export default class Waterfall extends Component {
    state = {
        images: [],
        searchTerm: ''
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}`).then(res => {
            let newImages = res.data.hits;
            this.setState({
                images: newImages
            });
        })
    }

    handleInputChange = (e) => {
        console.log(e.target.value);
        let newTerm = e.target.value;
        this.setState({
            searchTerm: newTerm
        })
    }

    handleClick = () => {
        if (this.state.searchTerm) {
            axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${this.state.searchTerm}`).then(res => {
                let newImages = res.data.hits;
                this.setState({
                    images: newImages
                });
            });
        } else {
            alert("Please enter a search term.");
        }
    }

    render() {
        return(
            <div className="Waterfall">
                <div className="Waterfall_spotlight">
                    <SearchBar handleInputChange={this.handleInputChange} value={this.state.searchTerm}/>
                    <button onClick={this.handleClick}>Get Images</button>
                </div>
                {
                    this.state.images.map(image => {
                        return (
                            <div className="image-wrapper">
                                <img src={image.largeImageURL}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}