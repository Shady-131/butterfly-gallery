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
export const FONT   = "'Jost', 'Segoe UI', sans-serif";
export const SERIF  = "'Cormorant Garamond', Georgia, serif";

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
    brand:"Butterfly Gallery", tagline:"أناقة لا حدود لها", curr:"ج.م",
    nav:    { home:"الرئيسية", shop:"المتجر", about:"من نحن", contact:"تواصلي", wishlist:"المفضلة", cart:"السلة", login:"دخول", ph:"ابحثي..." },
    hero:   { badge:"✦ كولكشن ربيع ٢٠٢٥", t1:"أناقتكِ", t2:"عالمنا", sub:"اكتشفي أجمل المجوهرات والإكسسوارات والحقائب المختارة بعناية لكِ", cta:"تسوقي الآن", cta2:"شاهدي الكولكشن" },
    cats:   { title:"تسوقي بالتصنيف", jewelry:"مجوهرات", accessories:"إكسسوارات", handbags:"حقائب" },
    feat:   { title:"المنتجات المميزة", sub:"اختيارات مميزة بعناية لكِ", all:"عرض الكل" },
    rev:    { title:"آراء عملائنا", sub:"يثقون بنا من كل أرجاء مصر" },
    news:   { title:"انضمي لعالم Butterfly", sub:"اشتركي واحصلي على خصم ١٠٪ على أول طلب", ph:"بريدك الإلكتروني", btn:"اشتركي الآن" },
    prod:   { addCart:"أضيفي للسلة", addWish:"أضيفي للمفضلة", share:"شاركي", related:"منتجات مشابهة", inStock:"متوفر", qty:"الكمية" },
    shop:   { title:"المتجر", all:"الكل", jewelry:"مجوهرات", accessories:"إكسسوارات", handbags:"حقائب", newest:"الأحدث", best:"الأكثر مبيعاً", pAsc:"السعر: الأقل", pDesc:"السعر: الأعلى", noRes:"لا توجد نتائج", qv:"عرض سريع" },
    cart:   { title:"سلة التسوق", empty:"سلتك فارغة", emptySub:"ابدئي التسوق واكتشفي منتجاتنا", checkout:"إتمام الطلب", subtotal:"الإجمالي", ship:"الشحن", free:"مجاني", disc:"كود الخصم", apply:"تطبيق", saved:"توفيرك", cont:"متابعة التسوق", sum:"ملخص الطلب" },
    co:     { title:"بيانات التوصيل", name:"الاسم الكامل", phone:"رقم الهاتف", gov:"المحافظة", area:"المنطقة / العنوان", pay:"طريقة الدفع", cod:"الدفع عند الاستلام", instapay:"إنستاباي", payBtn:"ادفعي الآن", payMsg:"يرجى إكمال الدفع وتأكيد طلبك", payConf:"تم إكمال الدفع ✓", payUpload:"رفع لقطة الدفع", payUploadDesc:"رفع صورة تأكيد الدفع (JPG أو PNG)", payCheckbox:"لقد أكملت الدفع", place:"تأكيد الطلب", total:"إجمالي الطلب", back:"رجوع" },
    conf:   { title:"تم تأكيد طلبك! 🎉", sub:"شكراً لكِ على ثقتك في Butterfly Gallery", msg:"سيتم التواصل معكِ خلال ٢٤ ساعة لتأكيد التوصيل" },
    about:  { title:"قصتنا", story:"Butterfly Gallery هي وجهة المرأة المصرية العصرية التي تبحث عن الأناقة والتميز.", vis:"رؤيتنا", visT:"أن نكون الوجهة الأولى للمرأة العربية الباحثة عن الأناقة الراقية بأسعار مناسبة.", mis:"مهمتنا", misT:"تقديم تجربة تسوق فريدة تجمع بين الجودة والأناقة والخدمة الاستثنائية." },
    contact:{ title:"تواصلي معنا", name:"الاسم", email:"البريد الإلكتروني", msg:"رسالتك", send:"إرسال الرسالة", wa:"تواصلي عبر واتساب", addr:"" },
    wish:   { title:"المفضلة", empty:"قائمة المفضلة فارغة", emptySub:"أضيفي المنتجات التي تحبيها هنا", shop:"تسوقي الآن" },
    popup:  { title:"مرحباً بكِ في Butterfly! 🦋", sub:"احصلي على خصم ١٥٪ على أول طلب", code:"BUTTERFLY15", close:"لا شكراً", cta:"تسوقي الآن" },
    badges: { n:"جديد", b:"الأكثر مبيعاً", s:"تخفيض" },
    addedCart:"تمت الإضافة للسلة ✓", addedWish:"تمت الإضافة للمفضلة ✓", rmWish:"تمت الإزالة",
    discOk:"تم تطبيق الكود! خصم ١٥٪ ✓", discFail:"كود غير صحيح", subOk:"شكراً! تم الاشتراك ✓",
  },
  en: {
    brand:"Butterfly Gallery", tagline:"Elegance Without Limits", curr:"EGP",
    nav:    { home:"Home", shop:"Shop", about:"About", contact:"Contact", wishlist:"Wishlist", cart:"Cart", login:"Login", ph:"Search..." },
    hero:   { badge:"✦ Spring Collection 2025", t1:"Your", t2:"Elegance", sub:"Discover the finest jewelry, accessories & handbags curated just for you", cta:"Shop Now", cta2:"View Collection" },
    cats:   { title:"Shop by Category", jewelry:"Jewelry", accessories:"Accessories", handbags:"Handbags" },
    feat:   { title:"Featured Products", sub:"Carefully curated selections for you", all:"View All" },
    rev:    { title:"Customer Reviews", sub:"Trusted by women across Egypt" },
    news:   { title:"Join the Butterfly World", sub:"Subscribe and get 10% off your first order", ph:"Your email address", btn:"Subscribe Now" },
    prod:   { addCart:"Add to Cart", addWish:"Add to Wishlist", share:"Share", related:"Related Products", inStock:"In Stock", qty:"Quantity" },
    shop:   { title:"Shop", all:"All", jewelry:"Jewelry", accessories:"Accessories", handbags:"Handbags", newest:"Newest", best:"Best Selling", pAsc:"Price: Low to High", pDesc:"Price: High to Low", noRes:"No results found", qv:"Quick View" },
    cart:   { title:"Shopping Cart", empty:"Your cart is empty", emptySub:"Start shopping and discover our beautiful products", checkout:"Proceed to Checkout", subtotal:"Subtotal", ship:"Shipping", free:"Free", disc:"Discount Code", apply:"Apply", saved:"Savings", cont:"Continue Shopping", sum:"Order Summary" },
    co:     { title:"Delivery Details", name:"Full Name", phone:"Phone Number", gov:"Governorate", area:"Area / Detailed Address", pay:"Payment Method", cod:"Cash on Delivery", instapay:"InstaPay", payBtn:"Pay Now", payMsg:"Please complete the payment and confirm your order", payConf:"Payment Completed ✓", payUpload:"Upload Payment Screenshot", payUploadDesc:"Upload your payment confirmation (JPG or PNG)", payCheckbox:"I have completed the payment", place:"Place Order", total:"Order Total", back:"Back" },
    conf:   { title:"Order Confirmed! 🎉", sub:"Thank you for trusting Butterfly Gallery", msg:"We will contact you within 24 hours to confirm delivery" },
    about:  { title:"Our Story", story:"Butterfly Gallery is the destination for the modern Egyptian woman seeking elegance and distinction.", vis:"Our Vision", visT:"To be the premier destination for the Arab woman seeking refined elegance at accessible prices.", mis:"Our Mission", misT:"Delivering a unique shopping experience combining quality, elegance, and exceptional service." },
    contact:{ title:"Contact Us", name:"Name", email:"Email", msg:"Your Message", send:"Send Message", wa:"Chat on WhatsApp", addr:"" },
    wish:   { title:"Wishlist", empty:"Your wishlist is empty", emptySub:"Add products you love here", shop:"Shop Now" },
    popup:  { title:"Welcome to Butterfly! 🦋", sub:"Get 15% off your first order", code:"BUTTERFLY15", close:"No thanks", cta:"Shop Now" },
    badges: { n:"New", b:"Best Seller", s:"Sale" },
    addedCart:"Added to Cart ✓", addedWish:"Added to Wishlist ✓", rmWish:"Removed from Wishlist",
    discOk:"Code applied! 15% off ✓", discFail:"Invalid discount code", subOk:"Thank you! Subscribed ✓",
  },
};

// ─── Social Media Links ────────────────────────────────────────────────────────
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/butterfly.gallery510?igsh=cXo5bTgzcjk0OGZv',
  facebook: 'https://www.facebook.com/share/g/1Yi5cNkjpN/?mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@butterflyg510?_r=1&_t=ZS-95eOx6HpejJ',
  whatsapp: 'https://wa.me/201234567890',
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