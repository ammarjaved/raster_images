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

        $uid=$_REQUEST['uid'];
        // echo $geom;
        // exit();

        $sql1="select * from tbl_punjab_grid where gid in(select gid from tbl_requests where user_id=$uid)";
        
        $result_query = pg_query($sql1);
        if ($result_query) {
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