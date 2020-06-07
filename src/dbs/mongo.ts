import * as mongoose from 'mongoose'

import { connect } from 'mongoose'

class MongoConnection {
	public MONGO_HOST: string
	public MONGO_PORT: string
	public MONGO_DATABASE: string
	public MONGO_URI: string

	constructor() {
		const {
			MONGO_HOST = 'localhost',
			MONGO_PORT = '27017',
			MONGO_DATABASE = 'stayology_dev',
			MONGO_URI = ''
		} = process.env
		this.MONGO_HOST = MONGO_HOST
		this.MONGO_PORT = MONGO_PORT
		this.MONGO_DATABASE = MONGO_DATABASE
		this.MONGO_URI = MONGO_URI

		// this.app.logger.info('Initialized MongoConnection')
	}

	public connectDatabase = async () => {
		// this.app.logger.info('Connecting To Mongo ...')

		const connectionString = `mongodb://${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}`
		const connectionObject = {
			socketTimeoutMS: 0,
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		}

		try {
			connect(this.MONGO_URI === '' ? connectionString : this.MONGO_URI, { ...connectionObject })
			// this.app.logger.info('Connected To Mongo')
		} catch (error) {
			// this.app.logger.error(new Error('Error Creating MongDB Connection'))
			// this.app.logger.error(error)
			process.exit(1)
		}
	}

	public disconnectDatabase = async () => {
		try {
			await mongoose.connection.close()
			// this.app.logger.warn('Mongo Default Connection Is Disconnected Due To Application Termination')
		} catch (error) {
			// this.app.logger.error('Error Closing Mongo Connection')
			// this.app.logger.error(error)
			process.exit(1)
		}
	}
}

export default MongoConnection
