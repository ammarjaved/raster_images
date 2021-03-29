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

        $geom=$_REQUEST['geom'];
        // echo $geom;
        // exit();

        $sql1="select * from tbl_punjab_grid where st_intersects(st_geomfromtext(st_Astext(ST_GeomFromGeoJSON('$geom')),4326),geom)";
        
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