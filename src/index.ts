import 'dotenv/config'

import { normalizePort } from 'utils/normalize'
import { start } from 'server'

const { PORT } = process.env
const port = normalizePort(PORT || '8080')

start(port)
