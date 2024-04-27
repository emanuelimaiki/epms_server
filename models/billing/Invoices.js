const mongoose = require("mongoose");
const { Invoices } = require("../../utils/helper");

const invoiceItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.ObjectId, ref: "Tenant", required: true },
    floor: { type: mongoose.Schema.ObjectId, ref: "Floorplan", required: true },
    invoice_no: { type: Number, default:0 },
    invoice_date: { type: Date, default: Date.now },
    due_date: { type: Date },
    amount: { type: Number, default: 0 },
    balance: {
      type: Number,
      default: function () {
        return this.amount;
      },
    }, //default value equals amount
    created_by: { type: String, default: "DEFAULT_USER" },
    type: { type: String, default: Invoices.Rent },
    revsd: { type: Boolean, default: false },
    isPenalty: { type: Boolean, default: false },
    isCreditNote: { type: Boolean, default: false }, // New field to indicate if it's a credit note
    originalInvoice: { type: mongoose.Schema.ObjectId, ref: "Invoice" }, // Reference to the original invoice
    remarks: { type: String, default: "DEFAULT_REMARKS" },
    sync: { type: String, default: "DEFAULT_SYNC_VALUE" },
    status: { type: Number, default: 0 }, //status 0 for unpaid and 1 for paid
    payment_type: {
      type: String,
      enum: ["unpaid", "paid", "forfeit", "prepayment"], //topup and partial repayment have reference in the transfered
      default: "unpaid",
      required: true,
    },
    items: [invoiceItemSchema],
    receipts: [{ type: mongoose.Schema.ObjectId, ref: "Receipt" }],
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.invoice_no) {
    try {
      const lastDocument = await Invoice.findOne(
        {},
        {},
        { sort: { invoice_no: -1 } }
      );
      doc.invoice_no = (lastDocument && lastDocument.invoice_no + 1) || 1;
      next();
      invoice_no;
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
