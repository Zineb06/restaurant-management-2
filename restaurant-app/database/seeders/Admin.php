<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User; // Make sure to import the User model

class Admin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
             'name' => 'Admin',
             'email' => 'admin@gmail.com',
             'email_verified_at' => now(),
             'password' => Hash::make('password'), // Use Hash::make to hash the password
             'remember_token' => Str::random(10),
             'is_admin' => 1
        ]);
    }
}
