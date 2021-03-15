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

    <script src="https://unpkg.com/esri-leaflet@2.1.1/dist/esri-leaflet.js"></script>


</head>
<body>
<div class="container">
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
                    <li class="tab col s3"><a href="#toc">TOC</a></li>
                    <li class="tab col s3"><a href="#navi">Navigation</a></li>
                    <li class="tab col s3"><a href="#search">Search</a></li>
                    <li class="tab col s3"><a href="#result">Reasult</a></li>
                  </ul>
                </div>
                <div class="tabsdata">
                    <div id="toc" class="col s12">
                        <form action="#">
                          
                            <p>
                            <label>
                                <input type="checkbox" class="filled-in" checked="checked" onclick="addRemoveLayer('divi')" id="divi" />
                                <span>Division</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <input type="checkbox" class="filled-in" checked="checked" onclick="addRemoveLayer('dist')" id="dist" />
                                <span>District</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <input type="checkbox" class="filled-in" checked="checked" onclick="addRemoveLayer('teh')" id="teh" />
                                <span>Tehsil</span>
                            </label>
                            </p>
                            <p>
                            <label>
                                <input type="checkbox" class="filled-in" checked="checked" onclick="addRemoveLayer('city')" id="city" />
                                <span>City</span>
                            </label>
                            </p>
                        </form>
                    </div>

                    <div id="navi" class="col s12">
                        <div class="row">
                            <form >
                                
                                <div class="input-field col s12" >
                                    <select onchange="query_by_nid_new(0,this.value)" id="division">
                                    <option value="" disabled selected>Division</option>
                                    </select>
                                </div>
                                <div class="input-field col s12">
                                    <select onchange="query_by_nid_new(1,this.value)" id="district">
                                    <option value="" disabled selected>District</option>
                                    </select>
                                </div>
                                <div class="input-field col s12">
                                    <select onchange="query_by_nid_new(2,this.value)" id="tehsil">
                                    <option value="" disabled selected>Tehsil</option>
                                    </select>
                                </div>
                                <div onchange="query_by_nid_new(3,this.value)" class="input-field col s12">
                                    <select id="city">
                                    <option value="" disabled selected>City</option>
                                    </select>
                                </div>
                            </form>
                        </div>                        
                    </div>
                    
                    <div id="search" class="col s12">
                        <form action="#">
                            <div class="file-field input-field">
                                <div class="btn green">
                                    <span>Upload File</span>
                                    <input type="file" multiple>
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload one or more files">
                                </div>
                            </div>
                            <a class="right waves-effect waves-light green btn-small" style="margin-bottom:5px !important;">Search</a>
                            
                        </form>
                    </div>
                    
                    <div id="result" class="col s12">
                        <div style="padding-left: 0px;" class="card col s12">
                            <img src="images/lhr.jpg" alt="lhr" style="float:left;width:45%">
                            <div class="container" style="float:right;width:45%">
                                <b>Name: </b><a href="#">Lahore image</a>
                                <p><b>Description:  </b>minare pakistan image</p>
                                <a class="right waves-effect waves-light green btn-small" style="margin-bottom:5px !important;">Download</a>
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
        </div>


        <div class="col s9 mapdiv">
            <div id="map"></div>
        </div>


    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="js/main.js"></script>
</body>

</html>