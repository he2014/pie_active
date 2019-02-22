import React, { Component } from 'react';
import { Carousel, Modal } from 'antd-mobile';
import "./carousel.css"
import PropTypes from 'prop-types'
import ReactDOM from "react-dom"

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

    componentDidMount(){
        ReactDOM.findDOMNode(this.mods).addEventListener('touchmove', e=>{
            e.preventDefault()
        }, { passive: false })
    }
    componentWillUnmount(){
        ReactDOM.findDOMNode(this.mods).removeEventListener('touchstart')
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
                    ref={el=>this.mods=el}
                    wrapClassName="Modal"                  
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