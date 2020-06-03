import 'dotenv/config';
declare class MailServer {
    start: (port: number) => void;
}
declare const start: (port: number) => void;
export { start };
export default MailServer;
