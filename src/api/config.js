const dev = {
    imgUrl: "http://10.10.32.152:20000/",
    uploadUrl: "",
    baseUrl: "",


}

const production = {
    imgUrl: "//headpic-api.letspie.com/",
    uploadUrl: "",
    baseUrl: "",
}



export default process.env.NODE_ENV === "development" ? dev : production;