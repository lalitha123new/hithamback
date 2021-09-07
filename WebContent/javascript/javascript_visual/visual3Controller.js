var app = angular.module("hitham", []);

app.controller("visual3Controller",function($scope, $http) {
	
	 if(localStorage.getItem("teacherName") == undefined){
		 window.location.href = "index.html";
		}
	 
	 	var arrdata=[];
	 	var arrdata1=[];
	 	var arrdata2=[];
	 	var student_id,playlist_id,song_id;
	 	var period="100";
	  
	   $scope.drawChart = function() { 
	    
	    
	      var chardata = google.visualization.arrayToDataTable(arrdata);
	      var view = new google.visualization.DataView(chardata);
	      view.setColumns([0, 1,
	                       { calc: "stringify",
	                         type: "string",
	                         role: "annotation" },
	                       2]);

	      var options = {
	        title: "Time line of the song",
	        width: 1000,
	        height: 400,
	        bar: {groupWidth: "100%"},
	        legend: { position: "none" },
	      };
	      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
	      chart.draw(view, options);
	      arrdata.length=0;
	      
	  }
	  
	  
	   $scope.drawChart5 = function() { 
	    
	     	var chardata = google.visualization.arrayToDataTable(arrdata1);
	      	
	     	var view = new google.visualization.DataView(chardata);
	     	view.setColumns([0, 1,
	                       { calc: "stringify",
	                         type: "string",
	                         role: "annotation" },
	                       2]);

	      var options = {
	        title: "Listening pattern of the student ",
	        width: 1000,
	        height: 400,
	        bar: {groupWidth: "100%"},
	        legend: { position: "none" },
	      };
	      
	      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values5"));
	      chart.draw(view, options);
	      arrdata1.length=0;
	      
	  }
	   
	    $scope.drawChart6 = function() {
	    	var data = google.visualization.arrayToDataTable(arrdata2);
	     	
	      	var options = {
	        title: 'Most Liked Song'
	      };

	    }
	    
	    
	    
	    $(document).ready(function(){
	    	
	    	  var tid = localStorage.getItem('teacher_pk'); 
	    	  var uri="webapi/teacher/fetchAssignedStudents/"+tid;
	    	  
	    	  $http({
	    		  method : "POST",
	    	      headers : {
						'Content-Type' : 'application/json',
				  },
		    	  url: uri,
	    	  }).success(function(res) {
	    		  
		    	  var n=res.length;
	    	   
	    	  	// var strlinks = '<div class="dropdown"> <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Select Student </button><div class="dropdown-menu">';
	    	 	/*  var strlinks='<div class="dropdown"> <button id="selected_student" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Student<span class="caret"></span></button><ul class="dropdown-menu">'; */
	    	  
	    	 var strlinks='<div class="dropdown"> <button id="selected_student" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Student<span class="caret"></span></button><ul style="list-style:none;">';
	    	  
	    	 for(var i=0;i<n;i++){
	    		 
	    	   	var name=res[i].student_name;
	    	   	var id=res[i].student_pk;
	    	  	// strlinks+='<a id="'+id+'" class="dropdown-item" onclick="myfunction1(this.id)">'+name+'</a>';
	    	  	strlinks+='<li><a id="'+id+'" onclick="angular.element(this).scope().myfunction1(this.id)">'+name+'</a></li>';
	    	  
	    	  }
	    	    strlinks+=' </ul></div>';
	    	    
	    	    document.getElementById("student_selector").innerHTML=strlinks;
	    	  }).error(function(res) {
					//alert("error");
				});
	    	 
	    	}); 
	    
	     $scope.myfunction1 = function(sid){
	    	 $("#columnchart_values").hide();
	    	 $("#columnchart_values5").hide();
	    	 $("#song_selector").hide();
	  	  
	    	var name=document.getElementById(sid).innerHTML;
	    	document.getElementById("selected_student").innerHTML=name;
	      	var uri="webapi/playlist/assignedForStudent/"+sid;
	      	student_id=sid;
	      	
	      	$http({
	    		  method : "POST",
	    	      headers : {
						'Content-Type' : 'application/json',
				  },
		    	  url: uri,
	    	  }).success(function(res) {
	    		  var n=res.length;
	         
	        // var strlinks = '<div class="dropdown"> <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Select Playlist </button><div class="dropdown-menu">';
	        /* var strlinks='<div class="dropdown"> <button id="selected_playlist" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Playlist<span class="caret"></span></button><ul class="dropdown-menu">';  */ 
	        var strlinks='<div class="dropdown"> <button id="selected_playlist" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Select Playlist<span class="caret"></span></button><ul style="list-style:none;">'; 
	        
	        for(var i=0;i<n;i++){
	        	
	         var name=res[i].playlist_name;
	         var id=res[i].playlist_id;
	         strlinks+='<li><a id="'+id+'" onclick="angular.element(this).scope().myfunction2(this.id)">'+name+'</a></li>';
	         
	        }
	          strlinks+='</ul></div>';
	          document.getElementById("playlist_selector").innerHTML=strlinks;
	    	}).error(function(res) {
					//alert("error");
			});
	      
	      }
	     
	      $scope.myfunction3 = function(time){
	    	 
			  $("#columnchart_values").hide();
			  var name=document.getElementById(time).innerHTML;
			  document.getElementById("selected_period").innerHTML=name;
			  period=time;
			  $scope.myfunction2(playlist_id);
			  
	      	}
	      
	      
	      
	       $scope.myfunction2 = function(pid){
	    	  
	    	$("#song_selector").show();
	  		$("#columnchart_values").hide();
	  		$("#columnchart_values5").hide();
	  		
	  		playlist_id=pid;
	  		var name=document.getElementById(pid).innerHTML;
	  		document.getElementById("selected_playlist").innerHTML=name;
	  		var count,totaltime;
	  		var uri="webapi/playlist/fetchAssignedRecordings/"+pid;
	  		playlist_id=pid;
	  		
	  		
	  		$http({
	    		  method : "POST",
	    	      headers : {
						'Content-Type' : 'application/json',
				  },
	  			   url: uri,
	  		}).success(function(res) {
	  			  var n=res.length;
	  			   
			    // var strlinks = '<div class="dropdown"> <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Select Recording </button><div class="dropdown-menu">';
			    var strlinks='<thead><tr><th>SongName</th><th>Times Played</th><th>Total Time(secs)</th></tr></thead><tbody>'; 
			    
			    for(var i=0;i<n;i++){
			  	  
			    	var name=res[i].recording_name;
			    	var id=res[i].recording_id;
			        uri="webapi/visualize/SongTimelineChart/"+id+"/"+student_id+"/"+period;
	  		
			  		$.ajax({ 
			  			
			  			   type: "POST",
			  			   dataType: "json",
			  			   url: uri,
			  			   async : false,
			  			   success: function(data){
			  				   count=data[0].Count;
			  				   total=data[0].totaltime;
			  			   	},
			  			   	error: function(e) {
			  			   			console.log(e.message);
			  			   	}
			  });
	     
	     	strlinks+='<tr><td><a id="'+id+'" class="dropdown-item" onclick="angular.element(this).scope().myfunction(this.id)">'+name+'</a></td><td>'+count+'</td><td>'+total+'</td></tr>'; 
	  	
			    }
	      strlinks+='</tbody></table>';
	      document.getElementById("song_selector").innerHTML=strlinks;
	      
	  		}).error(function(res) {
				//alert("error");
			});
	  		
	       }
	       
	       
	       
	        $scope.myfunction = function(rid){
	        $("#columnchart_values").show();
		  	$("#columnchart_values5").show();
	   	  	song_id=rid;
	   	    var Header= ['Second', 'Frequency', { role: 'style' }];
	   	    arrdata.push(Header);
	        var uri="webapi/visualize/SongTimelineChart/"+rid+"/"+student_id+"/"+period;
	   	   
	   	 $http({
	   		  method : "POST",
	   	      headers : {
						'Content-Type' : 'application/json',
				  },
		          url: uri,
		   	 }).success(function(res) {
	       	   
	       var h=['1',res[0].x1, 'Cu'];
	       arrdata.push(h);
	       var h=['2',res[0].x2, 'Cu'];
	       arrdata.push(h);
	       var h=['3',res[0].x3, 'Cu'];
	       arrdata.push(h);
	       var h=['4',res[0].x4, 'Cu'];
	       arrdata.push(h);
	       var h=['5',res[0].x5, 'Cu'];
	       arrdata.push(h);
	       var h=['6',res[0].x6, 'Cu'];
	       arrdata.push(h);
	       var h=['7',res[0].x7, 'Cu'];
	       arrdata.push(h);
	       var h=['8',res[0].x8, 'Cu'];
	       arrdata.push(h);
	       var h=['9',res[0].x9, 'Cu'];
	       arrdata.push(h);
	       var h=['10',res[0].x10, 'Cu'];
	       arrdata.push(h);
	       var h=['11',res[0].x11, 'Cu'];
	       arrdata.push(h);
	       var h=['12',res[0].x12, 'Cu'];
	       arrdata.push(h);
	       var h=['13',res[0].x13, 'Cu'];
	       arrdata.push(h);
	       var h=['14',res[0].x14, 'Cu'];
	       arrdata.push(h);
	       var h=['15',res[0].x15, 'Cu'];
	       arrdata.push(h);
	       var h=['16',res[0].x16, 'Cu'];
	       arrdata.push(h);
	       var h=['17',res[0].x17, 'Cu'];
	       arrdata.push(h);
	       var h=['18',res[0].x18, 'Cu'];
	       arrdata.push(h);
	       var h=['19',res[0].x19, 'Cu'];
	       arrdata.push(h);
	       var h=['20',res[0].x20, 'Cu'];
	       arrdata.push(h);
	       var h=['21',res[0].x21, 'Cu'];
	       arrdata.push(h);
	       var h=['22',res[0].x22, 'Cu'];
	       arrdata.push(h);
	       var h=['23',res[0].x23, 'Cu'];
	       arrdata.push(h);
	       var h=['24',res[0].x24, 'Cu'];
	       arrdata.push(h);
	       var h=['25',res[0].x25, 'Cu'];
	       arrdata.push(h);
	       var h=['26',res[0].x26, 'Cu'];
	       arrdata.push(h);
	       var h=['27',res[0].x27, 'Cu'];
	       arrdata.push(h);
	       var h=['28',res[0].x28, 'Cu'];
	       arrdata.push(h);
	       var h=['29',res[0].x29, 'Cu'];
	       arrdata.push(h);
	       var h=['30',res[0].x30, 'Cu'];
	       arrdata.push(h);
	       var h=['31',res[0].x31, 'Cu'];
	       arrdata.push(h);
	       var h=['32',res[0].x32, 'Cu'];
	       arrdata.push(h);
	       var h=['33',res[0].x33, 'Cu'];
	       arrdata.push(h);
	       var h=['34',res[0].x34, 'Cu'];
	       arrdata.push(h);
	       var h=['35',res[0].x35, 'Cu'];
	       arrdata.push(h);
	       var h=['36',res[0].x36, 'Cu'];
	       arrdata.push(h);
	       var h=['37',res[0].x37, 'Cu'];
	       arrdata.push(h);
	       var h=['38',res[0].x38, 'Cu'];
	       arrdata.push(h);
	       var h=['39',res[0].x39, 'Cu'];
	       arrdata.push(h);
	       var h=['40',res[0].x40, 'Cu'];
	       arrdata.push(h);
	       var h=['41',res[0].x41, 'Cu'];
	       arrdata.push(h);
	       var h=['42',res[0].x42, 'Cu'];
	       arrdata.push(h);
	       var h=['43',res[0].x43, 'Cu'];
	       arrdata.push(h);
	       var h=['44',res[0].x44, 'Cu'];
	       arrdata.push(h);
	       var h=['45',res[0].x45, 'Cu'];
	       arrdata.push(h);
	       var h=['46',res[0].x46, 'Cu'];
	       arrdata.push(h);
	       var h=['47',res[0].x47, 'Cu'];
	       arrdata.push(h);
	       var h=['48',res[0].x48, 'Cu'];
	       arrdata.push(h);
	       var h=['49',res[0].x49, 'Cu'];
	       arrdata.push(h);
	       var h=['50',res[0].x50, 'Cu'];
	       arrdata.push(h);
	       var h=['51',res[0].x51, 'Cu'];
	       arrdata.push(h);
	       var h=['52',res[0].x52, 'Cu'];
	       arrdata.push(h);
	       var h=['53',res[0].x53, 'Cu'];
	       arrdata.push(h);
	       var h=['54',res[0].x54, 'Cu'];
	       arrdata.push(h);
	       var h=['55',res[0].x55, 'Cu'];
	       arrdata.push(h);
	       var h=['56',res[0].x56, 'Cu'];
	       arrdata.push(h);
	       var h=['57',res[0].x57, 'Cu'];
	       arrdata.push(h);
	       var h=['58',res[0].x58, 'Cu'];
	       arrdata.push(h);
	       var h=['59',res[0].x59, 'Cu'];
	       arrdata.push(h);
	       var h=['60',res[0].x60, 'Cu'];
	       arrdata.push(h);
	       var h=['61',res[0].x61, 'Cu'];
	       arrdata.push(h);
	       var h=['62',res[0].x62, 'Cu'];
	       arrdata.push(h);
	       var h=['63',res[0].x63, 'Cu'];
	       arrdata.push(h);
	       var h=['64',res[0].x64, 'Cu'];
	       arrdata.push(h);
	       var h=['65',res[0].x65, 'Cu'];
	       arrdata.push(h);
	       var h=['66',res[0].x66, 'Cu'];
	       arrdata.push(h);
	       var h=['67',res[0].x67, 'Cu'];
	       arrdata.push(h);
	       var h=['68',res[0].x68, 'Cu'];
	       arrdata.push(h);
	       var h=['69',res[0].x69, 'Cu'];
	       arrdata.push(h);
	       var h=['70',res[0].x70, 'Cu'];
	       arrdata.push(h);
	       var h=['71',res[0].x71, 'Cu'];
	       arrdata.push(h);
	       var h=['72',res[0].x72, 'Cu'];
	       arrdata.push(h);
	       var h=['73',res[0].x73, 'Cu'];
	       arrdata.push(h);
	       var h=['74',res[0].x74, 'Cu'];
	       arrdata.push(h);
	       var h=['75',res[0].x75, 'Cu'];
	       arrdata.push(h);
	       var h=['76',res[0].x76, 'Cu'];
	       arrdata.push(h);
	       var h=['77',res[0].x77, 'Cu'];
	       arrdata.push(h);
	       var h=['78',res[0].x78, 'Cu'];
	       arrdata.push(h);
	       var h=['79',res[0].x79, 'Cu'];
	       arrdata.push(h);
	       var h=['80',res[0].x80, 'Cu'];
	       arrdata.push(h);
	       var h=['81',res[0].x81, 'Cu'];
	       arrdata.push(h);
	       var h=['82',res[0].x82, 'Cu'];
	       arrdata.push(h);
	       var h=['83',res[0].x83, 'Cu'];
	       arrdata.push(h);
	       var h=['84',res[0].x84, 'Cu'];
	       arrdata.push(h);
	       var h=['85',res[0].x85, 'Cu'];
	       arrdata.push(h);
	       var h=['86',res[0].x86, 'Cu'];
	       arrdata.push(h);
	       var h=['87',res[0].x87, 'Cu'];
	       arrdata.push(h);
	       var h=['88',res[0].x88, 'Cu'];
	       arrdata.push(h);
	       var h=['89',res[0].x89, 'Cu'];
	       arrdata.push(h);
	       var h=['90',res[0].x90, 'Cu'];
	       arrdata.push(h);
	       var h=['91',res[0].x91, 'Cu'];
	       arrdata.push(h);
	       var h=['92',res[0].x92, 'Cu'];
	       arrdata.push(h);
	       var h=['93',res[0].x93, 'Cu'];
	       arrdata.push(h);
	       var h=['94',res[0].x94, 'Cu'];
	       arrdata.push(h);
	       var h=['95',res[0].x95, 'Cu'];
	       arrdata.push(h);
	       var h=['96',res[0].x96, 'Cu'];
	       arrdata.push(h);
	       var h=['97',res[0].x97, 'Cu'];
	       arrdata.push(h);
	       var h=['98',res[0].x98, 'Cu'];
	       arrdata.push(h);
	       var h=['99',res[0].x99, 'Cu'];
	       arrdata.push(h);
	       var h=['100',res[0].x100, 'Cu'];
	       arrdata.push(h);
	       var h=['101',res[0].x101, 'Cu'];
	       arrdata.push(h);
	       var h=['102',res[0].x102, 'Cu'];
	       arrdata.push(h);
	       var h=['103',res[0].x103, 'Cu'];
	       arrdata.push(h);
	       var h=['104',res[0].x104, 'Cu'];
	       arrdata.push(h);
	       var h=['105',res[0].x105, 'Cu'];
	       arrdata.push(h);
	       var h=['106',res[0].x106, 'Cu'];
	       arrdata.push(h);
	       var h=['107',res[0].x107, 'Cu'];
	       arrdata.push(h);
	       var h=['108',res[0].x108, 'Cu'];
	       arrdata.push(h);
	       var h=['109',res[0].x109, 'Cu'];
	       arrdata.push(h);
	       var h=['110',res[0].x110, 'Cu'];
	       arrdata.push(h);
	       var h=['111',res[0].x111, 'Cu'];
	       arrdata.push(h);
	       var h=['112',res[0].x112, 'Cu'];
	       arrdata.push(h);
	       var h=['113',res[0].x113, 'Cu'];
	       arrdata.push(h);
	       var h=['114',res[0].x114, 'Cu'];
	       arrdata.push(h);
	       var h=['115',res[0].x115, 'Cu'];
	       arrdata.push(h);
	       var h=['116',res[0].x116, 'Cu'];
	       arrdata.push(h);
	       var h=['117',res[0].x117, 'Cu'];
	       arrdata.push(h);
	       var h=['118',res[0].x118, 'Cu'];
	       arrdata.push(h);
	       var h=['119',res[0].x119, 'Cu'];
	       arrdata.push(h);
	       var h=['120',res[0].x120, 'Cu'];
	       arrdata.push(h);
	       var h=['121',res[0].x121, 'Cu'];
	       arrdata.push(h);
	       var h=['122',res[0].x122, 'Cu'];
	       arrdata.push(h);
	       var h=['123',res[0].x123, 'Cu'];
	       arrdata.push(h);
	       var h=['124',res[0].x124, 'Cu'];
	       arrdata.push(h);
	       var h=['125',res[0].x125, 'Cu'];
	       arrdata.push(h);
	       var h=['126',res[0].x126, 'Cu'];
	       arrdata.push(h);
	       var h=['127',res[0].x127, 'Cu'];
	       arrdata.push(h);
	       var h=['128',res[0].x128, 'Cu'];
	       arrdata.push(h);
	       var h=['129',res[0].x129, 'Cu'];
	       arrdata.push(h);
	       var h=['130',res[0].x130, 'Cu'];
	       arrdata.push(h);
	       var h=['131',res[0].x131, 'Cu'];
	       arrdata.push(h);
	       var h=['132',res[0].x132, 'Cu'];
	       arrdata.push(h);
	       var h=['133',res[0].x133, 'Cu'];
	       arrdata.push(h);
	       var h=['134',res[0].x134, 'Cu'];
	       arrdata.push(h);
	       var h=['135',res[0].x135, 'Cu'];
	       arrdata.push(h);
	       var h=['136',res[0].x136, 'Cu'];
	       arrdata.push(h);
	       var h=['137',res[0].x137, 'Cu'];
	       arrdata.push(h);
	       var h=['138',res[0].x138, 'Cu'];
	       arrdata.push(h);
	       var h=['139',res[0].x139, 'Cu'];
	       arrdata.push(h);
	       var h=['140',res[0].x140, 'Cu'];
	       arrdata.push(h);
	       var h=['141',res[0].x141, 'Cu'];
	       arrdata.push(h);
	       var h=['142',res[0].x142, 'Cu'];
	       arrdata.push(h);
	       var h=['143',res[0].x143, 'Cu'];
	       arrdata.push(h);
	       var h=['144',res[0].x144, 'Cu'];
	       arrdata.push(h);
	       var h=['145',res[0].x145, 'Cu'];
	       arrdata.push(h);
	       var h=['146',res[0].x146, 'Cu'];
	       arrdata.push(h);
	       var h=['147',res[0].x147, 'Cu'];
	       arrdata.push(h);
	       var h=['148',res[0].x148, 'Cu'];
	       arrdata.push(h);
	       var h=['149',res[0].x149, 'Cu'];
	       arrdata.push(h);
	       var h=['150',res[0].x150, 'Cu'];
	       arrdata.push(h);
	       var h=['151',res[0].x151, 'Cu'];
	       arrdata.push(h);
	       var h=['152',res[0].x152, 'Cu'];
	       arrdata.push(h);
	       var h=['153',res[0].x153, 'Cu'];
	       arrdata.push(h);
	       var h=['154',res[0].x154, 'Cu'];
	       arrdata.push(h);
	       var h=['155',res[0].x155, 'Cu'];
	       arrdata.push(h);
	       var h=['156',res[0].x156, 'Cu'];
	       arrdata.push(h);
	       var h=['157',res[0].x157, 'Cu'];
	       arrdata.push(h);
	       var h=['158',res[0].x158, 'Cu'];
	       arrdata.push(h);
	       var h=['159',res[0].x159, 'Cu'];
	       arrdata.push(h);
	       var h=['160',res[0].x160, 'Cu'];
	       arrdata.push(h);
	       var h=['161',res[0].x161, 'Cu'];
	       arrdata.push(h);
	       var h=['162',res[0].x162, 'Cu'];
	       arrdata.push(h);
	       var h=['163',res[0].x163, 'Cu'];
	       arrdata.push(h);
	       var h=['164',res[0].x164, 'Cu'];
	       arrdata.push(h);
	       var h=['165',res[0].x165, 'Cu'];
	       arrdata.push(h);
	       var h=['166',res[0].x166, 'Cu'];
	       arrdata.push(h);
	       var h=['167',res[0].x167, 'Cu'];
	       arrdata.push(h);
	       var h=['168',res[0].x168, 'Cu'];
	       arrdata.push(h);
	       var h=['169',res[0].x169, 'Cu'];
	       arrdata.push(h);
	       var h=['170',res[0].x170, 'Cu'];
	       arrdata.push(h);
	       var h=['171',res[0].x171, 'Cu'];
	       arrdata.push(h);
	       var h=['172',res[0].x172, 'Cu'];
	       arrdata.push(h);
	       var h=['173',res[0].x173, 'Cu'];
	       arrdata.push(h);
	       var h=['174',res[0].x174, 'Cu'];
	       arrdata.push(h);
	       var h=['175',res[0].x175, 'Cu'];
	       arrdata.push(h);
	       var h=['176',res[0].x176, 'Cu'];
	       arrdata.push(h);
	       var h=['177',res[0].x177, 'Cu'];
	       arrdata.push(h);
	       var h=['178',res[0].x178, 'Cu'];
	       arrdata.push(h);
	       var h=['179',res[0].x179, 'Cu'];
	       arrdata.push(h);
	       var h=['180',res[0].x180, 'Cu'];
	       arrdata.push(h);
	       var h=['181',res[0].x181, 'Cu'];
	       arrdata.push(h);
	       var h=['182',res[0].x182, 'Cu'];
	       arrdata.push(h);
	       var h=['183',res[0].x183, 'Cu'];
	       arrdata.push(h);
	       var h=['184',res[0].x184, 'Cu'];
	       arrdata.push(h);
	       var h=['185',res[0].x185, 'Cu'];
	       arrdata.push(h);
	       var h=['186',res[0].x186, 'Cu'];
	       arrdata.push(h);
	       var h=['187',res[0].x187, 'Cu'];
	       arrdata.push(h);
	       var h=['188',res[0].x188, 'Cu'];
	       arrdata.push(h);
	       var h=['189',res[0].x189, 'Cu'];
	       arrdata.push(h);
	       var h=['190',res[0].x190, 'Cu'];
	       arrdata.push(h);
	       var h=['191',res[0].x191, 'Cu'];
	       arrdata.push(h);
	       var h=['192',res[0].x192, 'Cu'];
	       arrdata.push(h);
	       var h=['193',res[0].x193, 'Cu'];
	       arrdata.push(h);
	       var h=['194',res[0].x194, 'Cu'];
	       arrdata.push(h);
	       var h=['195',res[0].x195, 'Cu'];
	       arrdata.push(h);
	       var h=['196',res[0].x196, 'Cu'];
	       arrdata.push(h);
	       var h=['197',res[0].x197, 'Cu'];
	       arrdata.push(h);
	       var h=['198',res[0].x198, 'Cu'];
	       arrdata.push(h);
	       var h=['199',res[0].x199, 'Cu'];
	       arrdata.push(h);
	       var h=['200',res[0].x200, 'Cu'];
	       arrdata.push(h);
	       var h=['201',res[0].x201, 'Cu'];
	       arrdata.push(h);
	       var h=['202',res[0].x202, 'Cu'];
	       arrdata.push(h);
	       var h=['203',res[0].x203, 'Cu'];
	       arrdata.push(h);
	       var h=['204',res[0].x204, 'Cu'];
	       arrdata.push(h);
	       var h=['205',res[0].x205, 'Cu'];
	       arrdata.push(h);
	       var h=['206',res[0].x206, 'Cu'];
	       arrdata.push(h);
	       var h=['207',res[0].x207, 'Cu'];
	       arrdata.push(h);
	       var h=['208',res[0].x208, 'Cu'];
	       arrdata.push(h);
	       var h=['209',res[0].x209, 'Cu'];
	       arrdata.push(h);
	       var h=['210',res[0].x210, 'Cu'];
	       arrdata.push(h);
	       var h=['211',res[0].x211, 'Cu'];
	       arrdata.push(h);
	       var h=['212',res[0].x212, 'Cu'];
	       arrdata.push(h);
	       var h=['213',res[0].x213, 'Cu'];
	       arrdata.push(h);
	       var h=['214',res[0].x214, 'Cu'];
	       arrdata.push(h);
	       var h=['215',res[0].x215, 'Cu'];
	       arrdata.push(h);
	       var h=['216',res[0].x216, 'Cu'];
	       arrdata.push(h);
	       var h=['217',res[0].x217, 'Cu'];
	       arrdata.push(h);
	       var h=['218',res[0].x218, 'Cu'];
	       arrdata.push(h);
	       var h=['219',res[0].x219, 'Cu'];
	       arrdata.push(h);
	       var h=['220',res[0].x220, 'Cu'];
	       arrdata.push(h);
	       var h=['221',res[0].x221, 'Cu'];
	       arrdata.push(h);
	       var h=['222',res[0].x222, 'Cu'];
	       arrdata.push(h);
	       var h=['223',res[0].x223, 'Cu'];
	       arrdata.push(h);
	       var h=['224',res[0].x224, 'Cu'];
	       arrdata.push(h);
	       var h=['225',res[0].x225, 'Cu'];
	       arrdata.push(h);
	       var h=['226',res[0].x226, 'Cu'];
	       arrdata.push(h);
	       var h=['227',res[0].x227, 'Cu'];
	       arrdata.push(h);
	       var h=['228',res[0].x228, 'Cu'];
	       arrdata.push(h);
	       var h=['229',res[0].x229, 'Cu'];
	       arrdata.push(h);
	       var h=['230',res[0].x230, 'Cu'];
	       arrdata.push(h);
	       var h=['231',res[0].x231, 'Cu'];
	       arrdata.push(h);
	       var h=['232',res[0].x232, 'Cu'];
	       arrdata.push(h);
	       var h=['233',res[0].x233, 'Cu'];
	       arrdata.push(h);
	       var h=['234',res[0].x234, 'Cu'];
	       arrdata.push(h);
	       var h=['235',res[0].x235, 'Cu'];
	       arrdata.push(h);
	       var h=['236',res[0].x236, 'Cu'];
	       arrdata.push(h);
	       var h=['237',res[0].x237, 'Cu'];
	       arrdata.push(h);
	       var h=['238',res[0].x238, 'Cu'];
	       arrdata.push(h);
	       var h=['239',res[0].x239, 'Cu'];
	       arrdata.push(h);
	       var h=['240',res[0].x240, 'Cu'];
	       arrdata.push(h);
	       var h=['241',res[0].x241, 'Cu']
	       arrdata.push(h)
	       var h=['242',res[0].x242, 'Cu']
	       arrdata.push(h)
	       var h=['243',res[0].x243, 'Cu']
	       arrdata.push(h)
	       var h=['244',res[0].x244, 'Cu']
	       arrdata.push(h)
	       var h=['245',res[0].x245, 'Cu']
	       arrdata.push(h)
	       var h=['246',res[0].x246, 'Cu']
	       arrdata.push(h)
	       var h=['247',res[0].x247, 'Cu']
	       arrdata.push(h)
	       var h=['248',res[0].x248, 'Cu']
	       arrdata.push(h)
	       var h=['249',res[0].x249, 'Cu']
	       arrdata.push(h)
	       var h=['250',res[0].x250, 'Cu']
	       arrdata.push(h)
	       var h=['251',res[0].x251, 'Cu']
	       arrdata.push(h)
	       var h=['252',res[0].x252, 'Cu']
	       arrdata.push(h)
	       var h=['253',res[0].x253, 'Cu']
	       arrdata.push(h)
	       var h=['254',res[0].x254, 'Cu']
	       arrdata.push(h)
	       var h=['255',res[0].x255, 'Cu']
	       arrdata.push(h)
	       var h=['256',res[0].x256, 'Cu']
	       arrdata.push(h)
	       var h=['257',res[0].x257, 'Cu']
	       arrdata.push(h)
	       var h=['258',res[0].x258, 'Cu']
	       arrdata.push(h)
	       var h=['259',res[0].x259, 'Cu']
	       arrdata.push(h)
	       var h=['260',res[0].x260, 'Cu']
	       arrdata.push(h)
	       var h=['261',res[0].x261, 'Cu']
	       arrdata.push(h)
	       var h=['262',res[0].x262, 'Cu']
	       arrdata.push(h)
	       var h=['263',res[0].x263, 'Cu']
	       arrdata.push(h)
	       var h=['264',res[0].x264, 'Cu']
	       arrdata.push(h)
	       var h=['265',res[0].x265, 'Cu']
	       arrdata.push(h)
	       var h=['266',res[0].x266, 'Cu']
	       arrdata.push(h)
	       var h=['267',res[0].x267, 'Cu']
	       arrdata.push(h)
	       var h=['268',res[0].x268, 'Cu']
	       arrdata.push(h)
	       var h=['269',res[0].x269, 'Cu']
	       arrdata.push(h)
	       var h=['270',res[0].x270, 'Cu']
	       arrdata.push(h)
	       var h=['271',res[0].x271, 'Cu']
	       arrdata.push(h)
	       var h=['272',res[0].x272, 'Cu']
	       arrdata.push(h)
	       var h=['273',res[0].x273, 'Cu']
	       arrdata.push(h)
	       var h=['274',res[0].x274, 'Cu']
	       arrdata.push(h)
	       var h=['275',res[0].x275, 'Cu']
	       arrdata.push(h)
	       var h=['276',res[0].x276, 'Cu']
	       arrdata.push(h)
	       var h=['277',res[0].x277, 'Cu']
	       arrdata.push(h)
	       var h=['278',res[0].x278, 'Cu']
	       arrdata.push(h)
	       var h=['279',res[0].x279, 'Cu']
	       arrdata.push(h)
	       var h=['280',res[0].x280, 'Cu']
	       arrdata.push(h)
	       var h=['281',res[0].x281, 'Cu']
	       arrdata.push(h)
	       var h=['282',res[0].x282, 'Cu']
	       arrdata.push(h)
	       var h=['283',res[0].x283, 'Cu']
	       arrdata.push(h)
	       var h=['284',res[0].x284, 'Cu']
	       arrdata.push(h)
	       var h=['285',res[0].x285, 'Cu']
	       arrdata.push(h)
	       var h=['286',res[0].x286, 'Cu']
	       arrdata.push(h)
	       var h=['287',res[0].x287, 'Cu']
	       arrdata.push(h)
	       var h=['288',res[0].x288, 'Cu']
	       arrdata.push(h)
	       var h=['289',res[0].x289, 'Cu']
	       arrdata.push(h)
	       var h=['290',res[0].x290, 'Cu']
	       arrdata.push(h)
	       var h=['291',res[0].x291, 'Cu']
	       arrdata.push(h)
	       var h=['292',res[0].x292, 'Cu']
	       arrdata.push(h)
	       var h=['293',res[0].x293, 'Cu']
	       arrdata.push(h)
	       var h=['294',res[0].x294, 'Cu']
	       arrdata.push(h)
	       var h=['295',res[0].x295, 'Cu']
	       arrdata.push(h)
	       var h=['296',res[0].x296, 'Cu']
	       arrdata.push(h)
	       var h=['297',res[0].x297, 'Cu']
	       arrdata.push(h)
	       var h=['298',res[0].x298, 'Cu']
	       arrdata.push(h)
	       var h=['299',res[0].x299, 'Cu']
	       arrdata.push(h)
	       var h=['300',res[0].x300, 'Cu']
	       arrdata.push(h)
	       var h=['301',res[0].x301, 'Cu']
	       arrdata.push(h)
	       var h=['302',res[0].x302, 'Cu']
	       arrdata.push(h)
	       var h=['303',res[0].x303, 'Cu']
	       arrdata.push(h)
	       var h=['304',res[0].x304, 'Cu']
	       arrdata.push(h)
	       var h=['305',res[0].x305, 'Cu']
	       arrdata.push(h)
	       var h=['306',res[0].x306, 'Cu']
	       arrdata.push(h)
	       var h=['307',res[0].x307, 'Cu']
	       arrdata.push(h)
	       var h=['308',res[0].x308, 'Cu']
	       arrdata.push(h)
	       var h=['309',res[0].x309, 'Cu']
	       arrdata.push(h)
	       var h=['310',res[0].x310, 'Cu']
	       arrdata.push(h)
	       var h=['311',res[0].x311, 'Cu']
	       arrdata.push(h)
	       var h=['312',res[0].x312, 'Cu']
	       arrdata.push(h)
	       var h=['313',res[0].x313, 'Cu']
	       arrdata.push(h)
	       var h=['314',res[0].x314, 'Cu']
	       arrdata.push(h)
	       var h=['315',res[0].x315, 'Cu']
	       arrdata.push(h)
	       var h=['316',res[0].x316, 'Cu']
	       arrdata.push(h)
	       var h=['317',res[0].x317, 'Cu']
	       arrdata.push(h)
	       var h=['318',res[0].x318, 'Cu']
	       arrdata.push(h)
	       var h=['319',res[0].x319, 'Cu']
	       arrdata.push(h)
	       var h=['320',res[0].x320, 'Cu']
	       arrdata.push(h)
	       var h=['321',res[0].x321, 'Cu']
	       arrdata.push(h)
	       var h=['322',res[0].x322, 'Cu']
	       arrdata.push(h)
	       var h=['323',res[0].x323, 'Cu']
	       arrdata.push(h)
	       var h=['324',res[0].x324, 'Cu']
	       arrdata.push(h)
	       var h=['325',res[0].x325, 'Cu']
	       arrdata.push(h)
	       var h=['326',res[0].x326, 'Cu']
	       arrdata.push(h)
	       var h=['327',res[0].x327, 'Cu']
	       arrdata.push(h)
	       var h=['328',res[0].x328, 'Cu']
	       arrdata.push(h)
	       var h=['329',res[0].x329, 'Cu']
	       arrdata.push(h)
	       var h=['330',res[0].x330, 'Cu']
	       arrdata.push(h)
	       var h=['331',res[0].x331, 'Cu']
	       arrdata.push(h)
	       var h=['332',res[0].x332, 'Cu']
	       arrdata.push(h)
	       var h=['333',res[0].x333, 'Cu']
	       arrdata.push(h)
	       var h=['334',res[0].x334, 'Cu']
	       arrdata.push(h)
	       var h=['335',res[0].x335, 'Cu']
	       arrdata.push(h)
	       var h=['336',res[0].x336, 'Cu']
	       arrdata.push(h)
	       var h=['337',res[0].x337, 'Cu']
	       arrdata.push(h)
	       var h=['338',res[0].x338, 'Cu']
	       arrdata.push(h)
	       var h=['339',res[0].x339, 'Cu']
	       arrdata.push(h)
	       var h=['340',res[0].x340, 'Cu']
	       arrdata.push(h)
	       var h=['341',res[0].x341, 'Cu']
	       arrdata.push(h)
	       var h=['342',res[0].x342, 'Cu']
	       arrdata.push(h)
	       var h=['343',res[0].x343, 'Cu']
	       arrdata.push(h)
	       var h=['344',res[0].x344, 'Cu']
	       arrdata.push(h)
	       var h=['345',res[0].x345, 'Cu']
	       arrdata.push(h)
	       var h=['346',res[0].x346, 'Cu']
	       arrdata.push(h)
	       var h=['347',res[0].x347, 'Cu']
	       arrdata.push(h)
	       var h=['348',res[0].x348, 'Cu']
	       arrdata.push(h)
	       var h=['349',res[0].x349, 'Cu']
	       arrdata.push(h)
	       var h=['350',res[0].x350, 'Cu']
	       arrdata.push(h)
	       var h=['351',res[0].x351, 'Cu']
	       arrdata.push(h)
	       var h=['352',res[0].x352, 'Cu']
	       arrdata.push(h)
	       var h=['353',res[0].x353, 'Cu']
	       arrdata.push(h)
	       var h=['354',res[0].x354, 'Cu']
	       arrdata.push(h)
	       var h=['355',res[0].x355, 'Cu']
	       arrdata.push(h)
	       var h=['356',res[0].x356, 'Cu']
	       arrdata.push(h)
	       var h=['357',res[0].x357, 'Cu']
	       arrdata.push(h)
	       var h=['358',res[0].x358, 'Cu']
	       arrdata.push(h)
	       var h=['359',res[0].x359, 'Cu']
	       arrdata.push(h)
	       var h=['360',res[0].x360, 'Cu']
	       arrdata.push(h)
	       var h=['361',res[0].x361, 'Cu']
	       arrdata.push(h)
	       var h=['362',res[0].x362, 'Cu']
	       arrdata.push(h)
	       var h=['363',res[0].x363, 'Cu']
	       arrdata.push(h)
	       var h=['364',res[0].x364, 'Cu']
	       arrdata.push(h)
	       var h=['365',res[0].x365, 'Cu']
	       arrdata.push(h)
	       var h=['366',res[0].x366, 'Cu']
	       arrdata.push(h)
	       var h=['367',res[0].x367, 'Cu']
	       arrdata.push(h)
	       var h=['368',res[0].x368, 'Cu']
	       arrdata.push(h)
	       var h=['369',res[0].x369, 'Cu']
	       arrdata.push(h)
	       var h=['370',res[0].x370, 'Cu']
	       arrdata.push(h)
	       var h=['371',res[0].x371, 'Cu']
	       arrdata.push(h)
	       var h=['372',res[0].x372, 'Cu']
	       arrdata.push(h)
	       var h=['373',res[0].x373, 'Cu']
	       arrdata.push(h)
	       var h=['374',res[0].x374, 'Cu']
	       arrdata.push(h)
	       var h=['375',res[0].x375, 'Cu']
	       arrdata.push(h)
	       var h=['376',res[0].x376, 'Cu']
	       arrdata.push(h)
	       var h=['377',res[0].x377, 'Cu']
	       arrdata.push(h)
	       var h=['378',res[0].x378, 'Cu']
	       arrdata.push(h)
	       var h=['379',res[0].x379, 'Cu']
	       arrdata.push(h)
	       var h=['380',res[0].x380, 'Cu']
	       arrdata.push(h)
	       var h=['381',res[0].x381, 'Cu']
	       arrdata.push(h)
	       var h=['382',res[0].x382, 'Cu']
	       arrdata.push(h)
	       var h=['383',res[0].x383, 'Cu']
	       arrdata.push(h)
	       var h=['384',res[0].x384, 'Cu']
	       arrdata.push(h)
	       var h=['385',res[0].x385, 'Cu']
	       arrdata.push(h)
	       var h=['386',res[0].x386, 'Cu']
	       arrdata.push(h)
	       var h=['387',res[0].x387, 'Cu']
	       arrdata.push(h)
	       var h=['388',res[0].x388, 'Cu']
	       arrdata.push(h)
	       var h=['389',res[0].x389, 'Cu']
	       arrdata.push(h)
	       var h=['390',res[0].x390, 'Cu']
	       arrdata.push(h)
	       var h=['391',res[0].x391, 'Cu']
	       arrdata.push(h)
	       var h=['392',res[0].x392, 'Cu']
	       arrdata.push(h)
	       var h=['393',res[0].x393, 'Cu']
	       arrdata.push(h)
	       var h=['394',res[0].x394, 'Cu']
	       arrdata.push(h)
	       var h=['395',res[0].x395, 'Cu']
	       arrdata.push(h)
	       var h=['396',res[0].x396, 'Cu']
	       arrdata.push(h)
	       var h=['397',res[0].x397, 'Cu']
	       arrdata.push(h)
	       var h=['398',res[0].x398, 'Cu']
	       arrdata.push(h)
	       var h=['399',res[0].x399, 'Cu']
	       arrdata.push(h)
	       var h=['400',res[0].x400, 'Cu']
	       arrdata.push(h)
	       var h=['401',res[0].x401, 'Cu']
	       arrdata.push(h)
	       var h=['402',res[0].x402, 'Cu']
	       arrdata.push(h)
	       var h=['403',res[0].x403, 'Cu']
	       arrdata.push(h)
	       var h=['404',res[0].x404, 'Cu']
	       arrdata.push(h)
	       var h=['405',res[0].x405, 'Cu']
	       arrdata.push(h)
	       var h=['406',res[0].x406, 'Cu']
	       arrdata.push(h)
	       var h=['407',res[0].x407, 'Cu']
	       arrdata.push(h)
	       var h=['408',res[0].x408, 'Cu']
	       arrdata.push(h)
	       var h=['409',res[0].x409, 'Cu']
	       arrdata.push(h)
	       var h=['410',res[0].x410, 'Cu']
	       arrdata.push(h)
	       var h=['411',res[0].x411, 'Cu']
	       arrdata.push(h)
	       var h=['412',res[0].x412, 'Cu']
	       arrdata.push(h)
	       var h=['413',res[0].x413, 'Cu']
	       arrdata.push(h)
	       var h=['414',res[0].x414, 'Cu']
	       arrdata.push(h)
	       var h=['415',res[0].x415, 'Cu']
	       arrdata.push(h)
	       var h=['416',res[0].x416, 'Cu']
	       arrdata.push(h)
	       var h=['417',res[0].x417, 'Cu']
	       arrdata.push(h)
	       var h=['418',res[0].x418, 'Cu']
	       arrdata.push(h)
	       var h=['419',res[0].x419, 'Cu']
	       arrdata.push(h)
	       var h=['420',res[0].x420, 'Cu']
	       arrdata.push(h)
	       var h=['421',res[0].x421, 'Cu']
	       arrdata.push(h)
	       var h=['422',res[0].x422, 'Cu']
	       arrdata.push(h)
	       var h=['423',res[0].x423, 'Cu']
	       arrdata.push(h)
	       var h=['424',res[0].x424, 'Cu']
	       arrdata.push(h)
	       var h=['425',res[0].x425, 'Cu']
	       arrdata.push(h)
	       var h=['426',res[0].x426, 'Cu']
	       arrdata.push(h)
	       var h=['427',res[0].x427, 'Cu']
	       arrdata.push(h)
	       var h=['428',res[0].x428, 'Cu']
	       arrdata.push(h)
	       var h=['429',res[0].x429, 'Cu']
	       arrdata.push(h)
	       var h=['430',res[0].x430, 'Cu']
	       arrdata.push(h)
	       var h=['431',res[0].x431, 'Cu']
	       arrdata.push(h)
	       var h=['432',res[0].x432, 'Cu']
	       arrdata.push(h)
	       var h=['433',res[0].x433, 'Cu']
	       arrdata.push(h)
	       var h=['434',res[0].x434, 'Cu']
	       arrdata.push(h)
	       var h=['435',res[0].x435, 'Cu']
	       arrdata.push(h)
	       var h=['436',res[0].x436, 'Cu']
	       arrdata.push(h)
	       var h=['437',res[0].x437, 'Cu']
	       arrdata.push(h)
	       var h=['438',res[0].x438, 'Cu']
	       arrdata.push(h)
	       var h=['439',res[0].x439, 'Cu']
	       arrdata.push(h)
	       var h=['440',res[0].x440, 'Cu']
	       arrdata.push(h)
	       var h=['441',res[0].x441, 'Cu']
	       arrdata.push(h)
	       var h=['442',res[0].x442, 'Cu']
	       arrdata.push(h)
	       var h=['443',res[0].x443, 'Cu']
	       arrdata.push(h)
	       var h=['444',res[0].x444, 'Cu']
	       arrdata.push(h)
	       var h=['445',res[0].x445, 'Cu']
	       arrdata.push(h)
	       var h=['446',res[0].x446, 'Cu']
	       arrdata.push(h)
	       var h=['447',res[0].x447, 'Cu']
	       arrdata.push(h)
	       var h=['448',res[0].x448, 'Cu']
	       arrdata.push(h)
	       var h=['449',res[0].x449, 'Cu']
	       arrdata.push(h)
	       var h=['450',res[0].x450, 'Cu']
	       arrdata.push(h)
	       var h=['451',res[0].x451, 'Cu']
	       arrdata.push(h)
	       var h=['452',res[0].x452, 'Cu']
	       arrdata.push(h)
	       var h=['453',res[0].x453, 'Cu']
	       arrdata.push(h)
	       var h=['454',res[0].x454, 'Cu']
	       arrdata.push(h)
	       var h=['455',res[0].x455, 'Cu']
	       arrdata.push(h)
	       var h=['456',res[0].x456, 'Cu']
	       arrdata.push(h)
	       var h=['457',res[0].x457, 'Cu']
	       arrdata.push(h)
	       var h=['458',res[0].x458, 'Cu']
	       arrdata.push(h)
	       var h=['459',res[0].x459, 'Cu']
	       arrdata.push(h)
	       var h=['460',res[0].x460, 'Cu']
	       arrdata.push(h)
	       var h=['461',res[0].x461, 'Cu']
	       arrdata.push(h)
	       var h=['462',res[0].x462, 'Cu']
	       arrdata.push(h)
	       var h=['463',res[0].x463, 'Cu']
	       arrdata.push(h)
	       var h=['464',res[0].x464, 'Cu']
	       arrdata.push(h)
	       var h=['465',res[0].x465, 'Cu']
	       arrdata.push(h)
	       var h=['466',res[0].x466, 'Cu']
	       arrdata.push(h)
	       var h=['467',res[0].x467, 'Cu']
	       arrdata.push(h)
	       var h=['468',res[0].x468, 'Cu']
	       arrdata.push(h)
	       var h=['469',res[0].x469, 'Cu']
	       arrdata.push(h)
	       var h=['470',res[0].x470, 'Cu']
	       arrdata.push(h)
	       var h=['471',res[0].x471, 'Cu']
	       arrdata.push(h)
	       var h=['472',res[0].x472, 'Cu']
	       arrdata.push(h)
	       var h=['473',res[0].x473, 'Cu']
	       arrdata.push(h)
	       var h=['474',res[0].x474, 'Cu']
	       arrdata.push(h)
	       var h=['475',res[0].x475, 'Cu']
	       arrdata.push(h)
	       var h=['476',res[0].x476, 'Cu']
	       arrdata.push(h)
	       var h=['477',res[0].x477, 'Cu']
	       arrdata.push(h)
	       var h=['478',res[0].x478, 'Cu']
	       arrdata.push(h)
	       var h=['479',res[0].x479, 'Cu']
	       arrdata.push(h)
	       var h=['480',res[0].x480, 'Cu']
	       arrdata.push(h)
	       var h=['481',res[0].x481, 'Cu']
	       arrdata.push(h)
	       var h=['482',res[0].x482, 'Cu']
	       arrdata.push(h)
	       var h=['483',res[0].x483, 'Cu']
	       arrdata.push(h)
	       var h=['484',res[0].x484, 'Cu']
	       arrdata.push(h)
	       var h=['485',res[0].x485, 'Cu']
	       arrdata.push(h)
	       var h=['486',res[0].x486, 'Cu']
	       arrdata.push(h)
	       var h=['487',res[0].x487, 'Cu']
	       arrdata.push(h)
	       var h=['488',res[0].x488, 'Cu']
	       arrdata.push(h)
	       var h=['489',res[0].x489, 'Cu']
	       arrdata.push(h)
	       var h=['490',res[0].x490, 'Cu']
	       arrdata.push(h)
	       var h=['491',res[0].x491, 'Cu']
	       arrdata.push(h)
	       var h=['492',res[0].x492, 'Cu']
	       arrdata.push(h)
	       var h=['493',res[0].x493, 'Cu']
	       arrdata.push(h)
	       var h=['494',res[0].x494, 'Cu']
	       arrdata.push(h)
	       var h=['495',res[0].x495, 'Cu']
	       arrdata.push(h)
	       var h=['496',res[0].x496, 'Cu']
	       arrdata.push(h)
	       var h=['497',res[0].x497, 'Cu']
	       arrdata.push(h)
	       var h=['498',res[0].x498, 'Cu']
	       arrdata.push(h)
	       var h=['499',res[0].x499, 'Cu']
	       arrdata.push(h)
	       var h=['500',res[0].x500, 'Cu']
	       arrdata.push(h)
	       
	       google.charts.load("current", {packages:['corechart']});
	       google.charts.setOnLoadCallback($scope.drawChart);
	          
		   }).error(function(res) {
					//alert("error");
				});
	   	 
	       $scope.myfunction5(student_id);
	         
	      }
	        
	        
	         $scope.myfunction5 = function(sid){
	      	  
	        	  var Header= ['Chunks', 'Frequency', { role: 'style' }];
	        	  arrdata1.push(Header);
	        	  student_id=sid;
	        	  var uri="webapi/visualize/StudentListeningPattern/"+student_id+"/"+song_id;
	        	  
	        	  
	        	  $http({
		    		  method : "POST",
		    	      headers : {
							'Content-Type' : 'application/json',
					  },
	        			    url: uri,
	        	  }).success(function(res) {
	        	    	
	        			 var h=['5',res[0].x5, 'Cu']
	        			 arrdata1.push(h)
	        			 var h=['10',res[0].x10, 'Cu']
	        			 arrdata1.push(h)
	        			 var h=['15',res[0].x15, 'Cu']
	        			 arrdata1.push(h)
	        			 var h=['20',res[0].x20, 'Cu']
	        			 arrdata1.push(h)
	        			 var h=['25',res[0].x25, 'Cu']
	        			 arrdata1.push(h)
	        			 var h=['>30',res[0].x30, 'Cu']
	        			 arrdata1.push(h)
	        			 console.log("Arrdata data values : ",arrdata1);
	        			 google.charts.load("current", {packages:['corechart']});
	        			 google.charts.setOnLoadCallback($scope.drawChart5);
	        			 
	        	  }).error(function(res) {
						//alert("error");
					});
	        	 
	        	   $scope.myfunction6(sid);
	        	}
	         
	         
	          $scope.myfunction6 = function(sid){
	        	  
	        		var h=['Song', 'Times'];
	        		arrdata2.push(h);
	        	 	student_id=sid;
	        	 	var uri="webapi/visualize/MostPlayedSong/"+student_id;
	        	 	
	        	 	$http({
			    		  method : "POST",
			    		  headers : {
							'Content-Type' : 'application/json',
			    		  },
					  	  url: uri,
	        	 		  }).success(function(res) {
	        	    		   
	        				 for(var i=0;i<res.length;i++){
	        				
	        				 var h=[res[i].recording_name,res[i].count];
	        				 arrdata2.push(h);
	        				 
	        				 }
	        	 	 google.charts.load("current", {packages:['corechart']});
	        	     google.charts.setOnLoadCallback($scope.drawChart6);
	          }).error(function(res) {
					//alert("error");
				});
	        	 
	        	   
	        	} 
	          
	          $scope.logout = function () {
      			
  				window.location.href = "index.html";
  				localStorage.clear();
  			}
	
});