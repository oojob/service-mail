import 'dotenv/config'

import * as grpc from 'grpc'

import {
	check,
	getMailBox,
	getMailNotification,
	getMessageBox,
	readMail,
	sendMail,
	sendMessage,
	setMailNotification,
	watch
} from './mail.service'

import { MailServiceService } from '@oojob/protorepo-mail-node'
import MongoConnection from 'dbs/mongo'

class MailServer {
	public start = async (port: number) => {
		const mongoConnection = new MongoConnection()
		await mongoConnection.connectDatabase()

		const server = new grpc.Server()

		try {
			server.addService(MailServiceService, {
				readMail,
				sendMail,
				sendMessage,
				setMailNotification,
				watch,
				check,
				getMailBox,
				getMailNotification,
				getMessageBox
			})

			server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err: Error, port: number) => {
				if (err != null) {
					return console.error(err)
				}
				console.log(`gRPC listening on ${port}`)
			})
			server.start()
		} catch ({ message }) {
			process.exit(1)
		}
	}
}

const { start } = new MailServer()

export { start }
export default MailServer
