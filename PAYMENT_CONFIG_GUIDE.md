# ⚙️ Payment & Social Media Configuration Guide

## 🔧 Quick Configuration

All payment methods and social media links are configured in one file:

**File**: `src/constants/data.js`

---

## 🌐 Social Media Links Configuration

### Current Configuration

```javascript
export const SOCIAL_MEDIA = {
  instagram: 'https://instagram.com/butterflygallery',
  facebook: 'https://facebook.com/butterflygallery',
  tiktok: 'https://www.tiktok.com/@butterflyg510?_r=1&_t=ZS-95eOx6HpejJ',
  whatsapp: 'https://wa.me/201234567890',
};
```

### How to Update Links

Find the `SOCIAL_MEDIA` object in `src/constants/data.js` and update any link:

```javascript
export const SOCIAL_MEDIA = {
  instagram: 'https://instagram.com/YOUR_PROFILE',
  facebook: 'https://facebook.com/YOUR_PAGE',
  tiktok: 'https://www.tiktok.com/@YOUR_TIKTOK',
  whatsapp: 'https://wa.me/YOUR_NUMBER',
};
```

### Where It's Used

- **Footer**: All 4 social icons with links
- **Opens in**: New tab when clicked
- **Animation**: Hover effect with scale & color change

---

## 💳 Payment Methods Configuration

### Current Configuration

```javascript
export const PAYMENT_METHODS = {
  cod: {
    id: 'cod',
    labelAr: 'الدفع عند الاستلام',
    labelEn: 'Cash on Delivery',
    icon: '💵',
    description: {
      ar: 'ادفعي عند استلام طلبك',
      en: 'Pay when you receive your order',
    },
  },
  instapay: {
    id: 'instapay',
    labelAr: 'إنستاباي',
    labelEn: 'InstaPay',
    icon: '💳',
    link: 'https://ipn.eg/S/mmaa212197/instapay/4HqpqQ',
    description: {
      ar: 'ادفعي عبر إنستاباي بسهولة',
      en: 'Pay easily with InstaPay',
    },
  },
};
```

### How to Change InstaPay Link

Find the `PAYMENT_METHODS` object and update the InstaPay link:

```javascript
instapay: {
  // ... other properties
  link: 'https://YOUR_NEW_INSTAPAY_LINK_HERE',
  // ...
},
```

### How to Add New Payment Method

1. Add new method to `PAYMENT_METHODS` object:

```javascript
export const PAYMENT_METHODS = {
  cod: { /* ... */ },
  instapay: { /* ... */ },
  vodafone: {
    id: 'vodafone',
    labelAr: 'فودافون كاش',
    labelEn: 'Vodafone Cash',
    icon: '📱',
    link: 'https://YOUR_VODAFONE_LINK',
    description: {
      ar: 'ادفعي عبر فودافون كاش',
      en: 'Pay with Vodafone Cash',
    },
  },
};
```

2. Update the payment methods array in `src/pages/Checkout.jsx`:

Find this section:
```javascript
const paymentMethods = [
  {
    id: 'cod',
    label: lang === 'ar' ? PAYMENT_METHODS.cod.labelAr : PAYMENT_METHODS.cod.labelEn,
    icon: PAYMENT_METHODS.cod.icon,
    description: lang === 'ar' ? PAYMENT_METHODS.cod.description.ar : PAYMENT_METHODS.cod.description.en,
  },
  {
    id: 'instapay',
    label: lang === 'ar' ? PAYMENT_METHODS.instapay.labelAr : PAYMENT_METHODS.instapay.labelEn,
    icon: PAYMENT_METHODS.instapay.icon,
    description: lang === 'ar' ? PAYMENT_METHODS.instapay.description.ar : PAYMENT_METHODS.instapay.description.en,
  },
];
```

Add new method:
```javascript
const paymentMethods = [
  {
    id: 'cod',
    label: lang === 'ar' ? PAYMENT_METHODS.cod.labelAr : PAYMENT_METHODS.cod.labelEn,
    icon: PAYMENT_METHODS.cod.icon,
    description: lang === 'ar' ? PAYMENT_METHODS.cod.description.ar : PAYMENT_METHODS.cod.description.en,
  },
  {
    id: 'instapay',
    label: lang === 'ar' ? PAYMENT_METHODS.instapay.labelAr : PAYMENT_METHODS.instapay.labelEn,
    icon: PAYMENT_METHODS.instapay.icon,
    description: lang === 'ar' ? PAYMENT_METHODS.instapay.description.ar : PAYMENT_METHODS.instapay.description.en,
  },
  {
    id: 'vodafone',
    label: lang === 'ar' ? PAYMENT_METHODS.vodafone.labelAr : PAYMENT_METHODS.vodafone.labelEn,
    icon: PAYMENT_METHODS.vodafone.icon,
    description: lang === 'ar' ? PAYMENT_METHODS.vodafone.description.ar : PAYMENT_METHODS.vodafone.description.en,
  },
];
```

3. That's it! The new payment method now appears in checkout.

### Payment Method Object Structure

```javascript
{
  id: 'unique-id',                           // Unique identifier
  labelAr: 'Arabic Label',                   // Arabic display name
  labelEn: 'English Label',                  // English display name
  icon: '💳',                                // Emoji icon
  link: 'https://payment-link',              // (Optional) Payment URL
  description: {
    ar: 'Arabic description',                // Arabic description
    en: 'English description',               // English description
  },
}
```

---

## 📱 Payment Flow Logic

### For COD (Cash on Delivery)
```
1. User selects COD
2. No additional button appears
3. User clicks "Place Order"
4. Order is placed immediately
5. Status: "Pending"
```

### For InstaPay
```
1. User selects InstaPay
2. "Pay Now 💳" button appears
3. User clicks button → Payment link opens in new tab
4. Payment message shows with checkbox
5. User completes payment
6. User returns and checks "Payment Completed ✓"
7. User clicks "Place Order"
8. Order is placed
9. Status: "Pending"
```

---

## 🎨 Styling & Icons

### Available Emoji Icons
- 💵 Cash
- 💳 Credit Card
- 📱 Phone/Mobile
- 🏦 Bank
- 💰 Money
- 💸 Payment
- 📞 Call
- 📧 Email
- 🎁 Gift
- 🚚 Delivery

### How to Change Icons

In `PAYMENT_METHODS` object, update the `icon` property:

```javascript
cod: {
  // ...
  icon: '💰',  // Changed from '💵' to '💰'
  // ...
},
```

### Color System

The checkout uses these colors from the color palette:

```javascript
G.gold     = "#C9A84C"      // Main accent color
G.goldL    = "#F5ECD0"      // Light gold background
G.text     = "#2C1810"      // Text color
G.textL    = "#9B8878"      // Light text
G.bdr      = "#F0E0D8"      // Border color
G.white    = "#FFFFFF"      // White
G.pink     = "#F2C4CE"      // Pink
```

---

## 🌍 Translations

### Adding New Translations

1. In `TR.ar` object, add Arabic translations:

```javascript
ar: {
  // ... existing translations
  co: {
    // ... existing checkout translations
    newField: 'أنتِ محتاجة إضافة ترجمة عربية هنا',
  },
},
```

2. In `TR.en` object, add English translations:

```javascript
en: {
  // ... existing translations
  co: {
    // ... existing checkout translations
    newField: 'You need to add English translation here',
  },
},
```

### Current Payment Translations

**Arabic:**
```javascript
ar: {
  co: {
    pay: "طريقة الدفع",
    cod: "الدفع عند الاستلام",
    instapay: "إنستاباي",
    payBtn: "ادفعي الآن",
    payMsg: "يرجى إكمال الدفع وتأكيد طلبك",
    payConf: "تم إكمال الدفع ✓",
  },
}
```

**English:**
```javascript
en: {
  co: {
    pay: "Payment Method",
    cod: "Cash on Delivery",
    instapay: "InstaPay",
    payBtn: "Pay Now",
    payMsg: "Please complete the payment and confirm your order",
    payConf: "Payment Completed ✓",
  },
}
```

---

## 📝 Complete Example: Adding Vodafone Cash

### Step 1: Add to PAYMENT_METHODS

```javascript
export const PAYMENT_METHODS = {
  cod: { /* ... */ },
  instapay: { /* ... */ },
  vodafone: {
    id: 'vodafone',
    labelAr: 'فودافون كاش',
    labelEn: 'Vodafone Cash',
    icon: '📱',
    link: 'https://YOUR_VODAFONE_PAYMENT_LINK',
    description: {
      ar: 'ادفعي عبر فودافون كاش بسهولة وأمان',
      en: 'Pay securely with Vodafone Cash',
    },
  },
};
```

### Step 2: Add to Translations (if using different messages)

```javascript
ar: {
  co: {
    vodafone: 'فودافون كاش',
  },
},
en: {
  co: {
    vodafone: 'Vodafone Cash',
  },
},
```

### Step 3: Add to paymentMethods Array in Checkout.jsx

```javascript
const paymentMethods = [
  // ... COD ...
  // ... InstaPay ...
  {
    id: 'vodafone',
    label: lang === 'ar' ? PAYMENT_METHODS.vodafone.labelAr : PAYMENT_METHODS.vodafone.labelEn,
    icon: PAYMENT_METHODS.vodafone.icon,
    description: lang === 'ar' ? PAYMENT_METHODS.vodafone.description.ar : PAYMENT_METHODS.vodafone.description.en,
  },
];
```

### Done! ✅

Vodafone Cash now appears in the checkout.

---

## 🔄 Common Tasks

### Update InstaPay Link
**Location:** `src/constants/data.js`
```javascript
instapay: {
  // ...
  link: 'https://NEW_LINK_HERE',
},
```

### Add WhatsApp Link
**Location:** `src/constants/data.js`
```javascript
export const SOCIAL_MEDIA = {
  // ...
  whatsapp: 'https://wa.me/NEW_PHONE_NUMBER',
};
```

### Change Payment Button Text
**Location:** `src/constants/data.js`
```javascript
ar: {
  co: {
    payBtn: 'ادفعي الآن',  // Change this
  },
},
```

### Add New Emoji Icon
**Location:** `src/constants/data.js`
```javascript
somePaymentMethod: {
  // ...
  icon: '🎁',  // Change emoji
},
```

---

## ✅ Quick Checklist

When making changes:

- [ ] Update `SOCIAL_MEDIA` if changing social links
- [ ] Update `PAYMENT_METHODS` if changing payment methods
- [ ] Update `TR` object if changing text
- [ ] Add to `paymentMethods` array in Checkout.jsx if adding new payment
- [ ] Test in Arabic
- [ ] Test in English
- [ ] Test on mobile
- [ ] Verify payment links work

---

## 📊 File Locations

| Task | File | Location |
|------|------|----------|
| Update social links | `src/constants/data.js` | `SOCIAL_MEDIA` object |
| Update payment methods | `src/constants/data.js` | `PAYMENT_METHODS` object |
| Update payment text | `src/constants/data.js` | `TR` object → `co` section |
| Add payment method UI | `src/pages/Checkout.jsx` | `paymentMethods` array |
| Update footer | `src/components/Footer.jsx` | `SOCIAL_LINKS` array |

---

## 💡 Tips

1. **Backup Before Editing**: Copy file before making changes
2. **Test Changes**: Use `npm start` to test locally
3. **Check Console**: Look for errors in F12 → Console
4. **Mobile Test**: Test on actual mobile device
5. **Bilingual Test**: Test both AR and EN versions

---

## 🆘 Troubleshooting

### Payment method not showing?
- Check `paymentMethods` array in Checkout.jsx
- Verify `PAYMENT_METHODS` in constants/data.js

### Payment button not appearing?
- Ensure `link` property exists in payment method config
- Check payment method rendering logic in Checkout.jsx

### Social icon not showing?
- Verify link exists in `SOCIAL_MEDIA` object
- Check Footer.jsx for correct imports
- Clear browser cache

### Text not translating?
- Check both `TR.ar` and `TR.en` objects
- Verify spelling matches exactly
- Clear browser cache

---

🦋 **Configuration Guide Complete** ✨

**Remember:** All changes are in `src/constants/data.js` for configuration!
