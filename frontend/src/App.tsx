import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, AlertTriangle, CheckCircle, Package, Truck, Search, RefreshCw } from 'lucide-react';
import './App.css';

interface Vendor {
  id: number;
  name: string;
  contact_email: string;
  lead_time: string;
}
interface InventoryItem {
  id: number;
  item_name: string;
  stock_level: number;
  status: string;
  vendor?: Vendor; // New relationship
}

function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSynced, setLastSynced] = useState<string>(new Date().toLocaleTimeString());

  const fetchData = () => {
    axios.get('http://localhost:8088/api/inventory')
      .then(response => {
        setItems(response.data);
        setLastSynced(new Date().toLocaleTimeString());
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems = items.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vendor?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalItems = items.filter(item => item.status === 'critical');

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo-section">
          <div className="icon-box"><Activity size={28} color="#fff" /></div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Pulse Logistics</h1>
        </div>
        <div className="sync-status">
          <RefreshCw size={16} className={items.length > 0 ? "spinning" : ""} />
          Last synced: {lastSynced}
        </div>
      </header>

      {/* critical alers */}
      {criticalItems.length > 0 && (
        <div className="alerts-section">
          <h2 style={{ fontSize: '14px', color: '#e11d48', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Critical Actions Required
          </h2>
          {criticalItems.map(item => (
            <div key={`alert-${item.id}`} className="critical-alert-card">
              <div className="alert-message">
                <AlertTriangle className="pulse-icon" size={20} />
                <span>Stock for <strong>{item.item_name}</strong> is critically low ({item.stock_level} units).</span>
              </div>
              <div style={{ fontSize: '13px', color: '#be123b' }}>
                Contact: {item.vendor?.contact_email || 'No Vendor Assigned'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* search bar */}
      <div className="search-container">
        <Search className="search-icon" style={{ position: 'absolute', left: '12px', top: '35%', color: '#94a3b8' }} size={18} />
        <input 
          className="search-input"
          type="text" 
          placeholder="Search items or vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="inventory-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="inventory-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <Package size={20} color="#475569" />
              <div className={`status-badge ${item.status === 'critical' ? 'status-critical' : 'status-stable'}`}>
                {item.status === 'critical' ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                {item.status.toUpperCase()}
              </div>
            </div>

            <h3>{item.item_name}</h3>
            <div className="stock-level">
              <span style={{ fontSize: '28px', fontWeight: 800 }}>{item.stock_level}</span>
              <span style={{ color: '#64748b' }}> units</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '16px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="#94a3b8" />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.vendor?.name || 'Unassigned'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;