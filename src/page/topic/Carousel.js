import React, { Component } from 'react';
import { Carousel, Modal } from 'antd-mobile';
import "./carousel.css"
import PropTypes from 'prop-types'
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class Carousels extends Component {
    static propTypes = {
        data: PropTypes.array,
        index: PropTypes.number,
        modal: PropTypes.bool,
        onClose: PropTypes.func
    }
    state = {
        modal: false,
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    render() {
        return (
            <div>
                <Modal
                    closable={false}
                    visible={this.props.modal}
                    transparent
                    maskClosable
                    onClose={this.props.onClose}
                    title=""
                    wrapClassName="Modal"
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <Carousel
                        selectedIndex={this.props.index}
                        autoplay={false}
                        infinite
                        slideWidth="1080px"
                    >
                        {this.props.data.map((val, index) => (
                            <img
                                key={index}
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onClick={() => { this.props.onClose() }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                }}
                            />
                        ))}

                    </Carousel>
                </Modal>
            </div>
        );
    }
}

export default Carousels;