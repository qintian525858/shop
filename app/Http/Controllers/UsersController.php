<?php
/**
 * Created by PhpStorm.
 * User: link
 * Date: 2016/4/25
 * Time: 15:22
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use Auth;

class UsersController extends Controller {

   	public $logs_path;
    function __construct() {
 		$this->logs_path = "users";
    }

    public function login() {
        $params = $this->getAngularjsParam();
        $account = isset($params->username) ? trim($params->username) : "" ;
        $passwd = isset($params->password) ? trim($params->password) : "" ;

        if(Auth::attempt(array('name' => $account, 'password' => $passwd))) {
            $adminId = Auth::id();
            $this->logs($this->logs_path,("用户ID:".$adminId.",".$account."登录成功！"));
            return response()->json(array('ret' => 0, 'msg' => "ok"));
        } else {
            
            return response()->json(array('ret' => 1, 'msg' => "用户名或密码错误"));
        }
        
    }

    public function logout()
    {
        Auth::logout();
        $this->logs($this->logs_path,("用户ID:".Auth::id().",退出成功！"));
        return redirect('/admin/login.html');
    }
    

    public function check_login()
    {
        $userid = Auth::id();
        if ($userid == null) {
            echo json_encode(array('ret' => 999, 'msg' => "用户未登录"));
            exit();
        }
    }

    

}
