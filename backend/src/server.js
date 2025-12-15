import express from 'express'
import cors from 'cors'
import cpRoutes from './routes/cp.routes.js'

const app = express()
app.use(cors())
app.use('/api/cp', cpRoutes)

app.listen(5000, () => {
  console.log('CP API running on port 5000')
})
