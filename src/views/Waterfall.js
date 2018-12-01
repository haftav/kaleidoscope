import React, { Component } from 'react';
import axios from 'axios';

export default class Waterfall extends Component {
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

    render() {
        return(
            <div className="Waterfall">
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