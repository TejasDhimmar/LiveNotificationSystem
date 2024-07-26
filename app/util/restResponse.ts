import { Response } from "express";

const response = (res : Response, statusCode : number, dataObj = {}, resMessage = "") => {
    let msg = "";
    if (typeof resMessage == 'string') {
        msg = resMessage;
    } else {
        //msg = resMessage.join(',');
    }

    let data = {
        data: dataObj,
        message: msg
    }

    return res.status(statusCode).send(data);
}

const validation = (res : Response, statusCode : number, dataObj = {}, resMessage:string[] = []) => {
    let msg = "";
    if (typeof resMessage == 'string') {
        msg = resMessage;
    } else {
        msg = resMessage.join(',');
    }

    let data = {
        data: dataObj,
        message: msg
    }

    return res.status(statusCode).send(data);
}

export {
    response,
    validation
}