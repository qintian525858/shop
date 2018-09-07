<?php
/**
 * Created by PhpStorm.
 * User: link
 * Date: 2016/4/25
 * Time: 15:22
 */

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UsersController extends Controller {

   
    function __construct() {

    }


    public function login() {
        $params = $this->getAngularjsParam(true);

        dd($params);
        $account = isset($params->username) ? trim($params->username) : "" ;
        $passwd = isset($params->password) ? trim($params->password) : "" ;

        if(Auth::attempt(array('name' => $account, 'password' => $passwd))) {
            $user = Auth::getUser();
            $role_id_list = $user->roles()->lists('role_id');

            $permissions = DB::table("role_user")->Join('permission_role', function($join) {
                $join->on('role_user.role_id', '=', 'permission_role.role_id');
            })->Join('permissions', function($join) {
                $join->on('permission_role.permission_id', '=', 'permissions.id');
            })->where("role_user.user_id", $user["id"])->pluck("permissions.name");

            $this->log_op($user["id"], "login", "WEB登录", 'ok', ['id' => $user["id"]]);
            return response()->json(array('ret' => 0, 'msg' => "ok", 'data' => $permissions,"role_id_list"=>$role_id_list));
        } else {
            $this->log_op(0, "login", "WEB登录", 'error', ['username' => $account]);
            $this->user_log('error', 'account:' . $account . ', passwd:' . $passwd . ', msg: ' . json_encode(Auth::attempt(array('name' => $account, 'password' => $passwd))));
            return response()->json(array('ret' => 1, 'msg' => "用户名或密码错误"));
        }
    }

    

}
