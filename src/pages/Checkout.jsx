import { useState } from 'react';
import Btn from '../components/ui/Btn';
import { G, FONT, SERIF, GOVS, PAYMENT_METHODS } from '../constants/data';

// Props: lang, tr, isRTL, cart, coForm, setCoForm, total, discApplied, disc, nav, showToast, setCart
export default function Checkout({ lang, tr, isRTL, cart, coForm, setCoForm, total, discApplied, disc, nav, showToast, setCart }) {
  const govList = lang === 'ar' ? GOVS.ar : GOVS.en;
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const handleInstapayClick = () => {
    // Open InstaPay payment link in new tab
    window.open(PAYMENT_METHODS.instapay.link, '_blank');
    showToast(tr.co.payMsg);
    setPaymentProcessing(true);
  };

  const placeOrder = () => {
    if (!coForm.name || !coForm.phone || !coForm.gov || !coForm.area) {
      showToast(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    if (!coForm.pay) {
      showToast(isRTL ? 'يرجى اختيار طريقة الدفع' : 'Please select a payment method');
      return;
    }

    // If InstaPay is selected and payment isn't confirmed yet
    if (coForm.pay === 'instapay' && !paymentConfirmed) {
      showToast(isRTL ? 'يرجى إكمال الدفع عبر الرابط أعلاه' : 'Please complete payment using the link above');
      return;
    }

    // If InstaPay is selected, require screenshot upload
    if (coForm.pay === 'instapay' && !paymentScreenshot) {
      showToast(isRTL ? 'يرجى رفع لقطة الدفع' : 'Please upload payment screenshot');
      return;
    }

    setCart([]);
    nav('confirmation');
  };

  const textFields = [
    { label: tr.co.name,  key: 'name',  type: 'text' },
    { label: tr.co.phone, key: 'phone', type: 'tel'  },
    { label: tr.co.area,  key: 'area',  type: 'text' },
  ];

  // Get payment methods to display
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

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', fontFamily: FONT, direction: isRTL ? 'rtl' : 'ltr' }}>
      <button onClick={() => nav('cart')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: G.textM, fontSize: 13, marginBottom: 24, fontFamily: FONT, padding: 0 }}>
        ← {tr.co.back}
      </button>
      <h1 style={{ fontFamily: SERIF, fontSize: 34, color: G.text, marginBottom: 6 }}>{tr.co.title}</h1>
      <div style={{ height: 2, width: 40, background: G.gold, marginBottom: 32 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>
        <div>
          {textFields.map(({ label, key, type }) => (
            <div key={key} style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', color: G.textM, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{label}</label>
              <input value={coForm[key]} onChange={e => setCoForm(f => ({ ...f, [key]: e.target.value }))} type={type}
                style={{ width: '100%', padding: '12px 14px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
                onFocus={e => e.target.style.borderColor = G.gold}
                onBlur={e => e.target.style.borderColor = G.bdr}
              />
            </div>
          ))}

          {/* Governorate select */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: G.textM, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{tr.co.gov}</label>
            <select value={coForm.gov} onChange={e => setCoForm(f => ({ ...f, gov: e.target.value }))}
              style={{ width: '100%', padding: '12px 14px', border: `1px solid ${G.bdr}`, borderRadius: 6, fontSize: 14, fontFamily: FONT, background: G.bg, color: G.text, outline: 'none', cursor: 'pointer', transition: 'border-color .2s' }}
              onFocus={e => e.target.style.borderColor = G.gold}
              onBlur={e => e.target.style.borderColor = G.bdr}>
              <option value="">{isRTL ? 'اختاري المحافظة' : 'Select Governorate'}</option>
              {govList.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Payment Methods */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: G.text, fontSize: 13, fontWeight: 500, marginBottom: 12 }}>{tr.co.pay}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {paymentMethods.map(pm => (
                <div key={pm.id}>
                  {/* Payment Method Card */}
                  <div 
                    onClick={() => {
                      setCoForm(f => ({ ...f, pay: pm.id }));
                      setPaymentProcessing(false);
                      setPaymentConfirmed(false);
                      setPaymentScreenshot(null);
                    }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 12, 
                      padding: '16px 16px', 
                      border: `2px solid ${coForm.pay === pm.id ? G.gold : G.bdr}`, 
                      borderRadius: 10, 
                      cursor: 'pointer', 
                      background: coForm.pay === pm.id ? G.goldL : G.white, 
                      transition: 'all .25s ease',
                      boxShadow: coForm.pay === pm.id ? `0 4px 12px ${G.gold}20` : 'none',
                    }}
                    onMouseEnter={e => {
                      if (coForm.pay !== pm.id) {
                        e.currentTarget.style.borderColor = G.gold;
                        e.currentTarget.style.background = '#FFFBF8';
                      }
                    }}
                    onMouseLeave={e => {
                      if (coForm.pay !== pm.id) {
                        e.currentTarget.style.borderColor = G.bdr;
                        e.currentTarget.style.background = G.white;
                      }
                    }}
                  >
                    {/* Radio Button */}
                    <div style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      border: `2px solid ${coForm.pay === pm.id ? G.gold : G.bdr}`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      background: coForm.pay === pm.id ? G.gold : 'transparent',
                      transition: 'all .2s'
                    }}>
                      {coForm.pay === pm.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: G.white }} />}
                    </div>

                    {/* Icon */}
                    <span style={{ fontSize: 20 }}>{pm.icon}</span>

                    {/* Text */}
                    <div>
                      <p style={{ fontSize: 14, color: G.text, fontWeight: coForm.pay === pm.id ? 600 : 500, margin: 0 }}>
                        {pm.label}
                      </p>
                      <p style={{ fontSize: 12, color: G.textL, margin: '2px 0' }}>
                        {pm.description}
                      </p>
                    </div>
                  </div>

                  {/* InstaPay Payment Button - Show when selected */}
                  {coForm.pay === 'instapay' && pm.id === 'instapay' && (
                    <div style={{ marginTop: 10 }}>
                      <button
                        onClick={handleInstapayClick}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: G.gold,
                          color: G.white,
                          border: 'none',
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          fontFamily: FONT,
                          cursor: 'pointer',
                          transition: 'all .2s',
                          boxShadow: `0 4px 12px ${G.gold}40`,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#B89544';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 6px 16px ${G.gold}60`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = G.gold;
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 4px 12px ${G.gold}40`;
                        }}
                      >
                        {tr.co.payBtn} 💳
                      </button>

                      {/* Payment Status Message */}
                      {paymentProcessing && (
                        <div style={{
                          marginTop: 12,
                          padding: '12px 14px',
                          background: '#FFF3E0',
                          border: `1px solid #FFB74D`,
                          borderRadius: 8,
                          fontSize: 12,
                          color: '#E65100',
                          textAlign: isRTL ? 'right' : 'left',
                        }}>
                          {tr.co.payMsg}
                        </div>
                      )}

                      {/* Payment Confirmation Checkbox */}
                      {paymentProcessing && (
                        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <input
                            type="checkbox"
                            checked={paymentConfirmed}
                            onChange={e => setPaymentConfirmed(e.target.checked)}
                            style={{
                              width: 18,
                              height: 18,
                              cursor: 'pointer',
                              accentColor: G.gold,
                            }}
                          />
                          <label style={{ 
                            fontSize: 12, 
                            color: G.textM, 
                            cursor: 'pointer',
                            fontFamily: FONT,
                          }}>
                            {lang === 'ar' ? 'لقد أكملت الدفع' : 'I have completed the payment'}
                          </label>
                        </div>
                      )}

                      {/* Payment Screenshot Upload */}
                      {paymentProcessing && (
                        <div style={{ marginTop: 16, padding: '14px', background: '#F5ECD0', borderRadius: 8, border: `1px solid ${G.gold}` }}>
                          <label style={{ display: 'block', color: G.text, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                            {lang === 'ar' ? 'رفع لقطة الدفع' : 'Upload Payment Screenshot'}
                          </label>
                          <p style={{ color: G.textL, fontSize: 12, marginBottom: 12 }}>
                            {lang === 'ar' ? 'رفع صورة تأكيد الدفع (JPG أو PNG)' : 'Upload your payment confirmation (JPG or PNG)'}
                          </p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  showToast(lang === 'ar' ? 'حجم الملف كبير جداً (أقصى 5MB)' : 'File too large (max 5MB)');
                                  return;
                                }
                                setPaymentScreenshot(file);
                                showToast(lang === 'ar' ? 'تم رفع الصورة بنجاح ✓' : 'Screenshot uploaded ✓');
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: `2px dashed ${paymentScreenshot ? G.gold : G.bdr}`,
                              borderRadius: 6,
                              fontSize: 12,
                              fontFamily: FONT,
                              cursor: 'pointer',
                              background: paymentScreenshot ? '#FFFBF8' : 'transparent',
                              boxSizing: 'border-box'
                            }}
                          />
                          {paymentScreenshot && (
                            <div style={{ marginTop: 10, padding: '8px 12px', background: '#C8E6C9', borderRadius: 6, fontSize: 12, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 8 }}>
                              ✓ {paymentScreenshot.name}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Place Order Button */}
          <Btn 
            onClick={placeOrder} 
            style={{ 
              width: '100%', 
              boxSizing: 'border-box', 
              textAlign: 'center', 
              padding: 14,
              opacity: (coForm.pay === 'instapay' && (!paymentConfirmed || !paymentScreenshot)) ? 0.6 : 1,
              cursor: (coForm.pay === 'instapay' && (!paymentConfirmed || !paymentScreenshot)) ? 'not-allowed' : 'pointer',
              transition: 'all .2s'
            }}
          >
            {tr.co.place}
          </Btn>
        </div>

        {/* Order summary */}
        <div style={{ background: G.pinkL, borderRadius: 10, padding: 20, border: `1px solid ${G.bdr}` }}>
          <p style={{ fontFamily: SERIF, fontSize: 18, color: G.text, marginBottom: 16 }}>{tr.cart.sum}</p>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
              <img src={i.img} alt="" style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ color: G.text, fontSize: 12, margin: 0, fontWeight: 500 }}>{lang === 'ar' ? i.ar : i.en}</p>
                <p style={{ color: G.textL, fontSize: 11, margin: '2px 0' }}>{isRTL ? 'الكمية:' : 'Qty:'} {i.qty}</p>
              </div>
              <span style={{ color: G.gold, fontSize: 13, fontWeight: 600 }}>{(i.price * i.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${G.bdr}`, marginTop: 12, paddingTop: 12 }}>
            {discApplied && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#2E7D32', marginBottom: 6 }}><span>{tr.cart.saved}</span><span>-{disc.toLocaleString()}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SERIF, fontSize: 18, fontWeight: 600 }}>
              <span style={{ color: G.text }}>{tr.co.total}</span>
              <span style={{ color: G.gold }}>{total.toLocaleString()} {tr.curr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}