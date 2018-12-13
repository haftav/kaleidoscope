import React, { Component } from 'react';
import axios from 'axios';

const ComponentWithSubscription = (ComponentToRender) => {
    return class extends Component {
        state = {
            images: [],
            status: 'PENDING'
        }
        componentDidMount() {
            axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}`).then(res => {
                let newImages = res.data.hits;
                this.setState({
                    images: newImages,
                    status: 'COMPLETE'
                });
            }).catch((err) => {
                console.error(err);
                this.setState({
                    status: 'ERROR'
                })
            })
        }

        handleClick = (searchTerm) => {
                console.log(searchTerm);
                axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}`).then(res => {
                    let newImages = res.data.hits;
                    if (newImages.length === 0) {
                        throw new Error('No results found for that query.')
                    }
                    this.setState({
                        images: newImages,
                        status: 'COMPLETE'
                    });
                }).catch((e) => {
                    console.error(e);
                    this.setState({
                        images: [],
                        status: 'ERROR'
                    })
                });
        }
        render() {
            return (
                <ComponentToRender handleClick={this.handleClick} images={this.state.images} {...this.props} />
            )
        }
    }
}

export default ComponentWithSubscription;