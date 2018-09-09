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
use App\User;
use Crypt;
use Hash;

class AdminController extends Controller {

   	public $logs_path;
    function __construct() {
 		$this->logs_path = "admin";
    }


    public function users_list()
    {
        $params = $this->getAngularjsParam(true);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        $tabs = DB::table('users')
                ->where('status',0)
                ->orderBy('id','desc')
                ->select(['*'])
                ->paginate($params["itemsPerPage"])
                ->toArray();
        $res['data'] = $tabs;
    END:
        return Response::json($res);
    }

    public function users_add()
    {
        $params = $this->getAngularjsParam(true);
        //dd($params);
        $usersinfo = $params['usersinfo'];
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        $repeat_count = DB::table('users')->where('name',$usersinfo['name'])->where('status',0)->count();
        if($repeat_count > 0){
            $res['ret'] = 1;
            $res['msg'] = '该管理员账号已存在！'; 
            goto END;
        }

        $sqlData = array();
        $sqlData['name'] = $usersinfo['name'];
        $sqlData['email'] = $usersinfo['name'];
        $sqlData['password'] = Hash::make($usersinfo['password']);
        $lastId = DB::table('users')->insertGetId($sqlData);
        $usersinfo['id'] = $lastId;
        $res['data'] = $usersinfo;
    END:
        return Response::json($res);
    }


    public function role_list()
    {
        $params = $this->getAngularjsParam(true);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        $tabs = DB::table('roles')
                ->where('is_delete',0)
                ->get(['*']);
        $res['data'] = $tabs;
    END:
        return Response::json($res);
    }


    public function role_add()
    {
        $params = $this->getAngularjsParam(true);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        //dd($params);
        $roleinfo = $params['roleinfo'];
        $repeat_count = DB::table('roles')->where('name',$roleinfo['name'])->count();
        if($repeat_count > 0){
            $res['ret'] = 1;
            $res['msg'] = '该角色名称已存在！'; 
            goto END;
        }
        $lastId = DB::table('roles')->insertGetId(array("name"=>$roleinfo['name']));
        $roleinfo['id'] = $lastId;
        $res['data'] = $roleinfo;
    END:
        return Response::json($res);
    }

    public function role_edit()
    {
        $params = $this->getAngularjsParam(true);
        //dd($params);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        $roleinfo = $params['roleinfo'];
        $repeat_count = DB::table('roles')->where('id','<>',$roleinfo['id'])->where('name',$roleinfo['name'])->count();
        if($repeat_count > 0){
            $res['ret'] = 1;
            $res['msg'] = '该角色名称已存在！'; 
            goto END;
        }
        DB::table('roles')->where('id',$roleinfo['id'])->update(array("name"=>$roleinfo['name']));
        $res['data'] = $roleinfo;
    END:
        return Response::json($res);
    }

    public function role_remove()
    {
        $params = $this->getAngularjsParam(true);
        //dd($params);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        $roleinfo = $params['roleinfo'];
        DB::table('roles')->where('id',$roleinfo['id'])->update(['is_delete'=>1]);
        $res['data'] = $roleinfo;
    END:
        return Response::json($res);
    }


    public function jurisdiction_list()
    {
        $params = $this->getAngularjsParam(true);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        $tabs = DB::table('jurisdictions')
                ->get(['*']);
        $res['data'] = $tabs;
    END:
        return Response::json($res);
    }

    public function users_remove()
    {
        $params = $this->getAngularjsParam(true);
        $res['ret'] = 0;
        $res['msg'] = 'ok';
        DB::table('users')->where('id',$params['usersinfo']['id'])->update(['status'=>1]);
        $res['data'] = $params['usersinfo'];
    END:
        return Response::json($res);
    }

    public function users_password()
    {
        $params = $this->getAngularjsParam(true);
        $res['ret'] = 0;
        $res['msg'] = '密码修改成功';
        DB::table('users')->where('id',$params['usersinfo']['id'])->update(['password'=>Hash::make($params['users']['password1'])]);
    END:
        return Response::json($res);
    }





}
