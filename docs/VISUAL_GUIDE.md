# 🎨 UI/UX Visual Guide

## 💳 Checkout Page Layout

### Desktop View

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Cart                                                          │
│                                                                          │
│  بيانات التوصيل                                                         │
│  Delivery Details                                                        │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  ┌─ FORM SECTION ─────────────────────┐  ┌─ ORDER SUMMARY ─────────┐  │
│  │                                     │  │  ملخص الطلب             │  │
│  │ الاسم الكامل                       │  │  Order Summary          │  │
│  │ [___________________________]       │  │                         │  │
│  │                                     │  │  [Product Image] Product 1  │
│  │ رقم الهاتف                         │  │  Qty: 2      850 EGP    │  │
│  │ [___________________________]       │  │                         │  │
│  │                                     │  │  [Product Image] Product 2  │
│  │ المحافظة                           │  │  Qty: 1      1450 EGP   │  │
│  │ [___________________▼]              │  │  ─────────────────────  │  │
│  │                                     │  │                         │  │
│  │ المنطقة / العنوان                  │  │  Subtotal: 3,150 EGP    │  │
│  │ [___________________________]       │  │  Shipping: Free         │  │
│  │                                     │  │  ─────────────────────  │  │
│  │ طريقة الدفع                        │  │  Total: 3,150 EGP       │  │
│  │                                     │  │                         │  │
│  │ ┌─────────────────────────────┐    │  └─────────────────────────┘  │
│  │ │ ● 💵 الدفع عند الاستلام     │    │                               │
│  │ │    ادفعي عند استلام طلبك    │    │                               │
│  │ └─────────────────────────────┘    │                               │
│  │                                     │                               │
│  │ ┌─────────────────────────────┐    │                               │
│  │ │ ○ 💳 إنستاباي              │    │                               │
│  │ │    ادفعي عبر إنستاباي بسهولة│    │                               │
│  │ └─────────────────────────────┘    │                               │
│  │                                     │                               │
│  │ [تأكيد الطلب - Place Order] ← Button │                               │
│  │                                     │                               │
│  └─────────────────────────────────────┘                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Mobile View

```
┌─────────────────────────────────┐
│ ← Back                            │
│ بيانات التوصيل                   │
│ Delivery Details                  │
│ ───────────────────────────────  │
│                                   │
│ الاسم الكامل                     │
│ [___________________]             │
│                                   │
│ رقم الهاتف                       │
│ [___________________]             │
│                                   │
│ المحافظة                         │
│ [___________▼]                    │
│                                   │
│ المنطقة / العنوان                │
│ [___________________]             │
│                                   │
│ طريقة الدفع                      │
│                                   │
│ ┌─────────────────────────────┐  │
│ │ ● 💵 الدفع عند الاستلام     │  │
│ │    ادفعي عند استلام طلبك    │  │
│ └─────────────────────────────┘  │
│                                   │
│ ┌─────────────────────────────┐  │
│ │ ○ 💳 إنستاباي              │  │
│ │    ادفعي بسهولة             │  │
│ └─────────────────────────────┘  │
│                                   │
│ [تأكيد الطلب - 100% width]        │
│                                   │
│ ─────────────────────────────────│
│ ملخص الطلب                        │
│ Order Summary                     │
│ Product 1 × 2: 850 EGP            │
│ Product 2 × 1: 1,450 EGP          │
│ ─────────────────────────────────│
│ Total: 3,150 EGP                  │
│                                   │
└─────────────────────────────────┘
```

---

## 💳 Payment Method Card States

### COD - Not Selected

```
┌──────────────────────────────────────────────────────────┐
│ ○ 💵 الدفع عند الاستلام                                 │
│    ادفعي عند استلام طلبك                                │
│                                                           │
│ Border: #F0E0D8 (Light gray)                            │
│ Background: #FFFFFF (White)                             │
│ Shadow: None                                             │
└──────────────────────────────────────────────────────────┘

Hover State:
┌──────────────────────────────────────────────────────────┐
│ ○ 💵 الدفع عند الاستلام                                 │
│    ادفعي عند استلام طلبك                                │
│                                                           │
│ Border: #C9A84C (Gold) ← Changed!                       │
│ Background: #FFFBF8 (Very light gold)                   │
│ Shadow: Subtle gold shadow                               │
└──────────────────────────────────────────────────────────┘
```

### COD - Selected

```
┌──────────────────────────────────────────────────────────┐
│ ● 💵 الدفع عند الاستلام                                 │
│    ادفعي عند استلام طلبك                                │
│                                                           │
│ Radio Button: ● (Filled with gold)                      │
│ Border: #C9A84C (Gold)                                  │
│ Background: #F5ECD0 (Light gold)                        │
│ Shadow: 0 4px 12px rgba(201, 168, 76, 0.2)             │
│ Text Weight: Bolder                                      │
└──────────────────────────────────────────────────────────┘
```

### InstaPay - Not Selected

```
┌──────────────────────────────────────────────────────────┐
│ ○ 💳 إنستاباي                                           │
│    ادفعي عبر إنستاباي بسهولة                           │
│                                                           │
│ Border: #F0E0D8 (Light gray)                            │
│ Background: #FFFFFF (White)                             │
│ Shadow: None                                             │
└──────────────────────────────────────────────────────────┘
```

### InstaPay - Selected (Without Payment Processing)

```
┌──────────────────────────────────────────────────────────┐
│ ● 💳 إنستاباي                                           │
│    ادفعي عبر إنستاباي بسهولة                           │
│                                                           │
│ Border: #C9A84C (Gold)                                  │
│ Background: #F5ECD0 (Light gold)                        │
│ Shadow: 0 4px 12px rgba(201, 168, 76, 0.2)             │
│                                                           │
│ └─ Payment Button Appears ──────────────────────────────┐
│    │ [ادفعي الآن 💳] (Pay Now Button)                   │
│    │ Background: #C9A84C (Gold)                         │
│    │ Color: White text                                   │
│    │ Shadow: 0 4px 12px rgba(201, 168, 76, 0.4)        │
│    └───────────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────┘
```

### InstaPay - Selected (After Payment Processing)

```
┌──────────────────────────────────────────────────────────┐
│ ● 💳 إنستاباي                                           │
│    ادفعي عبر إنستاباي بسهولة                           │
│                                                           │
│ └─ Payment Button (Clicked) ────────────────────────────┐
│    │ [ادفعي الآن 💳] (Opens new tab)                   │
│    └───────────────────────────────────────────────────┘
│                                                           │
│ └─ Payment Status Message ──────────────────────────────┐
│    │ ⓘ يرجى إكمال الدفع وتأكيد طلبك                    │
│    │ Please complete the payment and confirm order      │
│    │ Background: #FFF3E0 (Light orange)                 │
│    │ Border: 1px #FFB74D                                │
│    │ Text Color: #E65100                                │
│    └───────────────────────────────────────────────────┘
│                                                           │
│ └─ Payment Confirmation Checkbox ──────────────────────┐
│    │ ☐ تم إكمال الدفع ✓                               │
│    │ ☐ Payment Completed ✓                             │
│    │ (Click to check before placing order)             │
│    └───────────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────┘
```

### InstaPay - Confirmed

```
┌──────────────────────────────────────────────────────────┐
│ ● 💳 إنستاباي                                           │
│    ادفعي عبر إنستاباي بسهولة                           │
│                                                           │
│ └─ Payment Button ──────────────────────────────────────┐
│    │ [ادفعي الآن 💳]                                   │
│    └───────────────────────────────────────────────────┘
│                                                           │
│ └─ Payment Status Message ──────────────────────────────┐
│    │ ⓘ يرجى إكمال الدفع وتأكيد طلبك                    │
│    │ Please complete the payment and confirm order      │
│    └───────────────────────────────────────────────────┘
│                                                           │
│ └─ Payment Confirmation Checkbox ──────────────────────┐
│    │ ☑ تم إكمال الدفع ✓  ← CHECKED                    │
│    │ Payment Completed ✓                               │
│    │ (Now can place order)                             │
│    └───────────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────┘
```

---

## 🎬 Animation Details

### Social Icon Hover (Footer)

```
Normal State:
┌─────────────────────────┐
│   background: rgba(...) │
│   scale: 1.0            │
│   color: rgba(...)      │
│   transition: 0.25s     │
└─────────────────────────┘
         ↓ hover
Hover State:
┌─────────────────────────┐
│   background: rgba(...) │  ← Lighter
│   scale: 1.1            │  ← Enlarged 10%
│   color: #C9A84C (gold) │  ← Color changed
│   transition: 0.25s     │  ← Smooth
└─────────────────────────┘

Timeline:
0ms    ────────────────────────── 250ms
Start   Smooth scale up + color   End
```

### Payment Button Hover

```
Normal State:
┌─────────────────────────────────┐
│ Background: #C9A84C (Gold)      │
│ Shadow: 0 4px 12px rgba(...)    │
│ Transform: translateY(0)        │
│ Transition: 0.2s                │
└─────────────────────────────────┘
         ↓ hover
Hover State:
┌─────────────────────────────────┐
│ Background: #B89544 (Darker)    │
│ Shadow: 0 6px 16px rgba(...)    │
│ Transform: translateY(-2px)     │  ← Elevated
│ Transition: 0.2s                │
└─────────────────────────────────┘

Timeline:
0ms    ────────────────────── 200ms
Start  Smooth elevation      End
```

### Payment Card Hover

```
Normal State:
┌─────────────────────────────┐
│ Border: #F0E0D8             │
│ Background: #FFFFFF         │
│ Shadow: none                │
│ Transition: all .25s        │
└─────────────────────────────┘
         ↓ hover
Hover State:
┌─────────────────────────────┐
│ Border: #C9A84C (Gold)      │
│ Background: #FFFBF8 (Light) │
│ Shadow: 0 4px 8px rgba(...) │
│ Transition: all .25s        │
└─────────────────────────────┘
```

---

## 📱 Footer Social Icons

### Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│ BRAND          EXPLORE           CONTACT                    │
│ 🦋 Butterfly   • Home            • WhatsApp                 │
│ Gallery        • Shop            • hello@butterflygallery   │
│                • About           • Cairo, Egypt             │
│ Social Icons:  • Contact                                    │
│ [Icons Row]                                                  │
└─────────────────────────────────────────────────────────────┘

Social Icons Row (Detail):
┌──┐  ┌──┐  ┌──┐  ┌──┐
│📷│  │👍│  │🎵│  │💬│  ← Instagram, Facebook, TikTok, etc.
└──┘  └──┘  └──┘  └──┘

On Hover (any icon):
┌──────────────────────┐
│ Scale: 1.1           │
│ Color: #C9A84C (gold)│
│ Background: lighter  │
│ Animation: .25s      │
└──────────────────────┘
```

### Mobile Layout

```
┌──────────────────────────┐
│ BRAND                     │
│ 🦋 Butterfly Gallery     │
│ "Elegance Without Limits"│
│                           │
│ Social Icons (in row):    │
│ [📷] [👍] [🎵] [💬]     │
│                           │
│ EXPLORE                   │
│ • Home                    │
│ • Shop                    │
│ • About                   │
│ • Contact                 │
│                           │
│ CONTACT                   │
│ • WhatsApp                │
│ • hello@...               │
│ • Cairo, Egypt            │
└──────────────────────────┘
```

---

## 🌍 Bilingual Support

### Arabic Checkout (RTL - Right to Left)

```
RTL Layout: ────────────────────────────────────────────────────────
Direction is reversed from right to left
بيانات التوصيل              ← Title aligned RIGHT
الاسم الكامل               ← Label on RIGHT
[Input Field]               ← Input on LEFT

All animations and interactions work the same
Colors: Same as English
Icons: Same as English
```

### English Checkout (LTR - Left to Right)

```
LTR Layout: ────────────────────────────────────────────────────────
Direction is normal from left to right
Delivery Details           ← Title aligned LEFT
Full Name                  ← Label on LEFT
[Input Field]              ← Input on RIGHT

All animations and interactions work the same
Colors: Same as Arabic
Icons: Same as Arabic
```

---

## 📊 Color Scheme

### Colors Used

```
Gold (Primary):
└─ #C9A84C       Main accent, selected state, hover effects
└─ #F5ECD0       Light gold background for selected cards
└─ #B89544       Darker gold for button hover

Text:
└─ #2C1810       Dark brown, main text
└─ #6B4C3B       Medium brown, labels
└─ #9B8878       Light brown, secondary text

Backgrounds:
└─ #FDF8F5       Off-white page background
└─ #FFFFFF       White for inputs, cards
└─ #FFF3E0       Light orange for warning messages

Borders:
└─ #F0E0D8       Light border color
└─ #C9A84C       Gold border when focused/selected

Special:
└─ rgba(255,255,255,0.08)   Subtle overlay
└─ rgba(255,255,255,0.18)   Hover overlay
```

---

## 🎯 Responsive Breakpoints

### Mobile (< 640px)
```
Layout: Single column, full width
Payment cards: Stack vertically
Button: 100% width
Font: Readable sizes
Spacing: Touch-friendly (minimum 44px tap targets)
```

### Tablet (640px - 1024px)
```
Layout: Two columns for form + summary
Payment cards: Full width
Button: Full width
Font: Larger, readable
Spacing: Comfortable
```

### Desktop (> 1024px)
```
Layout: Two columns - Form (1fr) + Summary (320px)
Payment cards: Full width in form section
Button: Full width in form section
Font: Standard
Spacing: Professional
Shadow: Visible on cards
```

---

## ✨ Summary

### Visual Hierarchy

```
1. Payment Method Title (Largest, most important)
   "طريقة الدفع" / "Payment Method"

2. Payment Cards (Interactive)
   - Icon (large emoji)
   - Label (medium, bold when selected)
   - Description (small, gray)

3. Action Button (Gold, interactive)
   - "ادفعي الآن 💳" / "Pay Now 💳"

4. Status Messages (Important info)
   - Orange background for warnings
   - Checkbox for confirmation

5. Place Order Button (Primary CTA)
   - Gold background
   - Full width
   - Prominent position
```

### Design Principles

✅ **Consistency**
- Same colors throughout
- Same animation timing
- Same typography

✅ **Clarity**
- Clear payment options
- Obvious action buttons
- Simple form fields

✅ **Accessibility**
- High contrast colors
- Large touch targets
- Clear labels

✅ **Modern**
- Smooth animations
- Subtle shadows
- Clean spacing

---

🎨 **Visual Design Complete & Professional** ✨
