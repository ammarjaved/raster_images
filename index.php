<?php
session_start();
$loc = 'http://' . $_SERVER['HTTP_HOST'];
if (isset($_SESSION['logedin'])) {

} 
else {
    header("Location:" . $loc . "/raster_images/login/loginform.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SP</title>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="css/style.css">
    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>


</head>
<body>
<!-- <div class="container"> -->
    <nav>
        <div class="nav-wrapper">
            
                <a href="#"><img style="margin-top: 10px; margin-left: 30px !important;" src="images/logot.png" height="50px" width="250px"></a>
                <a href="#" class="brand-logo center">Raster Dashboard</a>
                <a href="services/logout.php" class="right" style="margin-right: 30px !important;">Logout</a>
           
        </div>
    </nav>
    <hr class="hr1">
    <!-- <div class="row tocmap">
        <div class="col s3" style="background-color: #FFC128;border-right: 3px solid purple"><p class="headingp"></p></div>
        <div class="col s9" style="background-color: #FFC128"><p class="headingp"></p></div>
    </div> -->
    <div class="row sidemap">
       
        <div class="col s3 leftside">
            <div class="row">
                <div class="col s12 tabsdiv" >
                  <ul class="tabs" >
                    <li class="tab col s3"><a href="#test1">TOC</a></li>
                    <li class="tab col s3"><a href="#test2">Navigation</a></li>
                    <li class="tab col s3"><a href="#test3">Search</a></li>
                    <li class="tab col s3"><a href="#test4">Reasult</a></li>
                  </ul>
                </div>
                <div id="test1" class="col s12">Toc</div>

                <div id="test2" class="col s12">
                    <div class="row">
                        <form >
                            
                            <div class="input-field col s12" >
                                <select id="division">
                                <option value="" disabled selected>Division</option>
                                </select>
                            </div>
                            <div class="input-field col s12">
                                <select id="district">
                                <option value="" disabled selected>District</option>
                                </select>
                            </div>
                            <div class="input-field col s12">
                                <select id="tehsil">
                                <option value="" disabled selected>Tehsil</option>
                                </select>
                            </div>
                            <div class="input-field col s12">
                                <select id="city">
                                <option value="" disabled selected>City</option>
                                </select>
                            </div>
                        </form>
                    </div>                        
                </div>
                
                <div id="test3" class="col s12">Test 3</div>
                
                <div id="test4" class="col s12">
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                    <div style="padding-left: 0px;" class="card col s12">
                        <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                        <div class="container" style="float:right;width:45%">
                            <b>Name: </b><a href="#">Lahore image</a>
                            <p><b>Description:  </b>minare pakistan image</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="col s9 mapdiv">
            <div id="map"></div>
        </div>


    </div>
<!-- </div> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="js/main.js"></script>
</body>

</html>