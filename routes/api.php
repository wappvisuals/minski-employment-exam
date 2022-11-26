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
    $router->get('interest', [App\Http\Controllers\InterestController::class, 'index']);

    $router->group(['middleware' => 'auth.jwt'], function () use ($router) {
        $router->post('clients/{id}', [App\Http\Controllers\ClientController::class, 'update']);
        Route::resource('clients', App\Http\Controllers\ClientController::class);
    });
});