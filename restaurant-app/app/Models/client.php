<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = ['nom', 'prenom', 'email', 'phone', 'cin'];
    protected $table = 'client';
    
}