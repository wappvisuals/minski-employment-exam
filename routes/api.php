<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

$router->group(['prefix' => 'v1'], function () use ($router) {
    $router->post('register', [App\Http\Controllers\AuthenticationController::class, 'register']);
    $router->post('login', [App\Http\Controllers\AuthenticationController::class, 'login']);

    $router->group(['middleware' => 'auth.jwt'], function () use ($router) {
        Route::resource('clients', App\Http\Controllers\ClientController::class);
    });
});