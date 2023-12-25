<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class menu extends Model
{
    use HasFactory;
    protected $primaryKey = 'idMenu';
    protected $fillable = ['idMenu', 'category', 'image','dish', 'price'];
    protected $table = 'menu';

}
