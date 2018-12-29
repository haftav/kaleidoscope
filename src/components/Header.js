import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    state = {
        headings: [
            {
                name: "HOME",
                link: '/',
            },
            {
                name: "PROFILE",
                link: '/profile'
            }
        ]
    }

    render() {
        return (
            <nav className={`Header ${this.props.moving ? 'Header__moving' : ''}`}>
                {
                    <ul className="Header_nav">
                        {
                            this.state.headings.map((heading) => {
                                return (
                                    // <Link to={heading.link} className="Header_nav_link" key={heading.name}>
                                    <a href="#" className="Header_nav_link" key={heading.name}>
                                        <li>{heading.name}</li>
                                    </a>
                                    // </Link>
                                )
                            })
                        }
                    </ul>
                }
            </nav>
        )
    }
}