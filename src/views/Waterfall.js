import React, { Component } from 'react';
import SearchBar from './Waterfall/SearchBar';


export default class Waterfall extends Component {
    state = {
        loadedImages: [],
        searchTerm: '',
        loading: true
    }

    handleInputChange = (e) => {
        let newTerm = e.target.value;
        this.setState({
            searchTerm: newTerm
        })
    }

    handleClick = (searchTerm) => {
        if (!searchTerm) alert("Please enter a search term.");
        if (!Waterfall.searchTerm[searchTerm]) {
            Waterfall.searchTerm[searchTerm] = searchTerm;
            this.setState({
                loading: true,
                loadedImages: []
            })
            this.props.handleClick(searchTerm);
        } else {
            this.setState(() => {
                return {
                    loading: true,
                }
            }, () => setTimeout(() => this.setState({loading: false}), 250))
        }
    }

    onLoad = (feedItem) => {
        let newLoadedImages = [...this.state.loadedImages];
        newLoadedImages.push(feedItem);

        if (newLoadedImages.length >= this.props.images.length) {
            this.setState({
                loading: false,
                loadedImages: newLoadedImages
            })
        } else {
            this.setState({
                loadedImages: newLoadedImages
            })
        }
    }

    render() {
        let images = this.state.loadedImages.map(image => {
            return (
                <div className="image-wrapper" key={image.largeImageURL}>
                    <img src={image.largeImageURL} />
                </div>
            )
        });
        return (
            <div className="Waterfall">
                <div className="Waterfall_spotlight">
                    <SearchBar handleInputChange={this.handleInputChange} handleClick={this.handleClick} value={this.state.searchTerm} />
                </div>
                {
                    this.state.loading ? <div className="Waterfall_loading"><div className="Waterfall_loading_spinner"/></div> : images                
                }
                <div className="Waterfall_hidden">
                    {
                        this.props.images.map((image, i) => {
                            return <img
                                src={image.largeImageURL}
                                onLoad={() => this.onLoad(image)}
                                key={image.largeImageURL} />
                        })
                    }
                </div>
                
            </div>
        )
    }
}

Waterfall.searchTerm = {};

