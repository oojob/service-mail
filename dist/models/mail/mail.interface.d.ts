interface IMetadata {
}
interface IMailTemplate {
    id: string;
    attributes: Array<{
        [key: string]: string;
    }>;
    primary_color?: string;
    secondary_color?: string;
    logo?: string;
}
interface IMailNotification {
    daily_digest: boolean;
    new_direct_message: boolean;
    new_mention: boolean;
    new_message_in_threads: boolean;
    new_thread_created: boolean;
    weekly_digest: boolean;
    new_event_created: boolean;
    new_interview: boolean;
}
interface IMessage {
    id: string;
    message: string;
    attachments: string;
    created_at: Date;
    read_at: Date;
}
interface IMessageConversation {
    to: string;
    messages: Array<IMessage>;
    metadata: IMetadata;
}
interface MailConversation {
    from: string;
    to: string;
    subject: string;
    messages: Array<IMessage>;
    template: string;
    metadata: IMetadata;
}
