const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amountProduct: {
      type: Number,
    },
    costProduct: {
      type: Number,
    },
    total: {
      type: Number,
    },
    productId: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

orderSchema.path('name').validate(value => {
  const re = /[A-Z]\w+/g;
  return re.test(String(value));
});

orderSchema.plugin(mongoosePaginate);

const Order = model('Order', orderSchema);

module.exports = Order;
