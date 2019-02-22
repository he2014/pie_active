import React, { Component } from 'react';

// import LazyLoad from 'react-lazyload';
import PropTypes from "prop-types"
// import Carousels from "./Carousel"
import "./list.css"
import asyncComponent from "../../components/AsyncComponent"
const Carousels = asyncComponent(() => import("./Carousel"))
class List extends Component {
    state = {
        imgList: null,
        modal: false,
        index: 0,
        defaultindex: 0
    }
    static propTypes = {
        data: PropTypes.array
    }
    imagError = (e) => {
        e.target.setAttribute('src', require("../../image/head.png"))
    }
    imagesDefault = (e) => {
        e.target.setAttribute("src", require("../../image/imgDefalt.png"))
    }
    imagesDefaultState = () => {
        this.setState({
            imgList: null
        })
    }
    onClose = () => {
        this.setState({
            modal: false
        })
    }
    setImageList = (e) => {
        this.setState({
            imgList: JSON.parse(e.target.dataset.obj),
            modal: true,
            index: Number(e.target.dataset.index)
        })

    }
    render() {
        const renderImageList = (data) => {
            if (!data.length) return null;
            // let list = null;
            if (data.length > 1) {
                return data.map((item, index) => (
                    <div className="images_item"><img data-index={index} onClick={this.setImageList} data-obj={JSON.stringify(data)} src={item} key={index} onError={this.imagesDefault} alt="" /></div>
                ))
            } else {
                return <img data-index={this.state.defaultindex} onClick={this.setImageList} data-obj={JSON.stringify(data)} style={{ "maxWidth": "100%" }} src={data[0]} alt="" />
            }
        }
        return (
            <div>
                {this.state.imgList ? <Carousels index={this.state.index} modal={this.state.modal} onClose={this.onClose} showModal={this.showModal} imgdefault={this.imagesDefaultState} data={this.state.imgList} /> : null}
                {this.props.data.map((item, index) => (
                    // <LazyLoad key={index} height="100%" once={true} >
                    <div key={index} style={{ backgroundColor: "#fff", padding: "38px", marginTop: "30px" }}>
                        <div className="topic_list_header">
                            <img src={item.head} alt="" onError={this.imagError} />
                            <span>{item.name}</span>
                        </div>
                        <div className="topic_list_txt">
                            <div className="topic_list_txt_title">
                                {item.title}
                            </div>
                            <div className="topic_list_txt_content">
                                {item.context}
                            </div>
                            <div className="topic_list_images">
                                {renderImageList(item.imgList)}
                            </div>
                        </div>
                    </div>
                    // </LazyLoad>

                ))}
            </div>
        );
    }
}

export default List;