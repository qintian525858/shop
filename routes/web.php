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
Route::any('api/admin/users_add', 'AdminController@users_add');
Route::any('api/admin/users_edit', 'AdminController@users_edit');
Route::any('api/admin/users_remove', 'AdminController@users_remove');
Route::any('api/admin/users_password', 'AdminController@users_password');
Route::any('api/admin/users_role_edit', 'AdminController@users_role_edit');

Route::any('api/admin/role_list', 'AdminController@role_list');
Route::any('api/admin/role_add', 'AdminController@role_add');
Route::any('api/admin/role_edit', 'AdminController@role_edit');
Route::any('api/admin/role_remove', 'AdminController@role_remove');
Route::any('api/admin/jurisdiction_list', 'AdminController@jurisdiction_list');
Route::any('api/admin/role_select_jurisdiction', 'AdminController@role_select_jurisdiction');
Route::any('api/admin/role_add_jurisdiction', 'AdminController@role_add_jurisdiction');


