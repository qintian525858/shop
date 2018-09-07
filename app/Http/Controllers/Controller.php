<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Formatter\LineFormatter;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct(){
    	$userid = Auth::id();
        if ($userid == null) {
            echo json_encode(array('ret' => 999, 'msg' => "用户未登录"));
            exit();
        }
    }


    //获取路由参数
    protected function getAngularjsParam($type = False)
    {
        $content = file_get_contents('php://input');
        return json_decode($content, $type);
    }

    //日志
    public function logs($filename,$note)
    {
		$logger = $this->getDailyFileLogger($filename);
        $logger->info($note);
        return TRUE;
    }


    public function getDailyFileLogger($filename) {
		$filepath = '';
		$logger = new Logger($filename);
		$filepath = storage_path() . '/logs/' . $filename .'/'.$filename.'.log';
		$handler = (new RotatingFileHandler($filepath))->setFormatter(new LineFormatter(null, null, true, true));
		$logger->pushHandler($handler);
		return $logger;
	}
    
}
