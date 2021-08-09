const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
	app.use(
		"/AnyHealth/*",
		createProxyMiddleware({
			target: 'http://192.168.1.195:8090',
			changeOrigin: true,
			// pathRewrite: {
			// 	"^/api": "",
			// },
			onError: (err, req, res) => console.log(err, req, res)
		})
	);
}

