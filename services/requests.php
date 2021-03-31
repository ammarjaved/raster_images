

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

        $gid=$_REQUEST['gid'];
        $uid=$_REQUEST['uid'];
        // $uinput=$_REQUEST['uinput'];


        $sql1="INSERT INTO public.tbl_requests(user_id, gid) VALUES ($uid, $gid);";

        
        $result_query = pg_query($sql1);
        if ($result_query) {
            $output = "Requested successfully";
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