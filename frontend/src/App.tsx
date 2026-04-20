import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, AlertTriangle, CheckCircle, Package } from 'lucide-react';

interface InventoryItem {
  id: number;
  item_name: string;
  stock_level: number;
  status: string;
}

function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // Note: We use the VM IP and the forwarded port 8088
    axios.get('http://localhost:8088/api/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
        <Activity size={32} color="#2563eb" />
        <h1>Pulse Logistics Monitor</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Package size={24} color="#64748b" />
              {item.status === 'critical' ? <AlertTriangle color="#ef4444" /> : <CheckCircle color="#22c55e" />}
            </div>
            <h3 style={{ margin: '15px 0 5px' }}>{item.item_name}</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{item.stock_level} <span style={{ fontSize: '14px', color: '#64748b' }}>units</span></p>
            <p style={{ color: item.status === 'critical' ? '#ef4444' : '#22c55e', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;