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

  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#2563eb', padding: '8px', borderRadius: '10px' }}>
            <Activity size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Pulse Logistics</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#64748b', fontSize: '14px' }}>
          <RefreshCw size={16} className={items.length > 0 ? "spinning" : ""} />
          Last synced: {lastSynced}
        </div>
      </header>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '30px', maxWidth: '400px' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
        <input 
          type="text" 
          placeholder="Search items or vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0',
            fontSize: '15px', outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        />
      </div>

      {/* Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{ 
            padding: '24px', background: '#fff', borderRadius: '16px', 
            border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ padding: '8px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                <Package size={20} color="#475569" />
              </div>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px',
                backgroundColor: item.status === 'critical' ? '#fef2f2' : '#f0fdf4',
                color: item.status === 'critical' ? '#ef4444' : '#22c55e',
                fontSize: '12px', fontWeight: 700
              }}>
                {item.status === 'critical' ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                {item.status.toUpperCase()}
              </div>
            </div>

            <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '4px' }}>{item.item_name}</h3>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{item.stock_level}</span>
              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>units in stock</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '16px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="#94a3b8" />
              <div style={{ fontSize: '13px' }}>
                <span style={{ color: '#94a3b8' }}>Vendor: </span>
                <span style={{ color: '#475569', fontWeight: 600 }}>{item.vendor?.name || 'Unassigned'}</span>
              </div>
            </div>
            {item.vendor && (
              <div style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '24px', marginTop: '2px' }}>
                Lead time: {item.vendor.lead_time}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;