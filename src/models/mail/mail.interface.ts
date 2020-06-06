import { Document, Model, Types } from 'mongoose'

interface ITimestamp {
	seconds: number
	nanos: number
}
interface IMetadata {
	created_at: ITimestamp
	updated_at: ITimestamp
	published_date: ITimestamp
	end_date: ITimestamp
	last_active: ITimestamp
}
export interface IMailTemplate {
	attributes: Array<Map<string, string>>
	primary_color?: string
	secondary_color?: string
	logo?: string
	metadata: IMetadata
}

export interface IMailTemplateDocument extends IMailTemplate, Document {}
export interface IMailTemplateModel extends Model<IMailTemplateDocument> {}

interface IMessage {
	id: string
	message: string
	attachments: string
	created_at: ITimestamp
	read_at: ITimestamp
}

interface IMessageConversation {
	id: string
	to: string
	messages: Array<IMessage>
	metadata: IMetadata
}

interface IMailConversation {
	id: string
	from: string
	to: string
	subject: string
	messages: Array<IMessage>
	template: { type: Types.ObjectId | IMailTemplateDocument }
	metadata: IMetadata
}

export interface IUserMessageBox {
	conversations: Array<Map<string, IMessageConversation>>
	metadata: IMetadata
}

export interface IUserMessageBoxDocument extends IUserMessageBox, Document {}
export interface IUserMessageBoxModel extends Model<IUserMessageBoxDocument> {}

export interface IUserMailBox {
	conversations: Array<Map<string, IMailConversation>>
	metadata: IMetadata
}

export interface IUserMailBoxDocument extends IUserMailBox, Document {}
export interface IUserMailBoxModel extends Model<IUserMailBoxDocument> {}

interface IMailNotification {
	daily_digest: boolean
	new_direct_message: boolean
	new_mention: boolean
	new_message_in_threads: boolean
	new_thread_created: boolean
	weekly_digest: boolean
	new_event_created: boolean
	new_interview: boolean
}
export interface IMail {
	user_id: Types.ObjectId
	notifications: IMailNotification
	mail_templates: Array<{ type: Types.ObjectId | IMailTemplateDocument }>
	messages: Array<{ type: Types.ObjectId | IUserMessageBoxDocument }>
	mails: Array<{ type: Types.ObjectId | IUserMailBoxDocument }>
	meatata: IMetadata
}

export interface IMailDocument extends IMail, Document {}
export interface IMailModel extends Model<IMailDocument> {}
