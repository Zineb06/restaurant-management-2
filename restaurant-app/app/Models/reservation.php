<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservation extends Model
{
    use HasFactory;
    protected $table = 'reservation';
    protected $primaryKey = 'idReservation';
    protected $fillable = ['idClient', 'date','time', 'GuestsNumber','NumTable','status'];
}
