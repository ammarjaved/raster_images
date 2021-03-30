<?php


include("connection.php");


class Pss extends connection
{
    function __construct()
    {
        $this->connectionDB();

    }

    public function loadData()
    {

        $output = array();
        $gidsarr = array();
        $uid=$_REQUEST['uid'];
        // echo $geom;
        // exit();

        $sql1="select gid from public.tbl_requests where uid = $uid;";
        
        $result_query = pg_query($sql1);
        if ($result_query) {
            $gidsarr = pg_fetch_all($result_query);
            $sql1="select * from tbl_punjab_grid where gid = $gidsarr;";
            $output = pg_fetch_all($result_query);
        }


        $this->closeConnection();
        // echo $output;
        return json_encode($output);
    }
}

$json = new Pss();
//$json->closeConnection();
echo $json->loadData();


?>