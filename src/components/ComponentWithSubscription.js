import React, { Component } from 'react';
import axios from 'axios';

const ComponentWithSubscription = (ComponentToRender) => {
    return class extends Component {
        state = {
            images: [],
            loadedImages: [],
            loading: true
        }

        componentDidMount() {
            axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}`).then(res => {
                let newImages = res.data.hits;
                this.setState({
                    images: newImages,
                }, () => this.preloadImages(newImages));
            }).catch((err) => {
                console.error(err);
            })
        }

        handleClick = (searchTerm) => {
            if (!searchTerm) return alert('Please provide a search term.');
            axios.get(`${process.env.REACT_APP_PIXABAY_API_URL}?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}`).then(res => {
                let newImages = res.data.hits;
                if (newImages.length === 0) throw new Error('No images found.')
                this.setState({
                    images: newImages,
                    loadedImages: [],
                    loading: true
                }, () => this.preloadImages(newImages));
            }).catch((e) => {
                console.error(e);
                this.setState({
                    images: [],
                    loadedImages: [],
                    loading: false
                })
            });
        }

        preloadImages = (images) => {
            images.forEach((image) => {
                const img = new Image();
                img.onload = () => this.handleLoad(image.largeImageURL)
                img.src = image.largeImageURL
            })
        }
        
        handleLoad = (imageSrc) => {
            let newLoadedImages = [...this.state.loadedImages];
            newLoadedImages.push(imageSrc);
            if (newLoadedImages.length === this.state.images.length) {
                this.setState({
                    loadedImages: newLoadedImages,
                    loading: false
                })
            } else {
                this.setState({
                    loadedImages: newLoadedImages
                })
            }
        }
        
        render() {
            console.log(this.state.loadedImages.length, this.state.loading)
            return (
                <ComponentToRender handleClick={this.handleClick} images={this.state.loadedImages} loading={this.state.loading} {...this.props} />
            )
        }
    }
}

export default ComponentWithSubscription;
