const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const productsSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      stringType: 'lowercase',
    },
    price: {
      type: Number,
    },
    picture: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      stringType: 'lowercase',
      default: '-',
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
    },
    favorite: {
      type: Boolean,
      default: false,
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

productsSchema.path('title').validate(value => {
  const re = /[A-Z]\w+/g;
  return re.test(String(value));
});

productsSchema.plugin(mongoosePaginate);

productsSchema.plugin(mongoosePaginate);
const Product = model('Product', productsSchema);

module.exports = Product;
