import React, { Component } from 'react';
import SearchBar from './Waterfall/SearchBar';
import _isEqual from 'lodash.isequal';

export default class Waterfall extends Component {
    state = {
        loadedImages: [],
        searchTerm: '',
        loading: true
    }

    componentDidUpdate(prevProps) {
        //This doesn't update if 2 searches return in a row with no results. May have to move loading logic to HOC
        if (this.props.images.length === 0 && prevProps.images.length !== 0) {
            this.setState({
                loading: false
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
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
        console.log(this.state.loadedImages)
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
                    (this.state.loading ? <div className="Waterfall_loading"><div className="Waterfall_loading_spinner"/></div> : images)         
                }
                {
                    this.props.images.length === 0 && !this.state.loading && <div>No images found.</div>
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

