<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Http\Controllers\AuthController;

use Inertia\Inertia;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\clientController;
use App\Http\Controllers\menuController;
use App\Http\Controllers\tableController;
use App\Http\Controllers\reservationController;
use App\Http\Controllers\reservationFormController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);

Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);

});


// Routes for admin
Route::get('/admin', [AdminController::class, 'getData']);

// Routes for clients
Route::get('/clients/{id}', [clientController::class, 'show']); // Get all clients
Route::get('/clients', [clientController::class, 'index']); // Get all clients
Route::post('/add/clients', [clientController::class, 'store']);
Route::delete('/clients/{id}', [clientController::class, 'destroy']); // Delete a client
Route::put('/clients/{id}', [clientController::class, 'update']);


// Routes for menu 
Route::get('/menus/{id}', [menuController::class, 'show']); // Get a specific menu item
Route::get('/menus', [menuController::class, 'index']); // Get all menu items
Route::post('/add/menus', [menuController::class, 'store']); // Add a new menu item
Route::delete('/menus/{id}', [menuController::class, 'destroy']); // Delete a menu item
Route::put('/menus/{id}', [menuController::class, 'update']); // Update a menu item



Route::get('/tables', [tableController::class, 'index']);
Route::post('/tables', [tableController::class, 'store']);
Route::get('/tables/{id}', [tableController::class, 'show']);
Route::put('/tables/{id}', [tableController::class, 'update']);
Route::delete('/tables/{id}', [tableController::class, 'destroy']);


Route::get('/reservations', [reservationController::class, 'index']);
Route::post('/reservations', [reservationController::class, 'store']);
Route::get('/reservations/{id}', [reservationController::class, 'show']);
Route::put('/reservations/{id}', [reservationController::class, 'update']);
Route::delete('/reservations/{id}', [reservationController::class, 'destroy']);




Route::get('/api/test', function () {
    return 'API Test';
});