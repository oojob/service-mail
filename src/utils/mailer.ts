// import hbs from 'nodemailer-express-handlebars'
// import nodemailer from 'nodemailer'
// import path from 'path'

// const { MAIL_HOST, MAIL_PORT, MAIL_AUTH_USER, MAIL_AUTH_PASS, MAILER_MODE, NODE_ENV } = proccess.env
// let transportConfig = {
// 	//service: 'SendGrid',
// 	host: MAIL_HOST,
// 	port: MAIL_PORT,
// 	auth: {
// 		user: MAIL_AUTH_USER,
// 		pass: MAIL_AUTH_PASS
// 	},
// 	secure: false,
// 	requireTLS: true
// }

// //returns jsonMessage in test mode
// if (MAILER_MODE === 'test') {
// 	transportConfig = {
// 		jsonTransport: true
// 	}
// }

// //development mode email
// //use maildev for receiving email
// if (NODE_ENV === 'development') {
// 	transportConfig = {
// 		host: 'localhost',
// 		port: 1025,
// 		secure: false,
// 		ignoreTLS: true
// 	}
// }

// const transport = nodemailer.createTransport(transportConfig)

// const options = {
// 	viewEngine: {
// 		extname: '.hbs',
// 		layoutsDir: './app/html/mail/',
// 		partialsDir: './app/html/mail/'
// 	},
// 	viewPath: './app/html/mail/',
// 	extName: '.html'
// }

// transport.use('compile', hbs(options))

// export default transport
