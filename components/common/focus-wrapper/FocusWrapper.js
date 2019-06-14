import React, { Component } from 'react';
import Router from 'next/router';

class FocusWrapper extends Component {

    _handleKeyDown = (event) => {
        const key = event.keyCode;
        const { navPrefix } = this.props;
        let prefix = navPrefix ? 'sub-' : '';
        
        switch (key) {
            case 84:
                let tag1 = document.getElementById(`${prefix}thinking`);
                tag1.className = "hover";
                this._timeout('/thinking');
                return;
            case 73:
                let tag2 = document.getElementById(`${prefix}investing`);
                tag2.className = "hover";
                this._timeout('/investing');
                return;
            case 66:
                let tag3 = document.getElementById(`${prefix}business`);
                tag3.className = "hover";
                this._timeout('/business');
                return;
            case 83:
                let tag4 = document.getElementById(`${prefix}science`);
                tag4.className = "hover";
                this._timeout('/science');
                return;
            case 70:
                let tag5 = document.getElementById(`${prefix}compounding`);
                tag5.className = "hover";
                this._timeout('/about');
                return;
        }
    }

    _timeout = (route) => {
        setTimeout(() => {
            Router.push(route)
        }, 500);
    }


    render() {
        const { children, refName } = this.props;

        return (
            <div tabIndex="1" onKeyDown={this._handleKeyDown} ref={refName} >
                {children}
            </div>
        );
    }
}

export default FocusWrapper;