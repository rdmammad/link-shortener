const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from})

        if (existing)
            return res.json({link: existing})

        const to = `${baseUrl}/t/${code}`
        const link = new Link({
            from,
            to,
            code,
            fk_user: req.user.userId
        })

        await link.save()

        res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong while generating a link...'})
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({fk_user: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong while retrieving all links...'})
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong while retrieving links for this user...'})
    }
})

module.exports = router;