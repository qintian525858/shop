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

}
