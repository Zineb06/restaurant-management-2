<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\reservationController;
use App\Http\Controllers\clientController;
use App\Http\Controllers\menuController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Client\theClientController;
use App\Http\Controllers\tableController;
use App\Http\Controllers\reservationFormController;

// use Illuminate\Support\Facades\URL;
// URL::forceScheme('https');


Route::get('/', function () {
    return View ('welcome');
       
});

Route::resource('reservations', reservationController::class);
Route::resource('clients', clientController::class);
Route::resource('menus', menuController::class);
Route::resource('admin', AdminController::class);
Route::resource('client', theClientController::class);
Route::resource('tables', tableController::class);
Route::resource('reservationForm', reservationFormController::class);



// link of react app : 
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');


