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

import { HealthCheckResponse } from '@oojob/oojob-protobuf/health_pb'
import sgMail from 'utils/mailer'
import { status } from 'grpc'

export const readMail = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<Mail>): void => {
	const mail = new Mail()

	callback(null, mail)
}

export const sendMail = (
	call: grpc.ServerUnaryCall<SendMailReq>,
	callback: grpc.sendUnaryData<DefaultResponse>
): void => {
	const { request } = call
	const mailRequest: sgMail.MailDataRequired = {
		from: request.getFrom(),
		text: request.getMessage(),
		subject: request.getSubject(),
		to: request.getTo()
	}

	const defaultResponse = new DefaultResponse()
	sgMail
		.send(mailRequest)
		.then(() => {
			defaultResponse.setStatus(true)
			defaultResponse.setCode(status.OK)
			defaultResponse.setError(null)

			callback(null, defaultResponse)
		})
		.catch(({ message, name }) => {
			const err = {
				code: status.INTERNAL,
				name,
				message
			}
			callback(err, null)
		})
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
