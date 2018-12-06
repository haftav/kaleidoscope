import React, { Component } from 'react';
import SearchBar from './Waterfall/SearchBar';

import axios from 'axios';

export default class Waterfall extends Component {
    state = {
        images: [],
        searchTerm: ''
    }

    handleInputChange = (e) => {
        console.log(e.target.value);
        let newTerm = e.target.value;
        this.setState({
            searchTerm: newTerm
        })
    }

    onLoad = (feedItem) => {
        this.setState({

        })
    }

    render() {
        return(
            <div className="Waterfall">
                <div className="Waterfall_spotlight">
                    <SearchBar handleInputChange={this.handleInputChange} handleClick={this.props.handleClick} value={this.state.searchTerm}/>
                </div>
                {
                    this.props.images.map(image => {
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