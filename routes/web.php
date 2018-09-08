<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//管理员登录
Route::any('api/users/login', 'UsersController@login');
Route::any('api/users/logout', 'UsersController@logout');
Route::any('api/users/check_login', 'UsersController@check_login');

//管理员详情
Route::any('api/admin/users_list', 'AdminController@users_list');
Route::any('api/admin/jurisdiction_list', 'AdminController@jurisdiction_list');

