const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      stringType: 'lowercase',
      default: '-',
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
      stringType: 'lowercase',
      default: '-',
    },
    cost: {
      type: Number,
    },
    category: {
      type: String,
      trim: true,
      stringType: 'lowercase',
    },
    image: {
      type: String,
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

productsSchema.path('name').validate(value => {
  const re = /[A-Z]\w+/g;
  return re.test(String(value));
});

productsSchema.plugin(mongoosePaginate);

productsSchema.plugin(mongoosePaginate);
const Products = model('Products', productsSchema);

module.exports = Products;
