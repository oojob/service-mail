import * as grpc from 'grpc'

import { DefaultResponse, Id } from '@oojob/oojob-protobuf'
import {
	Mail,
	MailNotifications,
	SendMailReq,
	SendMessageReq,
	UserMailBox,
	UserMessageBox
} from '@oojob/protorepo-mail-node/service_pb'
import { MailModel, UserMailBoxModel } from 'models/mail'

import { HealthCheckResponse } from '@oojob/oojob-protobuf/health_pb'
import sgMail from 'utils/mailer'
import { status } from 'grpc'

const metadata = {
	created_at: {
		seconds: Math.round(new Date().getTime() / 1000),
		nanos: new Date().getTime()
	},
	updated_at: {
		seconds: Math.round(new Date().getTime() / 1000),
		nanos: new Date().getTime()
	}
}

export const readMail = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<Mail>): void => {
	const mail = new Mail()

	callback(null, mail)
}

export const sendMail = async (
	call: grpc.ServerUnaryCall<SendMailReq>,
	callback: grpc.sendUnaryData<DefaultResponse>
): Promise<void> => {
	const { request } = call
	const user_id = request.getUserId()
	const to = request.getTo()
	const from = request.getFrom()
	const message = request.getMessage()
	const subject = request.getSubject()

	// default response
	const defaultResponse = new DefaultResponse()
	defaultResponse.setStatus(true)
	defaultResponse.setCode(status.OK)
	defaultResponse.setError(null)

	// mail request
	const mailRequest: sgMail.MailDataRequired = {
		text: message,
		from,
		subject,
		to
	}
	const messageBody = {
		message,
		created_at: metadata.created_at
	}

	try {
		const mailDoc = await MailModel.findOne({ user_id })
		if (mailDoc) {
			const userMailBox = await UserMailBoxModel.findOne({ to })
			if (userMailBox) {
				userMailBox.messages.push(messageBody)
				await userMailBox.save()
				await sgMail.send(mailRequest)

				callback(null, defaultResponse)
			} else {
				const userMailBox = new UserMailBoxModel({
					from,
					to,
					subject,
					messages: [messageBody],
					metadata
				})
				const userMailDoc = await userMailBox.save()
				mailDoc.mails.push(userMailDoc.id)
				await mailDoc.save()
				await sgMail.send(mailRequest)

				callback(null, defaultResponse)
			}
		} else {
			const userMail = new MailModel({ user_id })
			const userMailBox = new UserMailBoxModel({
				from,
				to,
				subject,
				messages: [messageBody],
				metadata
			})
			const userMailDoc = await userMailBox.save()
			userMail.mails.push(userMailDoc.id)
			await userMail.save()
			await sgMail.send(mailRequest)

			callback(null, defaultResponse)
		}
	} catch ({ message, name }) {
		const err = {
			code: status.INTERNAL,
			name,
			message
		}
		callback(err, defaultResponse)
	}
}

export const sendMessage = (
	call: grpc.ServerUnaryCall<SendMessageReq>,
	callback: grpc.sendUnaryData<DefaultResponse>
): void => {}
export const getMailNotification = (
	call: grpc.ServerUnaryCall<Id>,
	callback: grpc.sendUnaryData<MailNotifications>
): void => {}
export const getMailBox = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<UserMailBox>): void => {}
export const getMessageBox = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<UserMessageBox>): void => {}
export const setMailNotification = (
	call: grpc.ServerUnaryCall<Id>,
	callback: grpc.sendUnaryData<DefaultResponse>
): void => {}
export const check = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<HealthCheckResponse>): void => {}
export const watch = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<HealthCheckResponse>): void => {}
