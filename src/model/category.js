const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

categorySchema.path('category').validate(value => {
  const re = [а - яА - ЯёЁa - zA - Z0 - 9] + $;
  return re.test(String(value));
});

categorySchema.plugin(mongoosePaginate);

const Category = model('Category', categorySchema);

module.exports = Category;
