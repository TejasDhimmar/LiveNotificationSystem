import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { validation } from "../util/restResponse";

const loginValidators = () => [
    check('email', 'Please enter email').not().isEmpty().isEmail().withMessage('Enter valid email'),
    check('password', 'Please enter password').not().isEmpty(),
]

const registrationValidators = () => [
    check('name', 'Please enter name').not().isEmpty(),
    check('email', 'Please enter email').not().isEmpty().isEmail().withMessage('Enter valid email'),
    check('mobileno', 'Please enter mobile no.').not().isEmpty().isNumeric().isLength({min:10, max: 10 }).withMessage("Enter valid mobile no."),
    check('password', 'Please enter password').not().isEmpty(),
]

const user = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return validation(res, 403, {}, errorMessages);
    }
    next();
}

const userValidation = {
    login: [
        ...loginValidators(),
        user
    ],
    register: [
        ...registrationValidators(),
        user
    ]
}

export {
    userValidation
}