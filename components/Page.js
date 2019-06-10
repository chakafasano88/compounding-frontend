import React, { Component } from 'react';
import Header from './Header';
import { ToastContainer, cssTransition } from 'react-toastify';
import "../index.scss";
import Meta from './Meta';

class Page extends Component {
    render() {

        const Fade = cssTransition({
            enter: "toast--slide-in",
            exit: "toast--fade-out"
          });

        const { currentUser } = this.props; 
        return (
            <div>
                <ToastContainer
                    hideProgressBar={true}
                    transition={Fade}
                    draggable={false}
                    style={{
                    paddingLeft: 5,
                    fontSize: ".85rem"
                    }}
                 />
                 <Meta />
                <Header currentUser={currentUser} />
                {this.props.children}
                <footer></footer>
            </div>
        );
    }
}

export default Page;