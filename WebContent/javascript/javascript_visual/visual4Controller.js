var app = angular.module("hitham", []);

app.controller("visual4Controller",function($scope, $http) {
	
	
	 if(localStorage.getItem("teacherName") == undefined){
		 window.location.href = "index.html";
		}
	 
	  var arrdata=[];
	  var arrdata2=[];
	  var arrdata3=[];
	  var arrdata4=[];
	  var student_id,playlist_id,song_id;
	  var period="100";
	  var uid = localStorage.getItem('teacher_pk');
	  
	
	 
	 
	  $scope.drawChart4 =  function() {
		  

	        var data = google.visualization.arrayToDataTable(arrdata4);
	       
	        var options = {
	        title: 'Most Popular Songs in the selected Taal',
	                legend: 'none',
	                pieHole: 0.4,
	                pieSliceText: 'label',
	                slices: { 0: {offset: 0.2},
	                },
	        };

	        var chart = new google.visualization.PieChart(document.getElementById('piechart4'));
	        arrdata4.length=0;
	        
			chart.draw(data, options);
			
	      }
	  
	  $scope.drawChart3 = function() {

	        var data = google.visualization.arrayToDataTable(arrdata3);
	       
	        var options = {
	        title: 'Most Popular Songs in the selected Raaga',
	                legend: 'none',
	                pieHole: 0.4,
	                pieSliceText: 'label',
	                slices: { 0: {offset: 0.2},
	                },
	        };

	        var chart = new google.visualization.PieChart(document.getElementById('piechart3'));
	        arrdata3.length=0;

	        chart.draw(data, options);
	      }
	  
	   $scope.drawChart1 = function() {

	        var data = google.visualization.arrayToDataTable(arrdata2);
	       // data.addColumn('string', 'x');
	        //data.addColumn('number', 'values');

	        var options = {
	        title: 'Most Popular Raagas',
	                legend: 'none',
	                pieHole: 0.4,
	                pieSliceText: 'label',
	                slices: { 0: {offset: 0.2},
	                },
	        };

	      
	        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	        arrdata2.length=0;

	        chart.draw(data, options);
	      }
	   
	    $scope.drawChart = function() { 
		   
		   var data = google.visualization.arrayToDataTable(arrdata);
		      
		        var options = {
		          title: 'Most Popular Taals',
		          legend: 'none',
		          pieHole: 0.4,
		          pieSliceText: 'label',
		          slices: { 0: {offset: 0.2},
		          },
		        };

		        var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
		        arrdata.length=0;

		        chart.draw(data, options);
		 }
	    
	    $(document).ready(function(){
	    	$scope.myfunction2();
	    	$scope.myfunction1();
	    	});
	    
	     $scope.myfunction2 = function(){
	    	
	        
	    	  var h=['Raaga', 'Times'];
	    	  arrdata2.push(h);
	    	    var uri="webapi/visualize/fetchAllRagas/"+uid;
	    	    console.log(uri);
	    	    
	    	    $http({
	    	    	
	    	    	method : "POST",
	    	    	headers : {
						'Content-Type' : 'application/json',
						},
	    	       url: uri,
	    	    }).success(function(res) {
	    	    	
	    	      	   var strlinks='<div class="dropdown"> <button id="selected_raaga" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Raaga<span class="caret"></span></button><ul class="dropdown-menu">';
	    	      
	    	    for(var i=0;i<res.length;i++){
	    	    	
	    	    	
	    	    var h=[res[i].song_raaga,res[i].count];
	    	    arrdata2.push(h);
	    	    strlinks+='<li><a  id="'+res[i].song_raaga+'" onclick="angular.element(this).scope().myfunction3(this.id)">'+res[i].song_raaga+'</a></li>';
	    	    
	    	    }
	    	    
	    	    strlinks+=' </ul></div>';
	    	    
	    	    document.getElementById("raaga_selector").innerHTML=strlinks;
	    	    
	    	    google.charts.load("current", {packages:['corechart']});
	    	    google.charts.setOnLoadCallback($scope.drawChart1);
	    	    
	    	    }).error(function(res) {
					//alert("error");
				});
	    	    
	    	      
	    	}
	     
	    
	     
	      $scope.myfunction1 = function(){
	    	  
	         
	    	  var h=['Taals', 'Times'];
	    	  arrdata.push(h);
	    	  var uri="webapi/visualize/fetchAllTaals/"+uid;
	    	 
	    	    $http({
	    	    	
	    	    	method : "POST",
	    	    	headers : {
						'Content-Type' : 'application/json',
						},
	    	       url: uri,
	    	    }).success(function(res) {
	    	    	
	    	    var strlinks='<div class="dropdown"> <button id="selected_taal" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Taal<span class="caret"></span></button><ul class="dropdown-menu" >';
	    	    for(var i=0;i<res.length;i++){
	    	    	
	    	    var h=[res[i].song_taal,res[i].count];
	    	    arrdata.push(h);
	    	    strlinks+='<li><a id="'+res[i].song_taal+'"  onclick="angular.element(this).scope().myfunction4(this.id)">'+res[i].song_taal+'</a></li>';
	    	   
	    	    }
	    	    strlinks+=' </ul></div>';
	    	    document.getElementById("taal_selector").innerHTML=strlinks;
	    	    google.charts.load("current", {packages:['corechart']});
	    	    google.charts.setOnLoadCallback($scope.drawChart);
	    	    
	    	    }).error(function(res) {
					//alert("error");
				});
	    	    
	    	      
	    	   }
	      
	       $scope.myfunction3 = function(raaga){
	    	   
	    		 var h=['Song', 'Count'];
	    		 arrdata3.push(h);
	    		document.getElementById("selected_raaga").innerHTML=raaga;
	    		
	    		var uri="webapi/visualize/fetchAllSongs/"+raaga+"/"+uid;
	    		console.log(uri);
	    		
	    		 $http({
		    	    	
		    	    	method : "POST",
		    	    	headers : {
							'Content-Type' : 'application/json',
							},
						url: uri,
	    		 	}).success(function(res) {
	    		   
		    	   for(var i=0;i<res.length;i++){
		    	   var h=[res[i].song_name,res[i].count];
		    	   arrdata3.push(h);
		    	   
		    	   }
	    	   
	    	   google.charts.load("current", {packages:['corechart']});
	    	   google.charts.setOnLoadCallback($scope.drawChart3);
	    	   
	    		 }).error(function(res) {
						//alert("error");
					});
	    	      
	    	 }
	       
	        $scope.myfunction4 = function(taal){
	    	    
	    	   var h=['Song', 'Count'];
	    	   arrdata4.push(h);
	    	   document.getElementById("selected_taal").innerHTML=taal;
	    	   var uri="webapi/visualize/fetchAllTaalSongs/"+taal+"/"+uid;
	    	   

	    	   $http({
	    	    	
	    	    	method : "POST",
	    	    	headers : {
						'Content-Type' : 'application/json',
						},
						url: uri,
	    	   	}).success(function(res) {
	    		   
	    	      for(var i=0;i<res.length;i++){
	    	   	   
	    	      var h=[res[i].song_name,res[i].count];
	    	      arrdata4.push(h);
	    	      
	    	      }
	    	      
	    	      google.charts.load("current", {packages:['corechart']});
	    	      google.charts.setOnLoadCallback($scope.drawChart4);
	    	      
	    	   }).error(function(res) {
					//alert("error");
				});
	    	         
	    	   } 
	 
	
});