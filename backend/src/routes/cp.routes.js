import express from 'express'
import { getCodeforces } from '../services/codeforces.service.js'
import { getCodeChef } from '../services/codechef.service.js'
import { getAtCoder } from '../services/atcoder.service.js'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const [cf, cc, ac] = await Promise.all([
      getCodeforces(),
      getCodeChef(),
      getAtCoder()
    ])

    res.json({
      codeforces: cf,
      codechef: cc,
      atcoder: ac
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch CP stats' })
  }
})

export default router
