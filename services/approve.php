

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
        

        $sql1="UPDATE public.tbl_punjab_grid SET req_status='approved' WHERE gid=$gid;";
        
        
        $result_query = pg_query($sql1);
        if ($result_query) {
            $output = "approved successfully";
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