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
    <!-- materialize icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--materialize Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

     <!--alertfy lib file-->
     <link rel="stylesheet" href="resources/alertify/themes/alertify.core.css"/>
    <link rel="stylesheet" href="resources/alertify/themes/alertify.default.css"/>
    <script src="resources/alertify/lib/alertify.min.js"></script>


    <link rel="stylesheet" href="css/style.css">

    

    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <!-- Leaflet esri start -->
    <script src="https://unpkg.com/esri-leaflet@2.1.1/dist/esri-leaflet.js"></script>

    <!-- Leaflet draw Plugin -->
    <link rel="stylesheet" href="resources/draw/leaflet.draw.css"/>
    <script src="resources/draw/leaflet.draw-custom.js"></script>

    <!-- Leaflet fullscreen Plugin  -->
    <script src="resources/full_screen/Leaflet.fullscreen.min.js"></script>
    <link rel="stylesheet" href="resources/full_screen/leaflet.fullscreen.css">

    <!--shapefile modules-->
    <script src="js/shapefile/shp.js"></script>
    <script src="js/shapefile/leaflet.shpfile.js"></script>


</head>
<body>
<div class="container">
    <nav>
        <div class="nav-wrapper">
            
                <a href="#"><img style="margin-top: 10px; margin-left: 30px !important;" src="images/logot.png" height="50px" width="250px"></a>
                <a href="#" class="brand-logo center" style="color: #ffc128c7;">RASTER DASHBOARD </a>
                <a href="services/logout.php" class="right" style="color: #FFC128; margin-right: 30px !important;">Logout</a>
           
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
                    <li class="tab col s3"><a href="#navi">Navigation</a></li>
                    <li class="tab col s2"><a href="#toc">TOC</a></li>
                    <li class="tab col s2"><a href="#search">Search</a></li>
                    <li id="resulttab" class="tab col s2"><a id="resulttab" href="#result">Reasult</a></li>
                    <li class="tab col s3"><a id="reqtab" href="#requests">Requests</a></li>
                  </ul>
                </div>
                <div class="tabsdata">
                    <div style="margin-left:20px;" id="toc" class="col s12">
                        <form action="#">
                          
                            <p >
                            <label>
                                <input type="checkbox" class="filled-in" checked="checked" onclick="addRemoveLayer('divi')" id="divi" />
                                <span>Division</span>
                            </label>
                            </p>
                            <!-- &nbsp<img src="images/divi.png" style="display: inline-block; margin-top: 20px;" alt="" width="30" height="30"> -->
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
                            <p>
                            <label>
                                <input type="checkbox" class="filled-in" checked="checked" onclick="addRemoveLayer('grid')" id="grid" />
                                <span>Punjab Grid</span>
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
                            <input type="hidden" id="cords" name="cordsinput">
                            <p class="center-align">
                                <a id="drawpoly" class="waves-effect waves-light btn-small green"><i class="material-icons left">drive_file_rename_outline</i>Draw Polygon</a>
                            </p>

                            <p class="center-align">
                            <a id="psubmit_btn" class="waves-effect waves-light btn-small green"><i class="material-icons left">search</i>Search</a>
                            </p>
                            <br>
                            <!-- <div class="file-field input-field">
                                <div class="btn-small green">
                                <i class="material-icons left">drive_folder_upload</i>
                                    <span>Upload File</span>
                                    <input type="file" id="shp" accept=".zip">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload Shape file" >
                                </div>
                            </div> -->

                            

                            <!-- <a class="right waves-effect waves-light green btn-small" style="margin-bottom:5px !important;">Search</a> -->
                            
                        </form>
                    </div>
                    
                    <div id="result" class="col s12">
                        <div id="resultbox">
                            
                                                       
                        </div>
                        


                       

                        <!-- Modal Structure -->
                        <div id="modal1" class="modal">
                        <div class="modal-content">
                            <h4>Modal Header</h4>
                            <p>A bunch of text</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                        </div>

                        <!-- <a href="#nextbtn" class="right waves-effect waves-light green btn-small "  style="margin-bottom:5px !important;">Next</a> -->
                    </div>

                    <div id="requests" class="col s12">
                        <div id="reqcontent">
                        
                        </div>                 
                    </div>

                     <!-- Detail btn Modal Structure -->
                     <div id="detail_modal" class="modal">
                            <div id="modaldata">

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
    <script>
        var urole='<?php echo $_SESSION['user_role'];?>'
        var uid='<?php echo $_SESSION['user_id'];?>'
    </script>
<script src="js/main.js"></script>
</body>

</html>