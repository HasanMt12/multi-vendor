const { model, Schema } = require('mongoose');

const merchantSchema = new Schema(
  {
    merchantId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['merchant'],
      default: 'merchant',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled'],
      default: 'active',
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    products: {
      type: [String],
      required: true,
      default: [],
    },
    website: {
      type: String,
      required: true,
      trim: true,
      default: 'https://www.merchant-website.com',
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: 'Merchant description',
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    notes: {
      type: [String],
      required: true,
      trim: true,
      default: [],
    },
    verificationInfo: {
      type: {
        nationalId: {
          type: String,
        },
        businessLicense: {
          type: String,
        },
      },
    },
    socialMedia: {
      type: {
        facebook: {
          type: String,
          trim: true,
        },
        twitter: {
          type: String,
          trim: true,
        },
        instagram: {
          type: String,
          trim: true,
        },
        youtube: {
          type: String,
          trim: true,
        },
      },
    },
    address: {
      type: {
        district: {
          type: String,
          required: true,
          trim: true,
          default: 'District',
        },
        city: {
          type: String,
          required: true,
          trim: true,
          default: 'City',
        },
        address1: {
          type: String,
          required: true,
          trim: true,
          default: 'Address 1',
        },
        address2: {
          type: String,
          trim: true,
        },
      },
    },
    reviews: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Merchant = model('Merchant', merchantSchema);

module.exports = Merchant;
