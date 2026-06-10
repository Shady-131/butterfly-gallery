import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import { LogOut, LayoutDashboard, Box, ShoppingCart, Settings, BarChart3, ChevronRight, Plus, Edit, Trash2, Package, Clock, CheckCircle, Search, Menu, Info, History } from 'lucide-react';
import { AdminHeader, DataTable, FormInput, FormTextarea, Badge, Modal, AdminSelect } from '../components/AdminComponents';
import { ORDER_STATUSES, STATUS_LABELS, SOCIAL_MEDIA, STORE_WHATSAPP, formatPrice, FONT, BRAND } from '../../constants/data';
import { auditLogService, logAdminAction } from '../../services/database';
import SiteLogo from '../../components/ui/Logo';
import PriceText from '../../components/ui/PriceText';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { settings, products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, updateSocialMedia, updateSettings } = useAppData();
  const { success, error } = useToast();

  // Admin activity log (audit trail) — kept live in state for this session.
  const [logs, setLogs] = useState(() => auditLogService.getLogs());
  const log = (action, entityType, details = '', extra = {}) => {
    logAdminAction(user, action, entityType, details, extra);
    setLogs(auditLogService.getLogs());
  };
  const clearLogs = () => { auditLogService.clearLogs(); setLogs([]); };

  const isSmall = () => typeof window !== 'undefined' && window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(isSmall());
  const [sidebarOpen, setSidebarOpen] = useState(!isSmall());
  const [activePage, setActivePage] = useState('overview');

  // Keep the layout sane across breakpoints (collapse the drawer on small screens).
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Box },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'content', label: 'Website Content', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'activity', label: 'Activity Log', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const go = (id) => { setActivePage(id); if (isMobile) setSidebarOpen(false); };

  const sidebarWidth = isMobile ? 260 : (sidebarOpen ? 280 : 80);
  const sidebarVisible = isMobile ? sidebarOpen : true; // on mobile the drawer slides away
  const expanded = isMobile ? true : sidebarOpen;        // whether to show text labels

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#FDF8F5',
      fontFamily: FONT,
    }}>
      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1500 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        background: '#2C1810',
        color: '#F5ECD0',
        width: sidebarWidth,
        transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease, width 0.3s ease',
        borderRight: '1px solid rgba(245,236,208,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 1600,
        left: 0,
        top: 0,
      }}>
        {/* Logo / brand */}
        <div style={{
          padding: '18px 16px',
          borderBottom: '1px solid rgba(245,236,208,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: expanded ? 'flex-start' : 'center',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'rgba(245,236,208,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <SiteLogo size={26} />
          </div>
          {expanded && (
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: BRAND, fontWeight: 600, fontSize: 17, color: '#F5ECD0', letterSpacing: '0.04em' }}>Butterfly Gallery</div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(245,236,208,0.55)', textTransform: 'uppercase' }}>Admin Panel</div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav style={{ flex: 1, padding: '16px 0', overflow: 'auto' }}>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: isActive ? 'rgba(201,168,76,0.2)' : 'transparent',
                  color: isActive ? '#F5ECD0' : 'rgba(245,236,208,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: expanded ? '12px' : '0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: isActive ? '3px solid #C9A84C' : '3px solid transparent',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 500 : 400,
                }}
                title={!expanded ? item.label : ''}
              >
                <Icon size={18} />
                {expanded && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{
          borderTop: '1px solid rgba(245,236,208,0.1)',
          padding: '12px 0',
        }}>
          {!isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                color: 'rgba(245,236,208,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: expanded ? 'space-between' : 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
              }}
            >
              {expanded && 'Collapse'}
              <ChevronRight size={16} style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'rgba(239,68,68,0.1)',
              color: '#FCA5A5',
              display: 'flex',
              alignItems: 'center',
              gap: expanded ? '12px' : '0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px',
              justifyContent: expanded ? 'flex-start' : 'center',
              fontFamily: 'inherit',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
            title={!expanded ? 'Logout' : ''}
          >
            <LogOut size={18} />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: isMobile ? 0 : sidebarWidth,
        transition: 'margin-left 0.3s ease',
        minWidth: 0,
      }}>
        {/* Top Bar */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #F0E0D8',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            title="Toggle menu"
            style={{ background: 'none', border: '1px solid #F0E0D8', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#2C1810', display: 'flex', flexShrink: 0 }}
          >
            <Menu size={18} />
          </button>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#2C1810', margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: '12px', color: '#9B8878', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Welcome back, <strong style={{ color: '#2C1810' }}>{user?.name || 'Admin'}</strong>{user?.email ? ` · ${user.email}` : ''}
            </p>
          </div>
        </div>

        {/* Demo notice */}
        <div style={{ background: '#FFF8E6', borderBottom: '1px solid #F3E2B8', color: '#8A6D1A', fontSize: 12.5, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Info size={14} style={{ flexShrink: 0 }} />
          <span>Demo mode: data is stored locally in this browser. · وضع تجريبي: يتم حفظ البيانات محليًا على هذا المتصفح.</span>
        </div>

        {/* Content Area */}
        <div style={{ padding: '24px' }}>
          <DashboardContent
            activePage={activePage}
            products={products}
            orders={orders}
            settings={settings}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onUpdateOrderStatus={updateOrderStatus}
            onUpdateSettings={updateSettings}
            onUpdateSocialMedia={updateSocialMedia}
            success={success}
            error={error}
            log={log}
            logs={logs}
            clearLogs={clearLogs}
          />
        </div>
      </main>
    </div>
  );
}

function DashboardContent({
  activePage,
  products,
  orders,
  settings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateSettings,
  onUpdateSocialMedia,
  success,
  error,
  log,
  logs,
  clearLogs,
}) {
  const components = {
    overview: <OverviewPage products={products} orders={orders} />,
    products: <ProductsPage
      products={products}
      onAdd={onAddProduct}
      onUpdate={onUpdateProduct}
      onDelete={onDeleteProduct}
      success={success}
      error={error}
      log={log}
    />,
    orders: <OrdersPage
      orders={orders}
      onUpdateStatus={onUpdateOrderStatus}
      success={success}
      error={error}
      log={log}
    />,
    content: <ContentPage settings={settings} onUpdate={onUpdateSettings} success={success} error={error} log={log} />,
    settings: <SettingsPage
      settings={settings}
      onUpdate={onUpdateSettings}
      onUpdateSocial={onUpdateSocialMedia}
      success={success}
      error={error}
      log={log}
    />,
    activity: <ActivityLogPage logs={logs} clearLogs={clearLogs} />,
  };

  return components[activePage] || <OverviewPage products={products} orders={orders} />;
}

function OverviewPage({ products, orders }) {
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  const cards = [
    { label: 'Total Products', value: products.length, Icon: Package, color: '#3B82F6' },
    { label: 'Total Orders', value: orders.length, Icon: ShoppingCart, color: '#10B981' },
    { label: 'Pending Orders', value: pendingOrders, Icon: Clock, color: '#F59E0B' },
    { label: 'Delivered Orders', value: deliveredOrders, Icon: CheckCircle, color: '#8B5CF6' },
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px', color: '#2C1810', fontSize: '24px', fontWeight: 600 }}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {cards.map(({ label, value, Icon, color }) => (
          <div key={label} style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #F0E0D8',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${color}1A`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={24} />
            </div>
            <div>
              <p style={{ color: '#9B8878', fontSize: '13px', margin: '0 0 4px' }}>{label}</p>
              <h3 style={{ color: '#2C1810', fontSize: '26px', fontWeight: 600, margin: 0 }}>{value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const EMPTY_PRODUCT = {
  ar: '', en: '', price: '', old: '', category: 'jewelry', img: '',
  dAr: '', dEn: '', stock: '', stars: '', isNew: false, best: false, available: true,
};

const productAvailable = (p) =>
  p.available !== false && (p.stock === null || p.stock === undefined || p.stock === '' || Number(p.stock) > 0);

function ProductsPage({ products, onAdd, onUpdate, onDelete, success, error, log }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_PRODUCT);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSubmit = async () => {
    try {
      if (!formData.ar || !formData.en || !formData.price || !formData.img) {
        error('Please fill all required fields');
        return;
      }

      // Only fields the admin actually controls. On edit these are merged into
      // the existing product, so untouched fields (rc, createdAt, …) are kept.
      const productData = {
        ar: formData.ar,
        en: formData.en,
        price: parseInt(formData.price) || 0,
        old: formData.old === '' || formData.old === null ? null : parseInt(formData.old),
        // keep storefront (`cat`) and admin (`category`) in sync
        category: formData.category,
        cat: formData.category,
        img: formData.img,
        dAr: formData.dAr,
        dEn: formData.dEn,
        stock: formData.stock === '' ? null : parseInt(formData.stock),
        isNew: !!formData.isNew,
        best: !!formData.best,
        available: !!formData.available,
        stars: formData.stars === '' ? 4.5 : parseFloat(formData.stars),
      };

      if (editingId) {
        const original = products.find(p => p.id === editingId);
        await onUpdate(editingId, productData);
        success('Product updated successfully!');

        // Build a lightweight, readable change summary for the audit log.
        const changes = [];
        if (original) {
          if (Number(original.price) !== Number(productData.price)) changes.push(`price ${original.price}→${productData.price}`);
          const wasAvail = original.available !== false;
          if (wasAvail !== productData.available) changes.push(`availability ${wasAvail ? 'available' : 'unavailable'}→${productData.available ? 'available' : 'unavailable'}`);
          const oStock = (original.stock === null || original.stock === undefined || original.stock === '') ? '—' : original.stock;
          const nStock = productData.stock === null ? '—' : productData.stock;
          if (String(oStock) !== String(nStock)) changes.push(`stock ${oStock}→${nStock}`);
          if (original.en !== productData.en) changes.push('name');
          if ((original.cat || original.category) !== productData.category) changes.push(`category→${productData.category}`);
        }
        log && log('Product updated', 'product',
          changes.length ? `Updated "${productData.en}": ${changes.join(', ')}` : `Updated "${productData.en}"`,
          { entityId: editingId, entityName: productData.en, before: original ? original.price : null, after: productData.price });
      } else {
        const created = await onAdd({ ...productData, rc: 0 });
        success('Product added successfully!');
        log && log('Product created', 'product', `Created "${productData.en}" (${productData.price} EGP)`,
          { entityId: created?.id, entityName: productData.en });
      }

      setFormData(EMPTY_PRODUCT);
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) {
      error('Error saving product: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      ar: product.ar || '',
      en: product.en || '',
      price: product.price ?? '',
      old: product.old ?? '',
      category: product.cat || product.category || 'jewelry',
      img: product.img || '',
      dAr: product.dAr || '',
      dEn: product.dEn || '',
      stock: product.stock ?? '',
      stars: product.stars ?? '',
      isNew: !!product.isNew,
      best: !!product.best,
      available: product.available !== false,
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDelete(product.id);
        success('Product deleted successfully!');
        log && log('Product deleted', 'product', `Deleted "${product.en || product.ar}"`,
          { entityId: product.id, entityName: product.en || product.ar });
      } catch (err) {
        error('Error deleting product: ' + err.message);
      }
    }
  };

  const columns = [
    { key: 'en', label: 'Product', render: (en, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={row.img} alt={row.en || row.ar || ''} loading="lazy" decoding="async" style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0, border: '1px solid #F0E0D8' }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: '#2C1810' }}>{en || row.ar}</div>
            <div style={{ fontSize: '12px', color: '#9B8878' }}>{row.ar}</div>
          </div>
        </div>
      ) },
    { key: 'price', label: 'Price', render: (price, row) => (
        <div>
          <PriceText amount={price} lang="en" weight={600} />
          {row.old ? <PriceText amount={row.old} lang="en" size={12} color="#9B8878" old style={{ display: 'block', marginTop: 2 }} /> : null}
        </div>
      ) },
    { key: 'cat', label: 'Category', render: (_v, row) => <Badge>{row.cat || row.category}</Badge> },
    { key: 'available', label: 'Stock / Status', render: (_v, row) => {
        const avail = productAvailable(row);
        const hasStock = row.stock !== null && row.stock !== undefined && row.stock !== '';
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Badge variant={avail ? 'success' : 'danger'}>{avail ? 'Available' : 'Unavailable'}</Badge>
            {hasStock && <span style={{ fontSize: '12px', color: '#9B8878' }}>{row.stock} in stock</span>}
          </div>
        );
      } },
  ];

  // Search + category + status filtering (storefront source is untouched).
  const q = search.trim().toLowerCase();
  const filtered = products.filter(p => {
    const matchesQ = !q || [p.ar, p.en, p.cat, p.category].some(v => String(v || '').toLowerCase().includes(q));
    const matchesCat = catFilter === 'all' || (p.cat || p.category) === catFilter;
    const avail = productAvailable(p);
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'available' ? avail : !avail);
    return matchesQ && matchesCat && matchesStatus;
  });

  const inputStyle = { padding: '9px 12px', border: '1px solid #F0E0D8', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', background: 'white', color: '#2C1810', outline: 'none' };

  return (
    <div>
      <AdminHeader
        title="Products"
        subtitle="Manage your product catalog"
        actions={[
          {
            label: 'Add Product',
            variant: 'default',
            icon: <Plus size={16} />,
            onClick: () => {
              setFormData(EMPTY_PRODUCT);
              setEditingId(null);
              setIsModalOpen(true);
            },
          },
        ]}
      />

      {/* Toolbar: search + filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
          <Search size={15} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#9B8878' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or category…"
            style={{ ...inputStyle, width: '100%', padding: '9px 12px 9px 34px', boxSizing: 'border-box' }} />
        </div>
        <AdminSelect
          value={catFilter}
          onChange={setCatFilter}
          minWidth={170}
          options={[
            { value: 'all', label: 'All categories' },
            { value: 'jewelry', label: 'Jewelry' },
            { value: 'accessories', label: 'Accessories' },
            { value: 'handbags', label: 'Handbags' },
          ]}
        />
        <AdminSelect
          value={statusFilter}
          onChange={setStatusFilter}
          minWidth={150}
          options={[
            { value: 'all', label: 'All status' },
            { value: 'available', label: 'Available', color: '#15803D' },
            { value: 'unavailable', label: 'Unavailable', color: '#EF4444' },
          ]}
        />
        <span style={{ fontSize: '13px', color: '#9B8878', marginLeft: 'auto' }}>{filtered.length} of {products.length}</span>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        actions={[
          {
            label: 'Edit',
            icon: <Edit size={14} />,
            color: '#3B82F6',
            handler: handleEdit,
          },
          {
            label: 'Delete',
            icon: <Trash2 size={14} />,
            color: '#EF4444',
            handler: (row) => handleDelete(row),
          },
        ]}
      />

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit Product' : 'Add New Product'}
        onClose={() => setIsModalOpen(false)}
      >
        {/* Two-column rows collapse to a single column on ~360px phones so inputs
            never get cramped; desktop keeps the side-by-side layout. */}
        <style>{`.admin-modal-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media (max-width:480px){.admin-modal-2col{grid-template-columns:1fr}}`}</style>
        <FormInput
          label="Product Name (Arabic)"
          name="ar"
          value={formData.ar}
          onChange={(e) => setFormData({ ...formData, ar: e.target.value })}
          placeholder="اسم المنتج"
          required
        />
        <FormInput
          label="Product Name (English)"
          name="en"
          value={formData.en}
          onChange={(e) => setFormData({ ...formData, en: e.target.value })}
          placeholder="Product name"
          required
        />
        <div className="admin-modal-2col">
          <FormInput
            label="Price (EGP)"
            name="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="1000"
            required
          />
          <FormInput
            label="Old Price (optional)"
            name="old"
            type="number"
            value={formData.old}
            onChange={(e) => setFormData({ ...formData, old: e.target.value })}
            placeholder="1200"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 500,
            color: '#2C1810',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Category <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <AdminSelect
            value={formData.category}
            onChange={(v) => setFormData({ ...formData, category: v })}
            fullWidth
            options={[
              { value: 'jewelry', label: 'Jewelry' },
              { value: 'accessories', label: 'Accessories' },
              { value: 'handbags', label: 'Handbags' },
            ]}
          />
        </div>
        <FormInput
          label="Image URL"
          name="img"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
        <FormTextarea
          label="Description (Arabic)"
          name="dAr"
          value={formData.dAr}
          onChange={(e) => setFormData({ ...formData, dAr: e.target.value })}
          placeholder="وصف المنتج بالعربية"
          rows={3}
        />
        <FormTextarea
          label="Description (English)"
          name="dEn"
          value={formData.dEn}
          onChange={(e) => setFormData({ ...formData, dEn: e.target.value })}
          placeholder="Product description in English"
          rows={3}
        />
        <div className="admin-modal-2col">
          <FormInput
            label="Stock (optional)"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="e.g. 10"
          />
          <FormInput
            label="Rating (0-5)"
            name="stars"
            type="number"
            value={formData.stars}
            onChange={(e) => setFormData({ ...formData, stars: e.target.value })}
            placeholder="4.5"
          />
        </div>
        <div style={{ display: 'flex', gap: '24px', margin: '4px 0 8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#2C1810', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!formData.isNew}
              onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              style={{ width: 16, height: 16, accentColor: '#C9A84C', cursor: 'pointer' }}
            />
            New
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#2C1810', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!formData.best}
              onChange={(e) => setFormData({ ...formData, best: e.target.checked })}
              style={{ width: 16, height: 16, accentColor: '#C9A84C', cursor: 'pointer' }}
            />
            Best Seller
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#2C1810', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              style={{ width: 16, height: 16, accentColor: '#C9A84C', cursor: 'pointer' }}
            />
            Available
          </label>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              background: '#C9A84C',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              flex: 1,
              background: 'transparent',
              color: '#C9A84C',
              border: '1px solid #C9A84C',
              padding: '10px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

const fmtDate = (d) => (d ? new Date(d).toLocaleString('en-GB') : '—');
const money = (n) => formatPrice(n, 'en');

function OrdersPage({ orders, onUpdateStatus, success, error, log }) {
  const [filter, setFilter] = useState('all');

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const order = orders.find(o => o.id === orderId);
      const oldStatus = order?.status;
      await onUpdateStatus(orderId, newStatus);
      success('Order status updated!');

      const oldLbl = STATUS_LABELS[oldStatus]?.en || oldStatus || '—';
      const newLbl = STATUS_LABELS[newStatus]?.en || newStatus;
      const cust = order?.customer?.name ? ` for ${order.customer.name}` : '';
      log && log('Order status changed', 'order', `${orderId}${cust}: ${oldLbl} → ${newLbl}`,
        { entityId: orderId, entityName: order?.customer?.name || null, before: oldStatus, after: newStatus });
    } catch (err) {
      error('Error updating order: ' + err.message);
    }
  };

  const counts = orders.reduce((m, o) => ({ ...m, [o.status]: (m[o.status] || 0) + 1 }), {});
  const shown = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const sorted = [...shown].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const chip = (id, label, count) => (
    <button key={id} onClick={() => setFilter(id)} style={{
      background: filter === id ? '#C9A84C' : 'white',
      color: filter === id ? 'white' : '#6B4C3B',
      border: `1px solid ${filter === id ? '#C9A84C' : '#F0E0D8'}`,
      borderRadius: '20px', padding: '6px 14px', fontSize: '13px', cursor: 'pointer',
      fontWeight: filter === id ? 600 : 400,
    }}>
      {label}{typeof count === 'number' ? ` (${count})` : ''}
    </button>
  );

  return (
    <div>
      <AdminHeader title="Orders" subtitle="Manage customer orders" />

      {/* Status filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {chip('all', 'All', orders.length)}
        {ORDER_STATUSES.map(s => chip(s, STATUS_LABELS[s].en, counts[s] || 0))}
      </div>

      {sorted.length === 0 ? (
        <div style={{ background: 'white', padding: '48px 24px', borderRadius: '12px', textAlign: 'center', color: '#9B8878' }}>
          <p>No orders {filter === 'all' ? 'yet' : `with status "${STATUS_LABELS[filter]?.en}"`}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {sorted.map(order => {
            const c = order.customer || {};
            const sc = STATUS_LABELS[order.status]?.color || '#9B8878';
            return (
              <div key={order.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #F0E0D8' }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ color: '#2C1810', fontWeight: 600, margin: '0 0 4px', overflowWrap: 'anywhere' }}>{order.id}</h3>
                    <p style={{ color: '#9B8878', fontSize: '13px', margin: 0 }}>{fmtDate(order.createdAt)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span style={{ background: `${sc}22`, color: sc, border: `1px solid ${sc}`, borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 600 }}>
                      {STATUS_LABELS[order.status]?.en || order.status}
                    </span>
                    <AdminSelect
                      value={order.status}
                      onChange={(v) => handleStatusChange(order.id, v)}
                      size="sm"
                      minWidth={160}
                      options={ORDER_STATUSES.map(s => ({ value: s, label: STATUS_LABELS[s].en, color: STATUS_LABELS[s].color }))}
                    />
                  </div>
                </div>

                {/* Customer info */}
                <div style={{ paddingTop: '16px', borderTop: '1px solid #F0E0D8', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  {[
                    ['Customer', c.name || 'Guest'],
                    ['Email', c.email || '—'],
                    ['Phone', c.phone || '—'],
                    ['Governorate', c.governorate || '—'],
                    ['Address', c.area || c.address || '—'],
                    ['Payment', order.paymentMethod === 'instapay' ? 'InstaPay' : 'Cash on Delivery'],
                  ].map(([label, val]) => (
                    <div key={label} style={{ minWidth: 0, background: '#FDF8F5', borderRadius: '8px', padding: '10px 12px' }}>
                      <p style={{ fontSize: '11px', color: '#9B8878', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                      <p style={{ color: '#2C1810', margin: 0, fontSize: '14px', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{val}</p>
                    </div>
                  ))}
                </div>

                {/* Items */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0E0D8' }}>
                  <p style={{ fontSize: '12px', color: '#9B8878', margin: '0 0 8px', fontWeight: 500 }}>Items</p>
                  {(order.items || []).map(i => (
                    <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#2C1810', marginBottom: '6px' }}>
                      <span>{i.en || i.ar} ×{i.qty}</span>
                      <span>{money(i.price * i.qty)}</span>
                    </div>
                  ))}
                  {order.paymentScreenshot && (
                    <p style={{ fontSize: '12px', color: '#9B8878', margin: '8px 0 0' }}>Payment proof: {order.paymentScreenshot}</p>
                  )}
                </div>

                {/* Totals */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0E0D8', display: 'flex', justifyContent: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', color: '#9B8878' }}>Subtotal: {money(order.subtotal)}</span>
                  {order.discount ? <span style={{ fontSize: '13px', color: '#15803D' }}>Discount: -{money(order.discount)}</span> : null}
                  <span style={{ fontSize: '13px', color: '#9B8878' }}>Shipping: {order.shipping ? money(order.shipping) : 'Free'}</span>
                  <span style={{ fontSize: '15px', color: '#2C1810', fontWeight: 700 }}>Total: {money(order.total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Color picker with a visible, editable hex value.
function ColorField({ label, value, onChange }) {
  const safe = value || '#000000';
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#2C1810', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #F0E0D8', borderRadius: '8px', padding: '6px 10px', maxWidth: '260px' }}>
        <input type="color" value={safe} onChange={(e) => onChange(e.target.value)}
          style={{ width: 40, height: 40, border: 'none', background: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }} />
        <input type="text" value={safe} onChange={(e) => onChange(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'monospace', color: '#2C1810', background: 'transparent', textTransform: 'uppercase' }} />
      </div>
    </div>
  );
}

function ContentPage({ settings, onUpdate, success, error, log }) {
  const [formData, setFormData] = useState(settings || {});
  const set = (k, v) => setFormData(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    try {
      await onUpdate(formData);
      success('Content updated successfully!');
      log && log('Website content saved', 'content', 'Updated brand, hero text & colors');
    } catch (err) {
      error('Error updating content: ' + err.message);
    }
  };

  // Render an EN/AR pair side by side.
  const pair = (label, enKey, arKey, enPh, arPh) => (
    <div style={{ marginBottom: '4px' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: '#2C1810', margin: '0 0 8px' }}>{label}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <FormInput label="English" value={formData[enKey] || ''} onChange={(e) => set(enKey, e.target.value)} placeholder={enPh} />
        <FormInput label="Arabic" value={formData[arKey] || ''} onChange={(e) => set(arKey, e.target.value)} placeholder={arPh} />
      </div>
    </div>
  );

  return (
    <div>
      <AdminHeader title="Website Content" subtitle="Manage your website content and text (Arabic & English)" />

      {/* Demo note: these fields persist locally but are not yet wired to the live homepage. */}
      <div style={{ background: '#FFF8E6', border: '1px solid #F3E2B8', color: '#8A6D1A', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Info size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '12.5px', lineHeight: 1.6 }}>
          <div>Demo note: these content fields are saved locally. Live homepage wiring can be enabled in the next step.</div>
          <div dir="rtl" style={{ marginTop: 2 }}>ملاحظة تجريبية: يتم حفظ هذه البيانات محليًا. يمكن ربطها بالصفحة الرئيسية في الخطوة التالية.</div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #F0E0D8' }}>
        <h3 style={{ marginTop: 0, color: '#2C1810' }}>Brand</h3>
        {pair('Brand Name', 'brandName', 'brandNameAr', 'Butterfly Gallery', 'اسم العلامة')}
        {pair('Tagline', 'brandTagline', 'brandTaglineAr', 'Elegance Without Limits', 'أناقة لا حدود لها')}

        <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #F0E0D8' }} />

        <h3 style={{ color: '#2C1810' }}>Hero Section</h3>
        {pair('Hero Title', 'heroTitle', 'heroTitleAr', 'Your Elegance', 'أناقتكِ')}
        {pair('Hero Subtitle', 'heroSub', 'heroSubAr', 'Discover the finest jewelry…', 'اكتشفي أجمل المجوهرات…')}

        <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #F0E0D8' }} />

        <h3 style={{ color: '#2C1810' }}>Brand Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <ColorField label="Primary Color" value={formData.colors?.primary || '#F2C4CE'}
            onChange={(v) => setFormData({ ...formData, colors: { ...formData.colors, primary: v } })} />
          <ColorField label="Secondary Color" value={formData.colors?.secondary || '#C9A84C'}
            onChange={(v) => setFormData({ ...formData, colors: { ...formData.colors, secondary: v } })} />
        </div>

        <div style={{ marginTop: '24px' }}>
          <button onClick={handleSave}
            style={{ background: '#C9A84C', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ settings, onUpdate, onUpdateSocial, success, error, log }) {
  const s = settings?.social || {};
  // Empty fields fall back to the correct known links.
  const [socialData, setSocialData] = useState({
    instagram: s.instagram || SOCIAL_MEDIA.instagram,
    facebook: s.facebook || SOCIAL_MEDIA.facebook,
    tiktok: s.tiktok || SOCIAL_MEDIA.tiktok,
    whatsapp: s.whatsapp || '',
  });

  const handleSaveSocial = async () => {
    try {
      // Store WhatsApp as digits only (no +, spaces or dashes) for one consistent format.
      const cleaned = { ...socialData, whatsapp: String(socialData.whatsapp || '').replace(/[^0-9]/g, '') };
      const waChanged = (s.whatsapp || '') !== cleaned.whatsapp;
      await onUpdateSocial(cleaned);
      setSocialData(cleaned);
      success('Social media links updated!');
      log && log('Settings updated', 'settings',
        `Saved social links${waChanged ? ` · WhatsApp set to ${cleaned.whatsapp || '—'}` : ''}`);
    } catch (err) {
      error('Error updating social links: ' + err.message);
    }
  };

  return (
    <div>
      <AdminHeader title="Settings" subtitle="Manage your contact links and integrations" />

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #F0E0D8', maxWidth: '640px' }}>
        <h3 style={{ marginTop: 0, color: '#2C1810' }}>Social Media Links</h3>

        <FormInput
          label="Instagram"
          value={socialData.instagram || ''}
          onChange={(e) => setSocialData({ ...socialData, instagram: e.target.value })}
          placeholder="https://instagram.com/..."
        />
        <FormInput
          label="Facebook"
          value={socialData.facebook || ''}
          onChange={(e) => setSocialData({ ...socialData, facebook: e.target.value })}
          placeholder="https://facebook.com/..."
        />
        <FormInput
          label="TikTok"
          value={socialData.tiktok || ''}
          onChange={(e) => setSocialData({ ...socialData, tiktok: e.target.value })}
          placeholder="https://tiktok.com/@..."
        />
        <FormInput
          label="WhatsApp Number"
          value={socialData.whatsapp || ''}
          onChange={(e) => setSocialData({ ...socialData, whatsapp: e.target.value })}
          placeholder="201012345678"
        />
        <p style={{ fontSize: '12px', color: '#9B8878', margin: '-8px 0 0' }}>
          Digits only, no + sign. Example: <strong>201012345678</strong> (country code + number). Used by the storefront's floating WhatsApp button.
        </p>
        {(() => {
          const wa = String(socialData.whatsapp || '').replace(/[^0-9]/g, '');
          const isPlaceholder = !wa || wa === STORE_WHATSAPP;
          if (!isPlaceholder) return null;
          return (
            <p style={{ fontSize: '12px', color: '#B45309', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '6px', padding: '8px 12px', margin: '10px 0 0' }}>
              ⚠ This is a placeholder number ({STORE_WHATSAPP}). Replace it with the store's real WhatsApp number before going live.
            </p>
          );
        })()}

        <div style={{ marginTop: '24px' }}>
          <button
            onClick={handleSaveSocial}
            style={{ background: '#C9A84C', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
          >
            Save Social Media Links
          </button>
        </div>
      </div>
    </div>
  );
}

// Map an entity type to a Badge variant for the activity log.
const ENTITY_VARIANT = { product: 'default', order: 'warning', content: 'success', settings: 'success', auth: 'default' };

function ActivityLogPage({ logs = [], clearLogs }) {
  const [adminFilter, setAdminFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const adminNames = Array.from(new Set(['Rana', 'Menna', ...logs.map(l => l.adminName).filter(Boolean)]));
  const entityTypes = Array.from(new Set(logs.map(l => l.entityType).filter(Boolean)));

  const q = search.trim().toLowerCase();
  const filtered = logs.filter(l => {
    const matchesAdmin = adminFilter === 'all' || l.adminName === adminFilter;
    const matchesType = typeFilter === 'all' || l.entityType === typeFilter;
    const matchesQ = !q || [l.adminName, l.action, l.details, l.entityId, l.entityName]
      .some(v => String(v || '').toLowerCase().includes(q));
    return matchesAdmin && matchesType && matchesQ;
  });

  const handleClear = () => {
    if (clearLogs && window.confirm('Clear the entire activity log? (demo only)')) clearLogs();
  };

  const cellHead = { padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#2C1810', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' };
  const cell = { padding: '12px 16px', color: '#2C1810', fontSize: '14px', verticalAlign: 'top' };

  return (
    <div>
      <AdminHeader
        title="Activity Log"
        subtitle="Audit trail of admin actions (stored locally for this demo)"
        actions={clearLogs ? [{ label: 'Clear log', variant: 'outline', icon: <Trash2 size={16} />, onClick: handleClear }] : []}
      />

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
          <Search size={15} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#9B8878' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search admin, action, order ID or product…"
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid #F0E0D8', borderRadius: '8px', fontSize: '13px', fontFamily: 'inherit', background: 'white', color: '#2C1810', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <AdminSelect
          value={adminFilter}
          onChange={setAdminFilter}
          minWidth={150}
          options={[{ value: 'all', label: 'All admins' }, ...adminNames.map(n => ({ value: n, label: n }))]}
        />
        <AdminSelect
          value={typeFilter}
          onChange={setTypeFilter}
          minWidth={150}
          options={[{ value: 'all', label: 'All types' }, ...entityTypes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))]}
        />
        <span style={{ fontSize: '13px', color: '#9B8878', marginLeft: 'auto' }}>{filtered.length} of {logs.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: 'white', padding: '48px 24px', borderRadius: '12px', border: '1px solid #F0E0D8', textAlign: 'center', color: '#9B8878' }}>
          <History size={28} style={{ marginBottom: 10, opacity: 0.5 }} />
          <p style={{ margin: 0 }}>{logs.length === 0 ? 'No activity recorded yet.' : 'No entries match your filters.'}</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #F0E0D8', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '720px' }}>
            <thead>
              <tr style={{ background: '#FDF0F3', borderBottom: '1px solid #F0E0D8' }}>
                <th style={cellHead}>Date / Time</th>
                <th style={cellHead}>Admin</th>
                <th style={cellHead}>Action</th>
                <th style={cellHead}>Entity</th>
                <th style={cellHead}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #F0E0D8' }}>
                  <td style={{ ...cell, whiteSpace: 'nowrap', color: '#9B8878' }}>{fmtDate(l.createdAt)}</td>
                  <td style={cell}>
                    <div style={{ fontWeight: 600 }}>{l.adminName}</div>
                    <div style={{ fontSize: '12px', color: '#9B8878' }}>{l.adminEmail}</div>
                  </td>
                  <td style={cell}>
                    <Badge variant={ENTITY_VARIANT[l.entityType] || 'default'}>{l.action}</Badge>
                  </td>
                  <td style={{ ...cell, textTransform: 'capitalize', color: '#6B4C3B' }}>{l.entityType || '—'}</td>
                  <td style={{ ...cell, color: '#6B4C3B', overflowWrap: 'anywhere' }}>{l.details || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
