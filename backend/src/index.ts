import cors from 'cors'
import express, { Request, Response } from 'express'
import { sampleProducts } from './data'

const app = express()
app.use(
  cors({
  credentials: true,
  origin: ['http://localhost:5174'],
})
)
app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts)
})
const PORT = 4000
app.listen(PORT, () => {
  console.log(`La vaina inicio en http://localhost:${PORT}`)
})