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

export const readMail = (call: grpc.ServerUnaryCall<Id>, callback: grpc.sendUnaryData<Mail>): void => {
	const mail = new Mail()

	callback(null, mail)
}

export const sendMail = (
	call: grpc.ServerUnaryCall<SendMailReq>,
	callback: grpc.sendUnaryData<DefaultResponse>
): void => {
	console.log(call)
	const defaultResponse = new DefaultResponse()

	callback(null, defaultResponse)
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
