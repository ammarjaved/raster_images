var theMarker = {};
var myLayers=[];
var divi;
var dist;
var teh;
var city;
var layer;
var pgeom
var grid;



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
            layer = event.layer;
        drawnItems.addLayer(layer);

        pgeom = '';
        pgeom = JSON.stringify(layer.toGeoJSON().geometry);
       
    });

    map.on('draw:editvertex', function (e) { 
        var poly = e.poly;
        pgeom = '';
        pgeom = JSON.stringify(poly.toGeoJSON().geometry);
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
    if(perm=='grid'){
        var ckb = $("#grid").is(':checked');
        if(ckb==true){
           
            map.addLayer(grid)
        }else{
             map.removeLayer(grid)
        }
    }

     

}



$(document).ready(function(){

    // $('#detail_modal').modal();
    // $('#detail_modal').modal('open'); 
  
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

        grid=L.esri.dynamicMapLayer({
            url: url,
            opacity: 0.7,
            layers: [4]
        });
        grid.addTo(map);



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
                $("#division").formSelect().append($('<option value="'+resp[i].division+'">'+resp[i].division+'</option>'));
            }
        }
    });

   

    
});
    var pageNum = 0;

    function nextPage() {

        var maxnoPerPage = 4;
        var firstpage = maxnoPerPage * pageNum;
        var currentpage = firstpage;
        var $articles = $($(articles), "article");
        var i = 0;
        while(currentpage < $articles.length && i < 4) {
            $("#flightlisting").append($articles.eq(currentpage));
            i++;
            currentpage++;
        }
        pageNum++;
        if(currentpage == $articles.length)
            $("#next").prop("disabled", true);
    }

    $("button").click(function(){nextPage();});

 // polygon submit btn

    var str='';
    $('#psubmit_btn').on('click', function() {
        
        console.log(pgeom)
        $.ajax({
            url: "services/load_result.php?geom=" +pgeom,
            type: "POST",
            dataType: "json",
            async: false,
            success: function callback(response) {
                console.log(response);
                for(var i=0;i<response.length;i++){
                    str=str+'<div style="padding-left: 0px;" class="card col s12">'+
                        '<img src="images/test1.jpg" alt="test1" style="float:left;width:45%">'+
                        '<div class="container" style="float:right;width:45%">'+
                        '<b>Name: </b><a href="#">'+response[i].name+'</a>'+
                        '<p><b>Year:  </b>'+response[i].year+'</p>'+
                        '<a href="#detail_modal" id="'+response[i].gid+'" class="detailbtn right waves-effect waves-light green btn-small modal-trigger"  style="margin-bottom:5px !important;">Details</a>'+
                        '</div>'+
                        '</div>'
                }
                $('#resultbox').html(str);  
            }
        });
        instance.select('#resulttab');
    });

    $(document).on('click','#reqtab',function(){
        var reqstr='';
        $.ajax({
            url: "services/load_req.php",
            type: "POST",
            dataType: "json",
            data: { 'urole': urole, 'uid': uid },
            success: function callback(response) {
                console.log(response);
                for(var i=0;i<response.length;i++){
                        reqstr=reqstr+'<div style="padding-left: 0px;" class="card col s12">'+
                        '<img src="images/test1.jpg" alt="test1" style="float:left;width:45%">'+
                        '<div class="container" style="float:right;width:45%">'+
                        '<b>Name: </b><a href="#">'+response[i].name+'</a>'+
                        '<p><b>Year:  </b>'+response[i].year+'</p>'+
                        '</div>'+
                        '<div class="col s12">';

                        if(urole == 'admin'){
                            
                            reqstr +='<a id="'+response[0].gid+'" class="approvbtn collection-item"><span style="color:white" class="badge green">Approve</span></a>'+
                            '<a href="#detail_modal" id="'+response[0].gid+'" class="detailbtn modal-trigger"><span style="color:white" class="badge green">Detail</span></a>'+
                            '<a id="'+response[0].gid+'" class="rejectbtn collection-item"><span style="color:white" class="badge red">Reject</span></a>';

                         }
                        else
                        {
                            if(response[i].req_status == 'rejected'){
                                reqstr +='<p><b class="right">Status: <span class="right badge red">Rejected</span></b></p>';
    
                            }
                            else  if(response[i].req_status == 'approve'){
    
                                reqstr +='<a id="'+response[0].gid+'" class="downloadbtn right waves-effect waves-light green btn-small" style="margin-bottom:5px !important; ">Download</a>';
                            }
                            else{
                                reqstr +='<p><b class="right">Status: <span class="right badge">Requested</span></b></p>';
                            }
                        }
                        
                        reqstr += '</div>'+
                                '</div>';
                        
                        
                }
                    $('#reqcontent').html(reqstr); 
            }
        });
        
    });
    
    $(document).on('click','.detailbtn',function(){
        var str1='';
        var gid=$(this).attr('id');
        $.ajax({
            url: "services/load_modal.php?gid=" +gid,
            type: "POST",
            dataType: "json",
            async: false,
            success: function callback(response) {
                console.log(response);
                    str1=str1+'<div class="modal-content">'+
                        '<div style="padding-left: 0px;" class="card col s12">'+
                        '<img src="images/test1.jpg" alt="test1" style="float:left;width:45%">'+
                        '<div class="container" style="float:right;width:45%">'+
                        '<b>Name: </b><a href="#">'+response[0].name+'</a>'+
                        '<p><b>Province: </b>'+response[0].province+'</p>'+
                        '<p><b>Dvision: </b>'+response[0].division+'</p>'+
                        '<p><b>District: </b>'+response[0].district+'</p>'+
                        '<p><b>Tehsil: </b>'+response[0].tehsil+'</p>'+
                        '<p><b>Resolution: </b>'+response[0].resolution+'</p>'+
                        '<p><b>Satellite: </b>'+response[0].satellite+'</p>'+
                        '<p><b>Year: </b>'+response[0].year+'</p>'+
                        // '<div class="input-field col s12">'+
                        // '<input id="" type="text" class="validate" required >'+
                        // '<label for="reqin">Description for Sending Request</label>'+
                        // '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="modal-footer">';
                        if(urole !== 'admin'){
                            str1 +='<a id="'+response[0].gid+'" class="reqbtn right waves-effect waves-light green btn-small" style="margin-bottom:5px !important; margin-right:5px">Request</a>';
                        }
                        str1 +='<a href="#!" class="right modal-close waves-effect waves-green red btn-small" style="margin-bottom:5px !important; margin-right:5px">Cancel</a>'+
                        '</div>';
                        
                         $('#modaldata').html(str1); 
            }
        });
        
    });

    $(document).on('click','.reqbtn',function(){
        var gid=$(this).attr('id');
        $.ajax({
            url: "services/requests.php",
            type: "POST",
            data: { 'gid': gid, 'uid': uid },
            async: false,
            success: function callback(response) {
                alert(response)
                console.log(response);
                
            }
        });
        
    });
    
    
  

    $(document).on('click','.approvbtn',function(){
        var gid=$(this).attr('id');
        $.ajax({
            url: "services/approve.php?gid="+gid,
            type: "POST",
            dataType: "json",
            async: false,
            success: function callback(response) {
                alert(response)
                console.log(response);
                
            }
        });
    });
    $(document).on('click','.rejectbtn',function(){
        var gid=$(this).attr('id');
        $.ajax({
            url: "services/rejected.php?gid="+gid,
            type: "POST",
            dataType: "json",
            async: false,
            success: function callback(response) {
                alert(response)
                console.log(response);
                
            }
        });
    });
    $(document).on('click','.downloadbtn',function(){
        var gid=$(this).attr('id');
        $.ajax({
            url: "services/requests.php",
            type: "POST",
            data: { 'gid': gid, 'uid': uid },
            success: function callback(response) {
                console.log(response);
                
            }
        });
    });


    // setTimeout(function(){ $(document).click("#resulttab"); }, 3000);
    

    
// ........... Navigation..........
$('#division').on('change', function() {
    var dvname= this.value; 
    
    $.ajax({
        url: "services/load_district.php?dvn="+dvname,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#district").formSelect().append($('<option value="'+resp[i].district_n+'">'+resp[i].district_n+'</option>'));
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
                $("#tehsil").formSelect().append($('<option value="'+resp[i].tehsil_n+'">'+resp[i].tehsil_n+'</option>'));
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
                $("#city").formSelect().append($('<option value="'+resp[i].mc_name+'">'+resp[i].mc_name+'</option>'));
            }
        }
    });
});

// ........... Navigation lyr & zoom to that lyr..........
function query_by_nid_new(layer_id,search_perm){

    if (layer_id== 0) {
        var name = "division ='"+search_perm+"'";
    }else if(layer_id== 1){
        var name = "district_n ='"+search_perm+"'";
    }
    else if(layer_id== 2){
        var name = "tehsil_n ='"+search_perm+"'";
    }
    else if(layer_id== 3){
        var name = "mc_name ='"+search_perm+"'";
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