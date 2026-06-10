// ─── Color Palette ────────────────────────────────────────────────────────────
export const G = {
  pink: "#F2C4CE", pinkL: "#FDF0F3", pinkD: "#D4899A",
  nude: "#E8D5C4", nudeD: "#C4A882",
  gold: "#C9A84C", goldL: "#F5ECD0",
  bg: "#FDF8F5", white: "#FFFFFF",
  text: "#2C1810", textM: "#6B4C3B", textL: "#9B8878",
  bdr: "#F0E0D8",
};

// ─── Typography ───────────────────────────────────────────────────────────────
// Unified system: Tajawal is the single UI font everywhere (storefront + admin,
// English + Arabic, headings + body + prices + codes). It's clean, modern and
// Arabic-friendly, so numbers/coupon codes/order IDs/Arabic all render
// consistently. `SERIF` is kept as an alias of the same stack so the many
// `fontFamily: SERIF` heading usages need no per-file edits.
export const FONT   = "'Tajawal', 'Jost', 'Segoe UI', sans-serif";
export const SERIF  = "'Tajawal', 'Jost', 'Segoe UI', sans-serif";
// Decorative serif reserved ONLY for the "Butterfly Gallery" brand wordmark/logo.
export const BRAND  = "'Cormorant Garamond', Georgia, serif";

// ─── Currency / price formatting (single source of truth) ───────────────────────
export const CURRENCY = { ar: 'جنيه', en: 'EGP' };
// Always Western digits + thousands separators, e.g. "1,850 جنيه" / "1,850 EGP".
export const formatPrice = (amount, lang = 'ar') =>
  `${Number(amount || 0).toLocaleString('en-US')} ${lang === 'ar' ? CURRENCY.ar : CURRENCY.en}`;

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  { id:1,  ar:"عقد ذهبي أنيق",         en:"Elegant Gold Necklace",     cat:"jewelry",     price:850,  old:1100, img:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80", stars:4.9, rc:124, isNew:true,  best:false, dAr:"عقد ذهبي فاخر مصنوع من الإستانلس ستيل المطلي بالذهب عيار ١٨. مثالي للمناسبات الرسمية والسهرات.",       dEn:"Luxurious gold necklace from 18K gold-plated stainless steel. Perfect for formal occasions." },
  { id:2,  ar:"حقيبة جلدية بيج",        en:"Beige Leather Bag",          cat:"handbags",    price:1450, old:null, img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", stars:4.8, rc:89,  isNew:false, best:true,  dAr:"حقيبة جلدية أنيقة باللون البيج. مثالية للاستخدام اليومي والسهرات.",                                          dEn:"Elegant beige leather bag, perfect for daily use and evening outings." },
  { id:3,  ar:"خاتم روز جولد",          en:"Rose Gold Ring",             cat:"jewelry",     price:420,  old:550,  img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80", stars:4.7, rc:203, isNew:false, best:true,  dAr:"خاتم روز جولد بتصميم عصري وأنيق، مناسب لكل المناسبات.",                                                      dEn:"Modern rose gold ring with elegant design, suitable for all occasions." },
  { id:4,  ar:"إسورة كريستال ذهبية",   en:"Crystal Gold Bracelet",      cat:"jewelry",     price:680,  old:null, img:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", stars:4.6, rc:67,  isNew:true,  best:false, dAr:"إسورة ذهبية مرصعة بكريستال شفاف، إضافة رائعة لأي إطلالة.",                                                  dEn:"Gold bracelet studded with clear crystals, a wonderful addition to any look." },
  { id:5,  ar:"نظارة شمسية أنيقة",     en:"Elegant Sunglasses",         cat:"accessories", price:390,  old:490,  img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", stars:4.5, rc:156, isNew:false, best:false, dAr:"نظارة شمسية بإطار ذهبي وعدسات بنية، أنيقة ومريحة.",                                                          dEn:"Sunglasses with gold frame and brown lenses, elegant and comfortable." },
  { id:6,  ar:"حقيبة صغيرة وردية",     en:"Pink Mini Bag",              cat:"handbags",    price:980,  old:1200, img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80", stars:4.9, rc:312, isNew:true,  best:true,  dAr:"حقيبة صغيرة باللون الوردي الفاتح تضفي لمسة أنثوية رائعة.",                                                   dEn:"Mini bag in light pink adds a wonderful feminine touch." },
  { id:7,  ar:"طقم مجوهرات كامل",      en:"Complete Jewelry Set",       cat:"jewelry",     price:1850, old:2400, img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80", stars:5.0, rc:45,  isNew:false, best:true,  dAr:"طقم مجوهرات متكامل يشمل عقد وأقراط وخاتم بتصميم منسق.",                                                      dEn:"Complete jewelry set including necklace, earrings, and ring." },
  { id:8,  ar:"وشاح حرير فاخر",        en:"Luxury Silk Scarf",          cat:"accessories", price:560,  old:null, img:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80", stars:4.4, rc:88,  isNew:false, best:false, dAr:"وشاح حرير فاخر بألوان متناسقة، خفيف وأنيق.",                                                                dEn:"Luxury silk scarf with harmonious colors, light and elegant." },
  { id:9,  ar:"حقيبة تسوق قماشية",    en:"Canvas Tote Bag",            cat:"handbags",    price:650,  old:800,  img:"https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80", stars:4.3, rc:134, isNew:false, best:false, dAr:"حقيبة تسوق قماشية أنيقة وعملية، مثالية للاستخدام اليومي.",                                                    dEn:"Elegant and practical canvas tote bag, perfect for daily use." },
  { id:10, ar:"أقراط دلايات ذهبية",   en:"Gold Drop Earrings",         cat:"jewelry",     price:345,  old:420,  img:"https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&q=80", stars:4.8, rc:267, isNew:true,  best:true,  dAr:"أقراط دلايات ذهبية بتصميم عصري وخفيف.",                                                                      dEn:"Modern and lightweight gold drop earrings." },
  { id:11, ar:"حزام جلدي ذهبي",        en:"Gold Leather Belt",          cat:"accessories", price:480,  old:null, img:"https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&q=80", stars:4.6, rc:78,  isNew:false, best:false, dAr:"حزام جلدي بإبزيم ذهبي، إضافة أنيقة لأي إطلالة.",                                                             dEn:"Leather belt with gold buckle, an elegant addition to any outfit." },
  { id:12, ar:"حقيبة سهرة مزخرفة",    en:"Embellished Evening Bag",    cat:"handbags",    price:1250, old:1600, img:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80", stars:4.9, rc:56,  isNew:true,  best:false, dAr:"حقيبة سهرة فاخرة مزخرفة بالكريستال، مثالية للمناسبات.",                                                      dEn:"Luxurious embellished evening bag with crystals, perfect for occasions." },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
export const REVIEWS_DATA = [
  { nameAr:"سارة محمد",   nameEn:"Sara Mohamed",   stars:5, cityAr:"القاهرة",     cityEn:"Cairo",      textAr:"منتجات رائعة وجودة عالية! الشحن كان سريع والتغليف جميل جداً. سأشتري مرة ثانية",                textEn:"Amazing products and high quality! Shipping was fast and packaging was beautiful. Will buy again" },
  { nameAr:"نورا أحمد",   nameEn:"Nora Ahmed",     stars:5, cityAr:"الإسكندرية", cityEn:"Alexandria", textAr:"اشتريت العقد الذهبي وكان أجمل مما توقعت. الجودة ممتازة والسعر مناسب جداً!",                    textEn:"I bought the gold necklace and it was more beautiful than expected. Excellent quality and great value!" },
  { nameAr:"مريم إبراهيم", nameEn:"Mariam Ibrahim", stars:5, cityAr:"الجيزة",      cityEn:"Giza",       textAr:"أفضل متجر للإكسسوارات في مصر. الأسعار مناسبة والخدمة ممتازة ومحترفة",                          textEn:"Best accessories store in Egypt. Reasonable prices and excellent professional service" },
];

// ─── Egyptian Governorates ────────────────────────────────────────────────────
export const GOVS = {
  ar: ["القاهرة","الجيزة","الإسكندرية","الشرقية","الدقهلية","البحيرة","المنيا","القليوبية","أسيوط","سوهاج","الغربية","الإسماعيلية","بورسعيد","السويس","المنوفية","الفيوم","بني سويف","دمياط","الأقصر","أسوان","قنا"],
  en: ["Cairo","Giza","Alexandria","Sharkia","Dakahlia","Beheira","Minya","Qalyubia","Asyut","Sohag","Gharbia","Ismailia","Port Said","Suez","Monufia","Faiyum","Beni Suef","Damietta","Luxor","Aswan","Qena"],
};

// ─── Translations ─────────────────────────────────────────────────────────────
export const TR = {
  ar: {
    brand:"Butterfly Gallery", tagline:"أناقة لا حدود لها", curr:"جنيه",
    nav:    { home:"الرئيسية", shop:"المتجر", about:"من نحن", contact:"تواصلي", wishlist:"المفضلة", cart:"السلة", login:"دخول", logout:"تسجيل الخروج", signup:"إنشاء حساب", myorders:"طلباتي", account:"حسابي", ph:"ابحثي..." },
    hero:   { badge:"✦ كولكشن ربيع ٢٠٢٥", t1:"أناقتكِ", t2:"عالمنا", sub:"اكتشفي أجمل المجوهرات والإكسسوارات والحقائب المختارة بعناية لكِ", cta:"تسوقي الآن", cta2:"شاهدي الكولكشن" },
    cats:   { title:"تسوقي بالتصنيف", jewelry:"مجوهرات", accessories:"إكسسوارات", handbags:"حقائب" },
    feat:   { title:"المنتجات المميزة", sub:"اختيارات مميزة بعناية لكِ", all:"عرض الكل" },
    rev:    { title:"آراء عملائنا", sub:"يثقون بنا من كل أرجاء مصر" },
    news:   { title:"انضمي لعالم Butterfly", sub:"اشتركي واحصلي على خصم ١٠٪ على أول طلب", ph:"بريدك الإلكتروني", btn:"اشتركي الآن" },
    prod:   { addCart:"أضيفي للسلة", addWish:"أضيفي للمفضلة", share:"شاركي", related:"منتجات مشابهة", inStock:"متوفر", qty:"الكمية" },
    shop:   { title:"المتجر", all:"الكل", jewelry:"مجوهرات", accessories:"إكسسوارات", handbags:"حقائب", newest:"الأحدث", best:"الأكثر مبيعاً", pAsc:"السعر: الأقل", pDesc:"السعر: الأعلى", noRes:"لا توجد نتائج", qv:"عرض سريع" },
    cart:   { title:"سلة التسوق", empty:"سلتك فارغة", emptySub:"ابدئي التسوق واكتشفي منتجاتنا", checkout:"إتمام الطلب", subtotal:"الإجمالي", ship:"الشحن", free:"مجاني", disc:"كود الخصم", apply:"تطبيق", saved:"توفيرك", cont:"متابعة التسوق", sum:"ملخص الطلب" },
    co:     { title:"بيانات التوصيل", name:"الاسم الكامل", phone:"رقم الهاتف", gov:"المحافظة", area:"المنطقة / العنوان", pay:"طريقة الدفع", cod:"الدفع عند الاستلام", instapay:"إنستاباي", payBtn:"ادفعي الآن", payMsg:"يرجى إكمال الدفع وتأكيد طلبك", payConf:"تم إكمال الدفع ✓", payUpload:"رفع لقطة الدفع", payUploadDesc:"رفع صورة تأكيد الدفع (JPG أو PNG)", payCheckbox:"لقد أكملت الدفع", place:"تأكيد الطلب", total:"إجمالي الطلب", back:"رجوع" },
    conf:   { title:"تم تأكيد طلبك! 🎉", sub:"شكراً لكِ على ثقتك في Butterfly Gallery", msg:"سيتم التواصل معكِ خلال ٢٤ ساعة لتأكيد التوصيل", created:"تم إنشاء طلبك بنجاح. يمكنك متابعة حالة الطلب من طلباتي." },
    about:  { title:"قصتنا", story:"Butterfly Gallery هي وجهة المرأة المصرية العصرية التي تبحث عن الأناقة والتميز.", vis:"رؤيتنا", visT:"أن نكون الوجهة الأولى للمرأة العربية الباحثة عن الأناقة الراقية بأسعار مناسبة.", mis:"مهمتنا", misT:"تقديم تجربة تسوق فريدة تجمع بين الجودة والأناقة والخدمة الاستثنائية." },
    contact:{ title:"تواصلي معنا", name:"الاسم", email:"البريد الإلكتروني", msg:"رسالتك", send:"إرسال الرسالة", wa:"تواصلي عبر واتساب", addr:"" },
    wish:   { title:"المفضلة", empty:"قائمة المفضلة فارغة", emptySub:"أضيفي المنتجات التي تحبيها هنا", shop:"تسوقي الآن" },
    myOrders:{ title:"طلباتي", loginNeeded:"يرجى تسجيل الدخول لعرض طلباتك", empty:"لا توجد طلبات بعد", emptySub:"ابدئي التسوق وستظهر طلباتك هنا" },
    auth:   { login:"تسجيل الدخول", signup:"إنشاء حساب", name:"الاسم", email:"البريد الإلكتروني", phone:"رقم الهاتف (اختياري)", password:"كلمة المرور", loginBtn:"دخول", signupBtn:"إنشاء الحساب", haveAcc:"لديكِ حساب؟", noAcc:"ليس لديكِ حساب؟", welcome:"مرحباً", errEmailExists:"هذا البريد مسجل بالفعل", errNoEmail:"البريد غير مسجل", errWrongPass:"كلمة المرور غير صحيحة", errFields:"يرجى ملء جميع الحقول", errAdminEmail:"هذا البريد مخصص لدخول الأدمن.", loginOk:"تم تسجيل الدخول ✓", signupOk:"تم إنشاء الحساب ✓", logoutOk:"تم تسجيل الخروج" },
    unavailable:"غير متوفر",
    popup:  { title:"مرحباً بكِ في Butterfly! 🦋", sub:"احصلي على خصم ١٥٪ على أول طلب", code:"BUTTERFLY15", close:"لا شكراً", cta:"تسوقي الآن" },
    badges: { n:"جديد", b:"الأكثر مبيعاً", s:"تخفيض" },
    addedCart:"تمت الإضافة للسلة ✓", addedWish:"تمت الإضافة للمفضلة ✓", rmWish:"تمت الإزالة",
    discOk:"تم تطبيق الكود! خصم ١٥٪ ✓", discFail:"كود غير صحيح", subOk:"شكراً! تم الاشتراك ✓",
  },
  en: {
    brand:"Butterfly Gallery", tagline:"Elegance Without Limits", curr:"EGP",
    nav:    { home:"Home", shop:"Shop", about:"About", contact:"Contact", wishlist:"Wishlist", cart:"Cart", login:"Login", logout:"Logout", signup:"Sign up", myorders:"My Orders", account:"Account", ph:"Search..." },
    hero:   { badge:"✦ Spring Collection 2025", t1:"Your", t2:"Elegance", sub:"Discover the finest jewelry, accessories & handbags curated just for you", cta:"Shop Now", cta2:"View Collection" },
    cats:   { title:"Shop by Category", jewelry:"Jewelry", accessories:"Accessories", handbags:"Handbags" },
    feat:   { title:"Featured Products", sub:"Carefully curated selections for you", all:"View All" },
    rev:    { title:"Customer Reviews", sub:"Trusted by women across Egypt" },
    news:   { title:"Join the Butterfly World", sub:"Subscribe and get 10% off your first order", ph:"Your email address", btn:"Subscribe Now" },
    prod:   { addCart:"Add to Cart", addWish:"Add to Wishlist", share:"Share", related:"Related Products", inStock:"In Stock", qty:"Quantity" },
    shop:   { title:"Shop", all:"All", jewelry:"Jewelry", accessories:"Accessories", handbags:"Handbags", newest:"Newest", best:"Best Selling", pAsc:"Price: Low to High", pDesc:"Price: High to Low", noRes:"No results found", qv:"Quick View" },
    cart:   { title:"Shopping Cart", empty:"Your cart is empty", emptySub:"Start shopping and discover our beautiful products", checkout:"Proceed to Checkout", subtotal:"Subtotal", ship:"Shipping", free:"Free", disc:"Discount Code", apply:"Apply", saved:"Savings", cont:"Continue Shopping", sum:"Order Summary" },
    co:     { title:"Delivery Details", name:"Full Name", phone:"Phone Number", gov:"Governorate", area:"Area / Detailed Address", pay:"Payment Method", cod:"Cash on Delivery", instapay:"InstaPay", payBtn:"Pay Now", payMsg:"Please complete the payment and confirm your order", payConf:"Payment Completed ✓", payUpload:"Upload Payment Screenshot", payUploadDesc:"Upload your payment confirmation (JPG or PNG)", payCheckbox:"I have completed the payment", place:"Place Order", total:"Order Total", back:"Back" },
    conf:   { title:"Order Confirmed! 🎉", sub:"Thank you for trusting Butterfly Gallery", msg:"We will contact you within 24 hours to confirm delivery", created:"Your order has been created successfully. You can track its status from My Orders." },
    about:  { title:"Our Story", story:"Butterfly Gallery is the destination for the modern Egyptian woman seeking elegance and distinction.", vis:"Our Vision", visT:"To be the premier destination for the Arab woman seeking refined elegance at accessible prices.", mis:"Our Mission", misT:"Delivering a unique shopping experience combining quality, elegance, and exceptional service." },
    contact:{ title:"Contact Us", name:"Name", email:"Email", msg:"Your Message", send:"Send Message", wa:"Chat on WhatsApp", addr:"" },
    wish:   { title:"Wishlist", empty:"Your wishlist is empty", emptySub:"Add products you love here", shop:"Shop Now" },
    myOrders:{ title:"My Orders", loginNeeded:"Please log in to view your orders", empty:"No orders yet", emptySub:"Start shopping and your orders will appear here" },
    auth:   { login:"Login", signup:"Create Account", name:"Name", email:"Email", phone:"Phone (optional)", password:"Password", loginBtn:"Login", signupBtn:"Create Account", haveAcc:"Have an account?", noAcc:"No account?", welcome:"Welcome", errEmailExists:"This email is already registered", errNoEmail:"Email not registered", errWrongPass:"Incorrect password", errFields:"Please fill all fields", errAdminEmail:"This email is reserved for admin access.", loginOk:"Logged in ✓", signupOk:"Account created ✓", logoutOk:"Logged out" },
    unavailable:"Unavailable",
    popup:  { title:"Welcome to Butterfly! 🦋", sub:"Get 15% off your first order", code:"BUTTERFLY15", close:"No thanks", cta:"Shop Now" },
    badges: { n:"New", b:"Best Seller", s:"Sale" },
    addedCart:"Added to Cart ✓", addedWish:"Added to Wishlist ✓", rmWish:"Removed from Wishlist",
    discOk:"Code applied! 15% off ✓", discFail:"Invalid discount code", subOk:"Thank you! Subscribed ✓",
  },
};

// ─── Store WhatsApp (single fallback — CHANGE THIS to the store's real number) ──
// International format, digits only (e.g. Egypt: 20 + number without the leading 0).
// The admin Settings → Social → WhatsApp value overrides this at runtime when set.
export const STORE_WHATSAPP = '201001234567';

// ─── Social Media Links ────────────────────────────────────────────────────────
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/butterfly.gallery510?igsh=cXo5bTgzcjk0OGZv',
  facebook: 'https://www.facebook.com/share/g/1Yi5cNkjpN/?mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@butterflyg510?_r=1&_t=ZS-95eOx6HpejJ',
  whatsapp: STORE_WHATSAPP,
};

// ─── WhatsApp helpers ───────────────────────────────────────────────────────────
// Normalise any stored WhatsApp value (e.g. "+20 100 123 4567") to digits and
// build a wa.me deep link, falling back to the central STORE_WHATSAPP number.
export const buildWaUrl = (number, text = '') => {
  const digits = String(number || '').replace(/[^0-9]/g, '') || STORE_WHATSAPP;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

// Build a clear, owner-readable order message for WhatsApp delivery.
export const buildWhatsAppOrder = (order, lang = 'ar', curr = 'EGP') => {
  const ar = lang === 'ar';
  const L = ar
    ? { title: '🦋 Butterfly Gallery — طلب جديد', order: 'رقم الطلب', name: 'الاسم', phone: 'الهاتف', gov: 'المحافظة', area: 'العنوان', items: 'المنتجات', sub: 'الإجمالي الفرعي', disc: 'الخصم', ship: 'الشحن', free: 'مجاني', total: 'الإجمالي', pay: 'طريقة الدفع', cod: 'الدفع عند الاستلام', instapay: 'إنستاباي', proof: 'إثبات الدفع' }
    : { title: '🦋 Butterfly Gallery — New Order', order: 'Order', name: 'Name', phone: 'Phone', gov: 'Governorate', area: 'Address', items: 'Items', sub: 'Subtotal', disc: 'Discount', ship: 'Shipping', free: 'Free', total: 'Total', pay: 'Payment', cod: 'Cash on Delivery', instapay: 'InstaPay', proof: 'Payment proof' };

  const c = order.customer || {};
  const money = n => `${Number(n || 0).toLocaleString('en-US')} ${curr}`;
  const lines = [L.title, ''];

  lines.push(`${L.order}: ${order.id || '-'}`);
  lines.push(`${L.name}: ${c.name || '-'}`);
  lines.push(`${L.phone}: ${c.phone || '-'}`);
  if (c.governorate) lines.push(`${L.gov}: ${c.governorate}`);
  if (c.area) lines.push(`${L.area}: ${c.area}`);

  lines.push('', `${L.items}:`);
  (order.items || []).forEach(i => {
    const nm = ar ? (i.ar || i.en) : (i.en || i.ar);
    lines.push(`• ${nm} ×${i.qty} = ${money(i.price * i.qty)}`);
  });

  lines.push('', `${L.sub}: ${money(order.subtotal)}`);
  if (order.discount) lines.push(`${L.disc}: -${money(order.discount)}`);
  lines.push(`${L.ship}: ${order.shipping ? money(order.shipping) : L.free}`);
  lines.push(`${L.total}: ${money(order.total)}`);
  lines.push(`${L.pay}: ${order.paymentMethod === 'instapay' ? L.instapay : L.cod}`);
  if (order.paymentScreenshot) lines.push(`${L.proof}: ${order.paymentScreenshot}`);

  return lines.join('\n');
};

// ─── Payment Methods Configuration ──────────────────────────────────────────────
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

// ─── Order Statuses (single source for storefront + admin) ──────────────────────
export const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export const STATUS_LABELS = {
  pending:    { ar: 'قيد المراجعة', en: 'Pending',    color: '#F59E0B' },
  confirmed:  { ar: 'تم التأكيد',   en: 'Confirmed',  color: '#3B82F6' },
  processing: { ar: 'جاري التجهيز', en: 'Processing', color: '#8B5CF6' },
  shipped:    { ar: 'تم الشحن',     en: 'Shipped',    color: '#0EA5E9' },
  delivered:  { ar: 'تم التسليم',   en: 'Delivered',  color: '#10B981' },
  cancelled:  { ar: 'ملغي',         en: 'Cancelled',  color: '#EF4444' },
};

export const statusLabel = (status, lang = 'ar') =>
  (STATUS_LABELS[status] ? STATUS_LABELS[status][lang === 'ar' ? 'ar' : 'en'] : status);

export const statusColor = (status) =>
  (STATUS_LABELS[status] ? STATUS_LABELS[status].color : '#9B8878');

// ─── Product availability helper ────────────────────────────────────────────────
// A product is orderable when it's not flagged unavailable and (if stock is
// tracked) has stock left. `stock == null` means "stock not tracked".
export const isAvailable = (p) =>
  !!p && p.available !== false && (p.stock === null || p.stock === undefined || Number(p.stock) > 0);