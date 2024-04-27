const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoansSchema = new mongoose.Schema(
    {
        disburse_date: {
            type: Date,
            required: true,
            default: new Date()
        },
        interest_rate: {
            type: Number,
            default: 3,
        },
        principal: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        start_month: {
            type: Date,
            required: true
        },
        monthly_deductions: {
            type: Number,
            required: true
        },
        initial_due_month: {
            type: Date,
            default: function () { return this.due_month; },
            required: true
        },
        due_month: {
            type: Date,
            required: true
        },
        balance: {
            type: Number,
            default: function () { return this.principal; },
            required: true
        },
        agreement_path: {
            type: String,
            // required: true,
        },
        landlord: {
            type: Schema.Types.ObjectId,
            ref: "Landlord",
            required: true
        },
        defered: { //this store the value if the loan is defere hence it becomes a new loan to which the pay only the interest
            type: Schema.Types.ObjectId,
            ref: "Loans",
        },
        transfered: { //a loan is transfered if the landlord takes a top up of the current loan or the landlord pays the loan in advance.
            type: Schema.Types.ObjectId,//stores the referencew to the previous loan
            ref: "Loans",
        },
        prepayment: { // this value store the ref to the prepayment that was transformed into a loan
            type: Schema.Types.ObjectId,
            ref: "Pre_Payment",
        },
        adhoc: [{ // this value store the ref to the adhoc that was transformed into a loan
            type: Schema.Types.ObjectId,
            ref: "Adhocs",
        }],
        loan_type: { //this is the mode of loaning //adhoc, fixed, prepayment
            type: String,
            enum: ['adhoc', 'fixed', 'prepayment', "topup", "partial_repayment"], //topup and partial repayment have reference in the transfered
            default: "fixed",
            required: true,
        },
        remarks: { //this is the mode of loaning //adhoc, fixed, prepayment
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Loans = mongoose.model("Loans", LoansSchema);

module.exports = Loans
