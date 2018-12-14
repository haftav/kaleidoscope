import React, { Component } from 'react';
import SearchBar from './Waterfall/SearchBar';
import _isEqual from 'lodash.isequal';

export default class Waterfall extends Component {
    state = {
        searchTerm: ''
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

    render() {
        let images = this.props.images.map(image => {
            return (
                <div className="image-wrapper" key={image}>
                    <img src={image} />
                </div>
            )
        })
        return (
            <div className="Waterfall">
                <div className="Waterfall_spotlight">
                    <SearchBar handleInputChange={this.handleInputChange} handleClick={this.props.handleClick} value={this.state.searchTerm} />
                </div>
                {
                    (this.props.loading ? <div className="Waterfall_loading"><div className="Waterfall_loading_spinner" /></div> : images)
                }
                {
                    this.props.images.length === 0 && !this.props.loading && <div>No images found.</div>
                }

            </div>
        )
    }
}
