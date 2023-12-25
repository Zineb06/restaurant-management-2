<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\table;
use Illuminate\View\View;

class AdminController extends Controller
{
    public function index() : View 
    {
        $table = table::all();
        return view('admin.dashboard')-> with ('table', $table);
    }
}
