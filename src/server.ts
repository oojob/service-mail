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

class MailServer {
	public start = (port: number) => {
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
			server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())
			server.start()
		} catch ({ message }) {
			process.exit(1)
		}
	}
}

const { start } = new MailServer()

export { start }
export default MailServer
