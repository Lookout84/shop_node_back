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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
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
const Product = model('Product', productsSchema);

module.exports = Product;
