<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Interest;

class InterestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = date('Y-m-d H:s:i');
        $data = [
            [
                'name'=>'Reading',
                'created_at'=> $now,
                'updated_at'=> $now
            ],
            [
                'name'=>'Cooking',
                'created_at'=> $now,
                'updated_at'=> $now
            ],
            [
                'name'=>'Watching TV',
                'created_at'=> $now,
                'updated_at'=> $now
            ],
            [
                'name'=>'Basketball',
                'created_at'=> $now,
                'updated_at'=> $now
            ]
        ];

        Interest::insert($data);
    }
}
