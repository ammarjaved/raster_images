<?php
include('connection.php');

class LoginUser extends connection
{
    function __construct()
    {
        $this->connectionDB();
    }

  function login()
  {
      $uname = $_REQUEST['name'];
      $email = $_REQUEST['email'];
      $password = $_REQUEST['password'];
      
     
     $sql_ins="INSERT INTO ".'"'."tbl_users".'"'."(user_name, email, password) VALUES ('$uname', '$email', '$password') ";

        $sql_reg_num = pg_query($sql_ins);

        if($sql_reg_num){
            return "success";
        }else{
           return "failure";
        }
  }

}
   $loginuser=new LoginUser();

       echo $loginuser->login();

?>