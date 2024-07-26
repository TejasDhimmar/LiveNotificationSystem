import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { validation } from "../util/restResponse";

const notificationValidators = () => [
    check('title', 'Please enter title').not().isEmpty(),
    check('description', 'Please enter description').not().isEmpty(),
    check('channel_id', 'Please enter channel').not().isEmpty()
]

const notification = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return validation(res, 403, {}, errorMessages);
    }
    next();
}

const notificationValidation = {
    notification: [
        ...notificationValidators(),
        notification
    ]
}

export {
    notificationValidation
}