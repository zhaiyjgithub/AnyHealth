const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
	app.use(
		"/AnyHealth/*",
		createProxyMiddleware({
			target: 'http://192.168.1.6:8090',//'http://192.168.1.195:8090',//'http://42.192.92.99:8090',
			changeOrigin: true,
			// pathRewrite: {
			// 	"^/api": "",
			// },
			onError: (err, req, res) => console.log(err, req, res)
		})
	);
}

