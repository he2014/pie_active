import React, { Component } from 'react';
import { Tabs, PullToRefresh, Button } from 'antd-mobile';
import asyncComponent from "../../components/AsyncComponent"
import util from "../../components/util"
import api from '../../api/api';
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { loginAction } from "../../store/login/"
import "./topic.css"

const List = asyncComponent(() => import("./List"))
function genData() {
    const dataArr = [];
    for (let i = 0; i < 100; i++) {
        if (i % 10 === 0) {
            dataArr.push({
                name: "Vincent",
                head: "",
                title: "#My favourite book#",
                context: "Honestly speaking, among all the books  I've read during my 16yHonestly speaking, among all the books  I've read during my 16y",
                imgList: [require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png')]
            });
        } else {
            if (i % 3 === 0) {
                dataArr.push({
                    name: "Vincent",
                    head: "",
                    title: "#My favourite book#",
                    context: "Honestly speaking, among all the books  I've read during my 16yHonestly speaking, among all the books  I've read during my 16y",
                    imgList: [require('../../image/5.jpg')]
                });
            } else {
                if (i % 7 ===0) {
                    dataArr.push({
                        name: "Vincent",
                        head: "",
                        title: "#My favourite book#",
                        context: "Honestly speaking, among all the books  I've read during my 16yHonestly speaking, among all the books  I've read during my 16y",
                        imgList: [require('../../image/6.jpg')]
                    });
                } else {
                    dataArr.push({
                        name: "Vincent",
                        head: "",
                        title: "#My favourite book#",
                        context: "Honestly speaking, among all the books  I've read during my 16yHonestly speaking, among all the books  I've read during my 16y",
                        imgList: [require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png'), require('../../image/imgDefalt.png')]
                    });
                }

            }
        }


    }
    return dataArr;
}

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            dataHot: [],
            dataNew: [],
            type: 0
        };
    }
    componentWillMount() {
        util.setviewport(1080);
    }
    componentDidMount() {

        setTimeout(() => this.setState({
            dataHot: genData(),
            dataNew: genData(),

        }), 0);
        //redux 存 token
        this.props.loginAction({ key: util.queryString(this.props.location.search, "token") });
        ReactDOM.findDOMNode(this.ptr).addEventListener("scroll", this.lisLening);
        ReactDOM.findDOMNode(this.ptrs).addEventListener("scroll", this.lisLening)
    }
    lisLening = () => {

        if (ReactDOM.findDOMNode(this.ptr).scrollTop > 100) {
            this.setState({
                down: false
            });
        } else {
            this.setState({
                down: true
            });
        }


    }
    onTabClick = (tab, index) => {
        if (index) {
            document.querySelector(".am-tabs-default-bar-underline").style.left = "71%"
        } else {
            document.querySelector(".am-tabs-default-bar-underline").style.left = "20%"
        }
        this.setState({
            type: index
        });

    }
    createTopic = () => {
        this.props.history.push("/topic/create")
    }
    onRefreshNew = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }
    //       loadingOpen //打开loading
    //      loadingClose  //关闭loading
    //      userCenter   // profile页
    //     openBar  //
    //    closeBar
    // loadingOpen = () => {
    //     util.Bridge("loadingOpen", "", "")
    // }
    // loadingClose = () => {
    //     util.Bridge("loadingClose", "", "")
    // }
    // userCenter = () => {
    //     util.Bridge("userCenter", { userId: "98982" }, "")
    // }
    // openBar = () => {
    //     util.Bridge("openBar", "", "")
    // }
    // closeBar = () => {
    //     util.Bridge("closeBar", "", "")
    // }

    render() {
        const tabs = [
            { title: 'new' },
            { title: 'hot' },
        ];
        return (
            <div className="topic_container">
                <div className="topic_container_header" >
                    {/* <Button onClick={this.loadingOpen}>openLoading</Button>
                    <Button onClick={this.loadingClose}>closeLoading</Button>
                    <Button onClick={this.openBar}>openBar</Button>
                    <Button onClick={this.closeBar}>closeBar</Button>
                    <Button onClick={this.userCenter}>profile页</Button> */}
                </div>
                <img style={{ marginTop: "170px", width: "100%", height: "258px" }} src={require("../../image/3.jpg")} alt="" />
                <div className="topic_container_context">
                    <Tabs
                        tabs={tabs}
                        onTabClick={this.onTabClick}
                        // initalPage={'t2'}
                        swipeable={false}
                        tabBarTextStyle={{ fontSize: "56px" }}
                        tabBarInactiveTextColor="#999999"
                        tabBarActiveTextColor="#333"
                        tabBarUnderlineStyle={{ border: "none", left: "20%", height: "16px", width: "100px", borderRadius: "8px", backgroundColor: "#ff0166" }}
                    >
                        <div className="tab_item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                            <PullToRefresh
                                damping={60}
                                ref={el => this.ptr = el}
                                style={{
                                    width: "100%",
                                    overflow: 'auto',
                                    height: "100%",
                                  
                                }}
                                indicator={this.state.down ? {} : { deactivate: '' }}
                                direction={this.state.down ? 'down' : 'up'}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefreshNew}
                            >
                                <List  data={this.state.dataNew}></List>
                            </PullToRefresh>
                        </div>
                        <div className="tab_item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                            <PullToRefresh
                                damping={60}
                                ref={el => this.ptrs = el}
                                style={{
                                    width: "100%",
                                    overflow: 'auto',
                                    height: "100%"
                                }}
                                indicator={this.state.down ? {} : { deactivate: '' }}
                                direction={this.state.down ? 'down' : 'up'}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefreshNew}
                            >
                                <List data={this.state.dataHot}></List>
                            </PullToRefresh>
                        </div>
                    </Tabs>
                </div>
            </div>

        );
    }
    componentWillUnmount() {
        ReactDOM.findDOMNode(this.ptr).removeEventListener("scroll");
        ReactDOM.findDOMNode(this.ptrs).removeEventListener("scroll");
    }

}

export default connect(null, { loginAction })(Topic)