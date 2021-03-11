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

        $dvid=$_REQUEST['dvid'];
        // $dvid=2;
        
        $sql1="select gid, district_name from tbl_district where division_id = $dvid;";


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