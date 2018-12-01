import React from 'react';

export default class Header extends React.Component {
    state = {

    }


    render() {
        return (
            <div className={`Header ${this.props.moving ? 'Header Header_moving' : ''}`}>

            </div>
            
            
        )
    }
}