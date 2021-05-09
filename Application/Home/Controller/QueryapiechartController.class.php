<?php
namespace Home\Controller;
use Think\Controller;

class QueryapiechartController extends Controller
{
    public function index()
    {
		$this->display();
    }

    public function charts()
    {
		$this->display();
    }

    public function qnews()
    {
		$this->display();
    }

	public function lists()
    {
		$this->display();
    }


//*****************************************************************************
	//获取快讯输出
	public function getnews()
	{
		$types=I('types');
		$url = "http://alirm-gbft.konpn.com/query/qnews?pidx=1&ps=10&types=".$types;
		echo($this->http_request($url,C('AppCode')));
    }

	//获取k线数据输出
	public function kms()
	{
		$symbol=I('symbol');
		$period=I('period');
		$lasttick=(int)I('lasttick');

// 		if($period=="T")
// 			$period="1M";

		if($lasttick>0){
    		if($period=="T"){
    			echo($this->GetLstKMaps2($symbol, $period, $lasttick));
    		}else{
    			echo($this->GetLstKMaps($symbol, $period, $lasttick));
    		}
		}else{
			echo($this->GetKMaps($symbol, $period));
		}
    }

	//获取实时行情数据输出
	public function rms()
	{
		$symbols=I('get.symbols');
		$url = "http://alirm-gbft.konpn.com/query/comrms?symbols=".$symbols;
		echo($this->http_request($url,C('AppCode')));
	}

//从 gaojie获和数据
	public function GetLstKMaps2($symbol, $period, $fromtick)
	{
		$cachekms = array();
		$url = "http://k.gaojie.xyz/order/get-info?symbol=".$symbol;
		$obj=$this->http_request($url,C('AppCode'));
		$obj = trim($obj);
		die($obj);
		
	}


	//*****************************************************************************
	/// <summary>
	///	K线数据函数
	/// 获取最后n个新数据
	/// 尽量少消耗带宽
	/// </summary>
	public function GetLstKMaps($symbol, $period, $fromtick)
	{
		if($period=="T")
			$period="1M";

// 		$url = "http://alirm-gbft.konpn.com/query/comlstkm?period=".$period."&rout=*&symbol=".$symbol."&fromtick=".strval($fromtick);
// 		return $this->http_request($url,C('AppCode'));
		
			if($period=="T")
			$period="1M";
		 //$cache=Cache::getInstance('File');

		$ckey=$this->getCacheKey($symbol,$period);

		$cachekms = S($ckey);
		if(empty($cachekms)==true)
		{
			$cachekms = array();
			for($i=1;$i<=1;$i++)//每页n，取1页即可
			{
				//每次n条
				$url = "http://alirm-gbft.konpn.com/query/comkm?psize=10&period=".$period."&rout=*&pidx=".strval($i)."&withlast=1&symbol=".$symbol;
				$obj=json_decode($this->http_request($url,C('AppCode')));
				
				if(empty($obj)==true || $obj->Code<0){}
				else
				{
					$cachekms=array_merge($cachekms,$obj->Obj);
				}
			}

			if(empty($cachekms)==true || count($cachekms)<=0){}
			else
			{
				if($period=="D" || $period=="W" || $period=="M"){S($ckey,$cachekms,10*60);}
				else if($period=="1M"){S($ckey,$cachekms,60);}
				else if($period=="5M"){S($ckey,$cachekms,2*60);}
				else {S($ckey,$cachekms,5*60);}
			}

		$retl["Code"]=1;
		$retl['Obj'][0]=$cachekms[0];

			return json_encode($retl);
		}

		$retl["Code"]=0;
		$retl['Obj'][0]=$cachekms[0];
	

		return json_encode($retl);
		
	}


	/// <summary>
	/// K线数据函数
	/// 获取某品种某周期的一次性k线
	/// 1M最多1500，D最多2000，其他最多300
	/// 3分钟缓存,最后修复的至少3个
	/// </summary>
	/// <param name="symbol">品种</param>
	/// <param name="period">周期, 1M,5M,15M,30M,1H,D</param>
	public function GetKMaps($symbol, $period)
	{
		if($period=="T")
			$period="1M";
		 //$cache=Cache::getInstance('File');

		$ckey=$this->getCacheKey($symbol,$period);


			$Line = M("Data_line"); // 实例化
			
		$cachekms = S($ckey);
		if(empty($cachekms)==true)
		{
			$cachekms = array();
			for($i=1;$i<=1;$i++)//每页n，取1页即可
			{
				//每次n条
				$url = "http://alirm-gbft.konpn.com/query/comkm?psize=100&period=".$period."&rout=*&pidx=".strval($i)."&withlast=1&symbol=".$symbol;
				$obj=json_decode($this->http_request($url,C('AppCode')));
				
				if(empty($obj)==true || $obj->Code<0){}
				else
				{
					$cachekms=array_merge($cachekms,$obj->Obj);
				}
			}

			if(empty($cachekms)==true || count($cachekms)<=0){}
			else
			{
				if($period=="D" || $period=="W" || $period=="M"){S($ckey,$cachekms,10*60);}
				else if($period=="1M"){S($ckey,$cachekms,60);}
				else if($period=="5M"){S($ckey,$cachekms,2*60);}
				else {S($ckey,$cachekms,5*60);}
			}

		//写入数据
			foreach($cachekms as $v){
		    	$data = $this->object_to_array($v);
                $data['symbol'] = $symbol;
                $data['period'] = $period;
                $Line->add($data);
			}
			
			$retl["Code"]=1;
// 			$retl["Obj"]=$cachekms;

// 			return json_encode($retl);
		}

	

                $where['symbol'] = $symbol;
                $where['period'] = $period;
                $where['Tick']  = array('lt',time());
                
                // var_dump($where);
           
                $cachekms = $Line->where($where)->field('C,Tick,D,O,H,L,A,V')->order('D desc')->limit(100)->select();//

            foreach($cachekms as &$v){
                $v['C'] = floatval($v['C']);
                $v['Tick'] = intval($v['Tick']);
                $v['O'] = floatval($v['O']);
                $v['H'] = floatval($v['H']);
                $v['L'] = floatval($v['L']);
                $v['A'] = floatval($v['A']);
                $v['V'] = floatval($v['V']);
			}



		$retl["Code"]=0;
		$retl["Obj"]=$cachekms;

		return json_encode($retl);
	}

    /**
     * 对象 转 数组
     *
     * @param object $obj 对象
     * @return array
     */
    public function object_to_array($obj) {
        $obj = (array)$obj;
        foreach ($obj as $k =>$v) {
            if (gettype($v) == 'resource') {
                return;
            }
            if (gettype($v) == 'object' || gettype($v) == 'array') {
                $obj[$k] = (array)object_to_array($v);
            }
        }
     
        return $obj;
    }

/**
 * 数组 转 对象
 *
 * @param array $arr 数组
 * @return object
 */
 public function array_to_object($arr) {
    if (gettype($arr) != 'array') {
        return;
    }
    foreach ($arr as $k => $v) {
        if (gettype($v) == 'array' || getType($v) == 'object') {
            $arr[$k] = (object)array_to_object($v);
        }
    }
 
    return (object)$arr;
}

	function getCacheKey($symbol,$period)//缓存，以防查询过多
	{
		$datekey = date("mdHi");//time();//
		if ($period == "D" || $period == "W" || $period == "M") $datekey = date("md");
		else if ($period == "T") $datekey = time();
		else if ($period == "1M") $datekey = date("mdHi");
		else if ($period == "5M") $datekey = date("mdH").floor(date("i")/5);
		else if ($period == "15M") $datekey = date("mdH").floor(date("i")/ 15);
		else if ($period == "30M") $datekey = date("mdH").floor(date("i")/ 30);
		else if ($period == "1H") $datekey = date("mdH");
		else if ($period == "4H") $datekey = date("md").floor(date("H")/4);

		return "queryechart".$symbol.$period.$datekey;
	}

	//*****************************************************************************
//http请求
    function http_request($url, $appcode)
    {
		$headers = array();
		array_push($headers, "Authorization:APPCODE " . $appcode);
		array_push($headers, "Accept:application/json");
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($curl, CURLOPT_FAILONERROR, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HEADER, false);
		if (1 == strpos("$".$url, "https://"))
		{
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		}

		$result = curl_exec ( $curl );
        curl_close($curl);
        return $result;
    }

   function http_request_clear($url)
    {
		$headers = array();
		array_push($headers, "Accept:application/json");
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($curl, CURLOPT_FAILONERROR, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HEADER, false);
		if (1 == strpos("$".$url, "https://"))
		{
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		}

		$result = curl_exec ( $curl );
        curl_close($curl);
        return $result;
    }
}