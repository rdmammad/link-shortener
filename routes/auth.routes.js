const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
[
            check('email', 'Not correct email').isEmail(),
            check('password', 'Min length is 6 symbols').isLength({min: 6}),
        ],
        async (req, res) => {
            try{
                const errors = validationResult(req)

                if(!errors.isEmpty())
                    return res.status(400).json({
                        errors: errors.array(),
                        message: 'Not valid data while registration',
                    })

                const {email, password} = req.body;
                const candidate = await User.findOne({email})

                if(!!candidate)
                    return res.status(400).json({message: `User with ${email} email already exists`})

                const hashedPwd = await bcrypt.hash(password, 12);
                const user = new User({email, password: hashedPwd});

                await user.save();
                res.status(201).json({message: `User successfully created`});

            } catch (e){
                res.status(500).json({message: 'Something went wrong on registering...'});
            }
        }
)

router.post(
    '/login',
    [
                check('email', 'Type in correct email').normalizeEmail().isEmail(),
                check('password', 'Enter password').exists(),
            ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty())
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not valid data while login',
                })

            const {email, password} = req.body;
            const user = await User.findOne({ email })
            console.log("body ", req.body);
            console.log("login ", user);

            if(!user)
                return res.status(400).json({message: `User with ${email} email not exists`})

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch)
                return res.status(400).json({message: `Password is not correct, try again`})

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
        } catch (e){
            res.status(500).json({message: 'Something went wrong on login...'});
        }
    }
)

module.exports = router;