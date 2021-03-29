<?php
class Connection
{
   // public $hostname = 'localhost';
    public $hostname = '172.20.82.73';
    public $port        = 5432;
    public $database    = 'db_raster_spacetech';
    public $username     = 'postgres';
<<<<<<< HEAD
    public $password = 'diamondx';
    // public $password     = '111';
=======
    // public $password = 'diamondx';
    public $password     = '123';
>>>>>>> 641b63bed0180f44eea3bb7d63b5a3f344be1f72

    public $conDB;

    public function connectionDB(){
        

        $this->conDB = pg_connect("host=$this->hostname dbname=$this->database user=$this->username password=$this->password");

        if(!$this->conDB)
        {
            die("connection failed");
        }
    }
    public function closeConnection(){
        pg_close($this->conDB);
    }
}

$con = new Connection();
echo $con->connectionDB();
?>