import React, { Component } from 'react';
import axios from 'axios';

const ComponentWithSubscription = (ComponentToRender) => {
    return class extends Component {
        state = {
            images: []
        }

        componentDidMount() {
            axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}`).then(res => {
                let newImages = res.data.hits;
                this.setState({
                    images: newImages
                });
            })
        }

        handleClick = (searchTerm) => {
            console.log('here');
            console.log(searchTerm);
            if (searchTerm) {
                axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}`).then(res => {
                    console.log(res);
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
            return (
                <ComponentToRender handleClick={this.handleClick} images={this.state.images} {...this.props} />
            )
        }
    }
}

export default ComponentWithSubscription;