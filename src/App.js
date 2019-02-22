// import "core-js/es6/map"
// import "core-js/es6/set"
//import ''
import React, { Component } from 'react';
// import "babel-polyfill";

import './App.css';
import { Provider } from 'react-redux'
import store from "./store"
//BrowserRouter
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import { AppContainer } from 'react-hot-loader';
import asyncComponent from "./components/AsyncComponent"
import util from './components/util'
//react-intl 本地包
import { IntlProvider, addLocaleData } from 'react-intl';
import hi from 'react-intl/locale-data/hi';
import en from 'react-intl/locale-data/en';
import hi_Hi from './locale/hi.js';    //导入 i18n 配置文件
import en_CN from './locale/en.js';
//ant  组件国际化
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import hiIN from './locale/hi_locale'
addLocaleData([...hi, ...en]);
// router
const Topic = asyncComponent(() => import('./page/topic/Topic'))
const Createtopic = asyncComponent(() => import('./page/topic/Createtopic'))
class App extends Component {
  state = {
    language: "hi",
    messages: hi_Hi,
    antLocale: hiIN

  }
  componentWillMount() {
    const lan = util.queryString(window.location.href, "lan")
    if (lan && lan === "en") {
      this.setState({
        language: lan,
        messages: en_CN,
        antLocale: enUS
      })
    }
  }

  render() {
    return (
      <AppContainer>
        <LocaleProvider locale={this.state.antLocale}>
          <IntlProvider locale={this.state.language} messages={this.state.messages}>
            <Provider store={store}>
              <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/topic" component={Topic} />
                  <Route exact path="/topic/create" component={Createtopic} />
                </Switch>
              </Router>
            </Provider>
          </IntlProvider>
        </LocaleProvider>
      </AppContainer>
    );
  }
}

export default App;
