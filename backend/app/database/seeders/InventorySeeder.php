<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Inventory::create([
            'item_name' => 'Server Chassis',
            'stock_level' => 45,
            'status' => 'stable',
            'last_updated' => now(),
        ]);
        \App\Models\Inventory::create([
            'item_name' => 'Ethernet Cables',
            'stock_level' => 5,
            'status' => 'critical',
            'last_updated' => now(),
        ]);
    }
}
