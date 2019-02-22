
import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import util from './components/util'
import config from './api/config'
// import { Button } from 'antd-mobile';
class Home extends Component {
    componentWillMount() {
        console.log(config)
        util.Bridge("sd", "ss", () => {

        })
        console.log(window)
        util.setviewport(1242)
    }
    render() {
        return (
            <div>
                404
            </div>
        );
    }
    linksaaa = () => {
        this.props.history.push("/home/aa")
    }
}

export default withRouter(Home);