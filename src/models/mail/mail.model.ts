import {
	IMailDocument,
	IMailModel,
	IMailTemplateDocument,
	IMailTemplateModel,
	IUserMailBoxDocument,
	IUserMailBoxModel,
	IUserMessageBoxDocument,
	IUserMessageBoxModel
} from './mail.interface'
import { Schema, model } from 'mongoose'

const Metadata = {
	created_at: { seconds: Number, nanos: Number },
	updated_at: { seconds: Number, nanos: Number },
	published_date: { seconds: Number, nanos: Number },
	end_date: { seconds: Number, nanos: Number },
	last_active: { seconds: Number, nanos: Number }
}

// Mailtemplate schema
export const MailTemplateSchema: Schema = new Schema({
	attributes: { type: Map, of: String },
	primary_color: { type: String },
	secondary_color: { type: String },
	logo: { type: String },
	metadata: Metadata
})
export const MailTemplateModel = model<IMailTemplateDocument, IMailTemplateModel>('Mailtemplate', MailTemplateSchema)

const Message = {
	id: { type: String },
	message: { type: String },
	created_at: { seconds: Number, nanos: Number },
	read_at: { seconds: Number, nanos: Number }
}

const MessageConversation = {
	id: { type: String },
	to: { type: String },
	messages: [Message],
	metadata: Metadata
}

const MailConversation = {
	id: { type: String },
	from: { type: String },
	to: { type: String },
	subject: { type: String },
	messages: [Message],
	template: { type: Schema.Types.ObjectId, ref: 'MailTemplate' },
	metadata: Metadata
}

export const UserMessageBoxSchema: Schema = new Schema({
	conversations: [{ type: Map, of: MessageConversation }],
	metadata: Metadata
})
export const UserMessageBoxModel = model<IUserMessageBoxDocument, IUserMessageBoxModel>(
	'UserMessage',
	UserMessageBoxSchema
)

export const UserMailBoxSchema: Schema = new Schema({
	conversations: [{ type: Map, of: MailConversation }],
	metadata: Metadata
})
export const UserMailBoxModel = model<IUserMailBoxDocument, IUserMailBoxModel>('UserMail', UserMailBoxSchema)

const MailNotifications = {
	daily_digest: { type: Boolean, default: true },
	new_direct_message: { type: Boolean, default: true },
	new_mention: { type: Boolean, default: true },
	new_message_in_threads: { type: Boolean, default: true },
	new_thread_created: { type: Boolean, default: true },
	weekly_digest: { type: Boolean, default: true },
	new_event_created: { type: Boolean, default: true },
	new_interview: { type: Boolean, default: true }
}

export const MailSchema: Schema = new Schema({
	user_id: { type: String },
	notifications: MailNotifications,
	mail_templates: [{ type: Schema.Types.ObjectId, ref: 'MailTemplate' }],
	messages: [{ type: Schema.Types.ObjectId, ref: 'UserMessage' }],
	mails: [{ type: Schema.Types.ObjectId, ref: 'UserMail' }],
	metadata: Metadata
})
export const MailModel = model<IMailDocument, IMailModel>('Mail', MailSchema)

export default MailModel
