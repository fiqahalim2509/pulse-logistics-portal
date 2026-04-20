<?php

namespace Database\Seeders;

use App\Models\Inventory;
use App\Models\Vendor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vendor = Vendor::create([
            'name' => 'TechCorp Global',
            'contact_email' => 'supply@techcorp.com',
            'lead_time' => '3 Days'
        ]);

        Inventory::create([
            'item_name' => 'Server Chassis',
            'stock_level' => 45,
            'status' => 'stable',
            'vendor_id' => $vendor->id,
            'last_updated' => now(),
        ]);
        Inventory::create([
            'item_name' => 'Ethernet Cables',
            'stock_level' => 5,
            'status' => 'critical',
            'vendor_id' => $vendor->id,
            'last_updated' => now(),
        ]);
    }
}
