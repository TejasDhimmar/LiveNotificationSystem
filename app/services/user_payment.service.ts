import { db } from "../config/db.confg";

const UserPament = db.user_payment;

const createPayment = async (payment: any) => {
    let paymentData = {
        user_id: payment.user_id,
        amount: payment.amount,
        transaction_id: payment.transaction_id,
        status: "Paid"
    }
    const data = await UserPament.create(paymentData);
    return data;
}

export {
    createPayment
}