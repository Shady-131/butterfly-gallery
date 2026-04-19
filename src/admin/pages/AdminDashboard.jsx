import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import { LogOut, LayoutDashboard, Box, ShoppingCart, Settings, BarChart3, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { AdminHeader, DataTable, FormInput, Badge, Modal } from '../components/AdminComponents';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { settings, products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, updateSocialMedia, updateSettings } = useAppData();
  const { success, error } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Box },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'content', label: 'Website Content', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#FDF8F5',
      fontFamily: "'Jost', sans-serif",
    }}>
      {/* Sidebar */}
      <aside style={{
        background: '#2C1810',
        color: '#F5ECD0',
        width: sidebarOpen ? '280px' : '80px',
        transition: 'width 0.3s ease',
        borderRight: '1px solid rgba(245,236,208,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        left: 0,
        top: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid rgba(245,236,208,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: 'space-between',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#C9A84C',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}>
            🦋
          </div>
          {sidebarOpen && (
            <span style={{ fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em' }}>
              ADMIN
            </span>
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
                onClick={() => setActivePage(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: isActive ? 'rgba(201,168,76,0.2)' : 'transparent',
                  color: isActive ? '#F5ECD0' : 'rgba(245,236,208,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarOpen ? '12px' : '0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: isActive ? '3px solid #C9A84C' : '3px solid transparent',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 500 : 400,
                }}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={18} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div style={{
          borderTop: '1px solid rgba(245,236,208,0.1)',
          padding: '12px 0',
        }}>
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
              justifyContent: sidebarOpen ? 'space-between' : 'center',
              gap: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px',
            }}
          >
            {sidebarOpen && 'Collapse'}
            <ChevronRight size={16} style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'none' }} />
          </button>

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
              gap: sidebarOpen ? '12px' : '0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              fontFamily: 'inherit',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
            }}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease',
      }}>
        {/* Top Bar */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #F0E0D8',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#2C1810',
              margin: 0,
            }}>
              Dashboard
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#9B8878',
              margin: '4px 0 0',
            }}>
              Welcome back, {user?.email}
            </p>
          </div>
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
  error
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
    />,
    orders: <OrdersPage 
      orders={orders}
      onUpdateStatus={onUpdateOrderStatus}
      success={success}
      error={error}
    />,
    content: <ContentPage settings={settings} onUpdate={onUpdateSettings} success={success} error={error} />,
    settings: <SettingsPage 
      settings={settings} 
      onUpdate={onUpdateSettings}
      onUpdateSocial={onUpdateSocialMedia}
      success={success}
      error={error}
    />,
  };

  return components[activePage] || <OverviewPage />;
}

function OverviewPage({ products, orders }) {
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <h2 style={{ margin: '0 0 24px', color: '#2C1810', fontSize: '24px', fontWeight: 600 }}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Total Products', value: products.length, icon: '📦', color: '#3B82F6' },
          { label: 'Total Orders', value: orders.length, icon: '🛒', color: '#10B981' },
          { label: 'Pending Orders', value: pendingOrders, icon: '⏳', color: '#F59E0B' },
          { label: 'Completed Orders', value: completedOrders, icon: '✅', color: '#8B5CF6' },
        ].map(card => (
          <div key={card.label} style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #F0E0D8',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
            <p style={{ color: '#9B8878', fontSize: '13px', margin: '0 0 8px' }}>{card.label}</p>
            <h3 style={{ color: '#2C1810', fontSize: '28px', fontWeight: 600, margin: 0 }}>{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsPage({ products, onAdd, onUpdate, onDelete, success, error }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
     ar: '', 
    en: '', 
    price: '', 
    category: 'jewelry', 
    img: '', 
    cat: 'jewelry' 
  });

  const handleSubmit = async () => {
    try {
      if (!formData.ar || !formData.en || !formData.price || !formData.img) {
        error('Please fill all required fields');
        return;
      }

      const productData = {
        ar: formData.ar,
        en: formData.en,
        price: parseInt(formData.price),
        category: formData.category,
        img: formData.img,
        dAr: 'Product description Arabic',
        dEn: 'Product description English',
        stars: 4.5,
        rc: 0,
        isNew: true,
        best: false,
      };

      if (editingId) {
        await onUpdate(editingId, productData);
        success('Product updated successfully!');
      } else {
        await onAdd(productData);
        success('Product added successfully!');
      }

      setFormData({ ar: '', en: '', price: '', category: 'jewelry', img: '' });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) {
      error('Error saving product: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      ar: product.ar,
      en: product.en,
      price: product.price,
      category: product.cat,
      img: product.img,
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDelete(id);
        success('Product deleted successfully!');
      } catch (err) {
        error('Error deleting product: ' + err.message);
      }
    }
  };

  const columns = [
    { key: 'ar', label: 'Product (AR)' },
    { key: 'price', label: 'Price', render: (price) => `${price} EGP` },
    { key: 'cat', label: 'Category', render: (cat) => <Badge>{cat}</Badge> },
    { key: 'img', label: 'Image', render: (img) => <img src={img} alt="" style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} /> },
  ];

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
              setFormData({ ar: '', en: '', price: '', category: 'jewelry', img: '' });
              setEditingId(null);
              setIsModalOpen(true);
            },
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={products}
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
            handler: (row) => handleDelete(row.id),
          },
        ]}
      />

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit Product' : 'Add New Product'}
        onClose={() => setIsModalOpen(false)}
      >
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
        <FormInput
          label="Price (EGP)"
          name="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="1000"
          required
        />
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
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #F0E0D8',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          >
            <option value="jewelry">Jewelry</option>
            <option value="accessories">Accessories</option>
            <option value="handbags">Handbags</option>
          </select>
        </div>
        <FormInput
          label="Image URL"
          name="img"
          value={formData.img}
          onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
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

function OrdersPage({ orders, onUpdateStatus, success, error }) {
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await onUpdateStatus(orderId, newStatus);
      success('Order status updated!');
    } catch (err) {
      error('Error updating order: ' + err.message);
    }
  };

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'status', label: 'Status', render: (status) => <Badge variant={status === 'completed' ? 'success' : 'warning'}>{status}</Badge> },
    { key: 'total', label: 'Total', render: (total) => `${total} EGP` },
    { key: 'createdAt', label: 'Date', render: (date) => new Date(date).toLocaleDateString() },
  ];

  return (
    <div>
      <AdminHeader
        title="Orders"
        subtitle="Manage customer orders"
      />

      {orders.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '48px 24px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#9B8878',
        }}>
          <p>No orders yet</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '20px',
        }}>
          {orders.map(order => (
            <div key={order.id} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #F0E0D8',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ color: '#2C1810', fontWeight: 600, margin: '0 0 4px' }}>{order.id}</h3>
                  <p style={{ color: '#9B8878', fontSize: '13px', margin: 0 }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #F0E0D8',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div style={{ paddingTop: '16px', borderTop: '1px solid #F0E0D8', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#9B8878', margin: '0 0 4px', fontWeight: 500 }}>Customer</p>
                  <p style={{ color: '#2C1810', margin: 0 }}>{order.customer?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#9B8878', margin: '0 0 4px', fontWeight: 500 }}>Phone</p>
                  <p style={{ color: '#2C1810', margin: 0 }}>{order.customer?.phone || 'N/A'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#9B8878', margin: '0 0 4px', fontWeight: 500 }}>Total</p>
                  <p style={{ color: '#2C1810', fontWeight: 600, margin: 0 }}>{order.total} EGP</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentPage({ settings, onUpdate, success, error }) {
  const [formData, setFormData] = useState(settings || {});

  const handleSave = async () => {
    try {
      await onUpdate(formData);
      success('Content updated successfully!');
    } catch (err) {
      error('Error updating content: ' + err.message);
    }
  };

  return (
    <div>
      <AdminHeader title="Website Content" subtitle="Manage your website content and text" />

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #F0E0D8' }}>
        <h3 style={{ marginTop: 0, color: '#2C1810' }}>Hero Section</h3>
        <FormInput
          label="Brand Name"
          value={formData.brandName || ''}
          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
        />
        <FormInput
          label="Brand Tagline"
          value={formData.brandTagline || ''}
          onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
        />
        <FormInput
          label="Hero Title"
          value={formData.heroTitle || ''}
          onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
        />

        <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #F0E0D8' }} />

        <h3 style={{ color: '#2C1810' }}>Colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <FormInput
            label="Primary Color"
            type="color"
            value={formData.colors?.primary || '#F2C4CE'}
            onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, primary: e.target.value } })}
          />
          <FormInput
            label="Secondary Color"
            type="color"
            value={formData.colors?.secondary || '#C9A84C'}
            onChange={(e) => setFormData({ ...formData, colors: { ...formData.colors, secondary: e.target.value } })}
          />
        </div>

        <div style={{ marginTop: '24px' }}>
          <button
            onClick={handleSave}
            style={{
              background: '#C9A84C',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ settings, onUpdate, onUpdateSocial, success, error }) {
  const [socialData, setSocialData] = useState(settings?.social || {});

  const handleSaveSocial = async () => {
    try {
      await onUpdateSocial(socialData);
      success('Social media links updated!');
    } catch (err) {
      error('Error updating social links: ' + err.message);
    }
  };

  return (
    <div>
      <AdminHeader title="Settings" subtitle="Manage your app settings and integrations" />

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #F0E0D8' }}>
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
          placeholder="+201234567890"
        />

        <div style={{ marginTop: '24px' }}>
          <button
            onClick={handleSaveSocial}
            style={{
              background: '#C9A84C',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save Social Media Links
          </button>
        </div>
      </div>
    </div>
  );
}
