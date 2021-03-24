var theMarker = {};
var myLayers=[];
var divi;
var dist;
var teh;
var city;


    // ...........sidebar Tabs..........
    var instance = M.Tabs.init(document.getElementsByClassName("tabs")[0], '');
        
    // var tabs = document.querySelectorAll('.tabs')
    // for (var i = 0; i < tabs.length; i++){
    //     M.Tabs.init(tabs[i]);
    // }


// ...........map section..........
var map = L.map('map',{
    center: [30.7659, 72.4376],
    zoom: 7
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



    // ..........leaflet fullscreen..........
    map.addControl(new L.Control.Fullscreen(  
        {position:"topright"}
    ));

    // ..........leaflet draw..........
    drawnItems = L.featureGroup().addTo(map);
    
    map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true
            },
            polyline:false,
            marker: false,
            squire: true,
            circlemarker: false,
            rectangle: false,
            circle: false,
        }
    }));

    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
        console.log(layer.getLatLngs())
         // console.log(layer.toGeoJSON())
    });

   


// ...........TOC btns work..........
function addRemoveLayer(perm){

    if(perm=='divi'){
            var ckb = $("#divi").is(':checked');
            if(ckb==true){
                map.addLayer(divi)
            }else{
               
                 map.removeLayer(divi)
            }
        }

    if(perm=='dist'){
        var ckb = $("#dist").is(':checked');
        if(ckb==true){
           
            map.addLayer(dist)
        }else{
             map.removeLayer(dist)
        }
    }
    if(perm=='teh'){
        var ckb = $("#teh").is(':checked');
       if(ckb==true){
        map.addLayer(teh)
           
        }else{
             map.removeLayer(teh)
        }
    }

     if(perm=='city'){
        var ckb = $("#city").is(':checked');
        if(ckb==true){
           
            map.addLayer(city)
        }else{
             map.removeLayer(city)
        }
    }

     

}



$(document).ready(function(){

    if(urole == 'admin'){
        $("#admindata").show();
        $("#normaluser").hide();
     }
    else
    {
        $("#admindata").hide();
        $("#normaluser").show();
    }
    $('#reqbtn').click(function(){
        if($("#reqin").val() == ''){
            alertify.error("Please first fill why you want to Request");
        }
    });
    
     
    // $('.tabs').tabs();
    // ...........navigation select..........
    $('select').formSelect();

    $('.modal').modal();


    $("#drawpoly").click(function(){
        $('.leaflet-popup-pane .leaflet-draw-tooltip').show();
        drawnItems.clearLayers();
        $('.leaflet-draw-draw-polygon')[0].click()
        });


    // ...........TOC Lyrs adding to map..........
    var url='http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_space_tech_raster_dashboard_db73_v_12032021/MapServer';

        divi=L.esri.dynamicMapLayer({
                url: url,
                opacity: 0.7,
                layers: [0]
                });
        divi.addTo(map);
        dist=L.esri.dynamicMapLayer({
            url: url,
            opacity: 0.7,
            layers: [1]
            });
        dist.addTo(map);
        teh=L.esri.dynamicMapLayer({
                url: url,
                opacity: 0.7,
                layers: [2]
                });
        teh.addTo(map);
        city=L.esri.dynamicMapLayer({
            url: url,
            opacity: 0.7,
            layers: [3]
            });
        city.addTo(map);



// ........... Shape file upload..........
    $("#shp").on("change", function (e) {
        var file = $(this)[0].files[0];
        addShapefile(file);
        this.value = null;
    });


// ........... Navigation load_divisions data..........
    $.ajax({
        url: "services/load_division.php",
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            // console.log(resp);
            for(var i=0;i<resp.length;i++){
                // str +='<option value=" '+resp[i].division_name+' ">'+resp[i].division_name+'</option>'; 
                $("#division").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].division_name+'</option>'));
            }
        }
    });
    
});


// ........... Navigation..........
$('#division').on('change', function() {
    var dvid= this.value; 
    
    $.ajax({
        url: "services/load_district.php?dvid="+dvid,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#district").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].district_name+'</option>'));
            }
        }
    });
});
$('#district').on('change', function() {
    var did= this.value; 
    
    $.ajax({
        url: "services/load_tehsil.php?did="+did,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#tehsil").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].tehsil_name+'</option>'));
            }
        }
    });
});
$('#tehsil').on('change', function() {
    var tid= this.value; 
    
    $.ajax({
        url: "services/load_city.php?tid="+tid,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#city").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].mc_name+'</option>'));
            }
        }
    });
});

// ........... Navigation lyr & zoom to that lyr..........
function query_by_nid_new(layer_id,search_perm){

    if (layer_id== 0) {
        var name = "gid ='" + parseInt(search_perm) + "'";
    }else if(layer_id== 1){
        var name = "gid ='" + search_perm + "'";
    }
    else if(layer_id== 2){
        var name = "gid ='" + search_perm + "'";
    }
    else if(layer_id== 3){
        var name = "gid ='" + search_perm + "'";
    }

    L.esri.query({
        url: "http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_space_tech_raster_dashboard_db73_v_12032021/MapServer/"+layer_id

    }).where(name).run(function(error, result){
        // draw result on the map
        if(typeof glayer != 'undefined'){
            glayer.clearLayers();
        };

        glayer = L.geoJson(result).addTo(map);



        // fit map to boundry
        map.fitBounds(glayer.getBounds());

    });

};


function addShapefile(file){

    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
        var data = reader.result;
        myLayers[file.name] = new L.Shapefile(data);
        var mp_array=[];
        setTimeout(function(){
            var pToMultiP=myLayers[file.name].toGeoJSON();
            for(var i=0;i<pToMultiP.features.length;i++){
                if(pToMultiP.features[i].geometry.coordinates.length==3) {
                    pToMultiP.features[i].geometry.coordinates.pop();
                }
                mp_array.push(pToMultiP.features[i].geometry.coordinates)

            }

            var mp_geoJson={
                "TYPE": "MultiPoint",
                "coordinates": mp_array
            }
            var mp_str=JSON.stringify(mp_geoJson);
            // $("#kmlf").val(mp_str);
          
            console.log(mp_str)
        },3000)
       
        

        map.addLayer(myLayers[file.name]);

        setTimeout(function(){
            map.fitBounds(myLayers[file.name].getBounds());
       
        },300)
    }
}