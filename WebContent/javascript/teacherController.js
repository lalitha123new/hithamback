var app = angular.module("hitham", []);

app.controller("teacherController",function($scope, $http) {
	
	//student data arrays
	$scope.mystudent = [];
	$scope.selected_student = [];
	$scope.res_other_student = [];
	$scope.res_other_student_id = [];
	$scope.filtered_student = [];
	$scope.filtered_student_id = [];
	$scope.filteredStudents = [];
	$scope.array3 = [];
	
	//play list data arrays
	$scope.playlist = [];
	$scope.current_student_playlist = [];
	$scope.playlist_color = [];
	$scope.playlist_image = [];
	
	//other play list data arrays
	//$scope.other_playlist = [];
	$scope.other_playlist = [];
	$scope.other_playlist_id = [];
	$scope.other_playlist_color = [];
	$scope.other_playlist_image = [];
	
	//assigned recording and song data arrays
	$scope.recording_id = [];
	$scope.assigned_song_id = [];
	$scope.search_array = [];
	$scope.resultObject = [];
	$scope.search_value = [];
	$scope.assigned_song_name = [];
	$scope.assigned_song_composer = [];
	$scope.assigned_song_raaga = [];
	$scope.assigned_song_taal = [];
	$scope.assigned_song_singer= [];
	$scope.songs = [];
	$scope.song_color = [];
	$scope.song_img = [];
	$scope.composer = [];
	$scope.singer = [];
	//$scope.song_img = [];
	
	//other recording data arrays
	$scope.other_recording_id = [];
	$scope.other_songs = [];
	$scope.other_song_color = [];
	$scope.other_song_img = [];
	
	$scope.res_all_songs = [];
	//$scope.result = 'pass';
	
	//old design code - required
	var studentID = '';
	var student_id = '';
	var playlist_nameArray = [];
	var last_fetched_data =  null;
	
	//show +,- and edit buttons when selecting mystudent else hide all the buttons
	$scope.hide_btn = false;
	
				//teacher login check
				$scope.doOnLoad = function() {
				
				if(localStorage.getItem("teacherName") == undefined){
			    window.location.href = "index.html";
			    }else{
			    	uid = localStorage.getItem("teacher_pk");
			    }
				
				
			    setTimeout(function(){
			        
			        $(document).ready(function(){
			        	
			        	$scope.loadStudentForTeacherList();
			        	$scope.loadStudentList();
			        	$scope.getSongList();
			        	$scope.recordingList();
			        	//$scope.getCurrentRecordingList();
			        	//$scope.getRecordingList();
			        	//$scope.loadplayList();
			        	
			        	
			        	
			        	document.getElementById('role').innerHTML = '<div>Teacher : '+localStorage.getItem("teacherName")+'</div>';
			        	});
			    }, 1000);
			    
			   
			    
			    
			    //display assigned students of the teacher who logged in
			    $scope.loadStudentForTeacherList = function() {
			    	
			    	$http({
							url : URL
									+ '/webapi/teacher/fetchAssignedStudents/'+uid,
									method : "POST",
									headers : {
									'Content-Type' : 'application/json',
									}
									}).success(function(res) {
									
									var list_for_activity = '<option value="0">All</option>';
									if(res.length!=0){
									for(var i = 0;i<res.length;i++){
									
									$scope.res = res[i];
									$scope.mystudent[i] =$scope.res.student_name; 
									$scope.selected_student[i] =$scope.res.student_pk;
									list_for_activity += '<option value="'+$scope.selected_student[i]+'">'+$scope.mystudent[i]+'</option>';
									
									}
									
									//to set the first student in the mystudents as the selected option by default and to display the assigned play list of the default student
									$scope.id1= $scope.selected_student[0];
									$scope.getCurrentplaylist($scope.id1);
				    				$scope.getRemainingPlaylist($scope.id1);
									$('#student_select').append(list_for_activity);
									}else{
										$scope.mystudent[0] = "no student assigned";
									}
									
									}).error(function(res) {
										alert("error");
									});
			    					
			    				
			    				}//end of display assigned students of the teacher who logged in
			    			
			    
			    
			  //function to select other students of other teachers from the list of all students
    			$scope.arr_diff = function(a1, a2) {

    			    var a = [], diff = [];

    			    for (var i = 0; i < a1.length; i++) {
    			        a[a1[i]] = true;
    			    }

    			    for (var i = 0; i < a2.length; i++) {
    			        if (a[a2[i]]) {
    			            delete a[a2[i]];
    			        } else {
    			            a[a2[i]] = true;
    			        }
    			    }

    			    for (var k in a) {
    			        diff.push(k);
    			    }

    			    return diff;
    			}// end of unction to select other students of other teachers from all students

    			
    						
			    //display all students
			    $scope.loadStudentList = function() {
			    				
			    	
			    	$http({
							url : URL
									+ '/webapi/student/fetchall/',
									method : "GET",
									headers : {
									'Content-Type' : 'application/json',
									}
									}).success(function(res) {
									
									for(var i = 0;i<res.length;i++){
									$scope.res = res[i];
									
									$scope.res_other_student[i] =$scope.res.student_name;
									$scope.res_other_student_id[i] =$scope.res.student_pk;
									
									
									}
									
									//console.log($scope.res_other_student);
									//console.log($scope.mystudent);
									 //display only other students of other teachers in the other students box by filtering the all students list
									 $scope.filtered_student =$scope.arr_diff($scope.res_other_student,$scope.mystudent);
									 console.log($scope.filtered_student);
									 $scope.filtered_student_id = $scope.arr_diff($scope.res_other_student_id,$scope.selected_student);
									
									
									}).error(function(res) {
										alert("error");
									});
		
						}//end of display all students
			    			
			    
	    			
			     	//function to call the functions for displaying assigned and other play lists of the selected student
	    				$scope.selected_mystudent = function(id){
	    					

	    					 
	    					//show all buttons
	    					$scope.hide_btn = false;
	    					
	    					//setting the default my student id as "0" when the teacher selects another option in my student
	    					$scope.id1 = 0;
	    					
	    					student_id = id;
	    					
	    					//uncheck the option in other students box to show the checked option in my students box
	    					$('.other_students_radio').prop('checked', false);
	    					
	    					//empty the song and recording details arrays when the teacher changes the play list option
	    					$scope.songs = [];
		    				$scope.song_img = [];
		    				$scope.song_color = [];
		    				$scope.recording_id = [];
	    					
		    				$scope.getCurrentplaylist(id);
		    				$scope.getRemainingPlaylist(id);
	    				 	}//end of function to call the functions for displaying assigned and other play lists of the selected student
	    				
	    				
	    				//function to get the id of other student,selected
		    			$scope.other_students = function (id){
		    				
		    				//hide all buttons
		    				$scope.hide_btn = true;
		    				
		    				//uncheck the option in my students box to show the checked option in other students box 
		    				$('.mystudents_radio').prop('checked', false);
		    				
		    				$scope.id1 = 0;
		    				student_id = id;
		    				$scope.songs = [];
		    				$scope.song_img = [];
		    				$scope.song_color = [];
		    				$scope.recording_id = [];
		    				$scope.other_songs = [];
							$scope.other_song_img = [];
							$scope.other_song_color = [];
		    				
	    					
		    				$scope.getCurrentplaylist(id);
		    				$scope.getRemainingPlaylist(id);
		    				
		    			}//end of function to get the id of other student,selected
				    			
				    			
	    				//function to display a student's assigned play list
	    				$scope.getCurrentplaylist = function(id) {
	    					
	    				//id is the id of selected student
	    					
	    				//setting the default my student play list id as "0" when the teacher selects another option in play list of default my student	
	    				$scope.playlist1 = 0;
	    				
	    				//empty the play list arrays changing the student 
	    				$scope.current_student_playlist = [];
	    				$scope.playlist = [];
	    				$scope.playlist_color = [];
	    				$scope.playlist_image = [];
	    				
    					$http({
    							url : URL
    									+'/webapi/playlist/assignedForStudent/'+id,
    									method : "POST",
    									headers : {
    									'Content-Type' : 'application/json',
    									}
										}).success(function(res) {
											console.log(res);
										if(res.length!=0){
										for(var i = 0;i<res.length;i++){
											$scope.res = res[i];
											$scope.current_student_playlist[i] =$scope.res.playlist_name;
											$scope.playlist[i] =$scope.res.playlist_id;
											$scope.playlist_color[i] =$scope.res.playlist_color;
											$scope.playlist_image[i] = $scope.res.playlist_pic_url;
											console.log($scope.playlist_image);
												
											}
										
										$scope.playlist1= $scope.playlist[0];
										console.log($scope.playlist1);
										$scope.getCurrentRecordingList($scope.playlist1);
					    				$scope.getRecordingList($scope.playlist1);
					    				$scope.recordingList();
										}else{
											//alert("No play list assigned");
											$scope.current_student_playlist = [];
											$scope.songs = [];
											$scope.other_songs = []; 
											
											
										}
							
										}).error(function(res) {
											//alert("error");
										});
    					
	    						}//end of function to display a student's assigned play list
			    				
			    				
	    			//function to display other play lists for a student
	    			$scope.getRemainingPlaylist = function(id) {
	    				
	    				//empty other play list arrays when changing student 
	    				$scope.other_playlist = [];
	    				$scope.other_playlist_id = [];
	    				$scope.composer = [];
	    				$scope.other_playlist_color = [];
	    				$scope.other_playlist_image = [];
						$http({
								url :  URL+
								'/webapi/playlist/fetchForStudent/'+id,
										method : "POST",
										headers : {
										'Content-Type' : 'application/json',
										}
										}).success(function(res) {
										console.log(res);
											var no_of_object = res.length;	
								        	var appendData = '';
								        	$('#playlistCheckbox').empty();
								        	if(no_of_object == 0){
								        		appendData += 'No data found';
								        	}else{
										for(var i = 0;i<res.length;i++){
											
											$scope.res = res[i];
											$scope.other_playlist[i] =$scope.res.playlist_name;
											$scope.other_playlist_id[i] =$scope.res.playlist_id;
											$scope.composer[i] = $scope.res.playlist_pic_url;
											$scope.other_playlist_color[i] =$scope.res.playlist_color;
											$scope.other_playlist_image[i] = $scope.res.playlist_pic_url;
											appendData += '<input type="checkbox" name="playlistBox" value="'+res[i]['playlist_id']+'"> &nbsp;'+res[i]['playlist_name']+'<br>';
											
											}
								        	}
								        	$('#playlistCheckbox').append(appendData);
										
										
							
										}).error(function(res) {
											//alert("error");
										});
		
	    					}//end of function to display other play lists for a student
			    			
			    			//function to create new play list by the logged in teacher
							$scope.playlistProfileSubmit = function(){
								
								
								var file = $('input[name="file"]').get(0).files[0];
							    var formData = new FormData();
							    formData.append('file', file);

							   
							        console.log(formData);
								
								
								if(playlist_nameArray.indexOf($('#playlistName').val()) != -1) {
									
									alert('Name already Exists');
								}else {
									/*$http({
											url : URL+'/webapi/playlist/create',
											method : "POST",
											headers : {
													'Content-Type' : 'application/json',
													},
													async: false,
													data: JSON.stringify({
														playlist_name:$('#playlistName').val(),
														playlist_pic_url: $('#playlistPicURL').val() ,
														playlist_color: $('#playlistColor').val() ,
														teacher_pk:uid
													}),
										}).success(function() {
										
										//$('#playlist_Modal').modal('hide');
										//window.location.reload();
											
											
											
											
										}).error(function() {
											$('#playlist_Modal').modal('hide');
											window.location.reload();
											//alert("error");
										}); */
									
									
									 $.ajax({
									        url: URL+'/webapi/upload2/upload21',
									        type: 'POST',
									        data: formData,
									        cache: false,
									        contentType: false,
									        processData: false,
									        success: function(){
									            alert('file upload complete');
									        },
									        error: function(response){
									            var error = "error";
									            if (response.status === 409){
									                error = response.responseText;
									            }
									            alert(error);
									        },
									        xhr: function() {
									            var myXhr = $.ajaxSettings.xhr();
									            if (myXhr.upload) {
									                myXhr.upload.addEventListener('progress', progress, false);
									            } else {
									                console.log('Upload progress is not supported.');
									            }
									            return myXhr;
									        }
									    });
									
									
									}
								
								
								
								
								}//end of function to create new play list by the logged in teacher
							
							
							//function to assign new play list to a student by the logged in teacher
							$scope.createPlaylistStudentMapping = function(play_list_id){
								
								//checking default student id or selected student id
								if($scope.id1 > 0){
									student_id = $scope.id1;
								}else{
									
									student_id = student_id;
								}
									
							$scope.selected = [];
							$scope.selected.push(play_list_id);
							
							
							if($scope.selected.length != 0) {
									$http({
										url : URL+'/webapi/playlist/studentPlaylistMapping/'+uid+'/'+student_id,
										method : "POST",
										headers : {
											'Content-Type' : 'text/plain',
											},
										data: ''+$scope.selected.join(','),
									}).success(function(res) {
										window.location.reload();
								        }).error(function() {
								        	
									});
								}
								
								$scope.getCurrentplaylist(student_id);
								
							}//end of function to assign new play list to a student by the logged in teacher
							
							
							
							//function edit play list assigned to a student by the logged in teacher
							var playlistID;
							$scope.editplaylist = function(sid,name,color,url) {
								playlistID = sid;
								$('#playlistName2').val(name);
								$('#playlistColor2').val(color);
								$('#playlistPicURL2').val(url);
								
								$('#student_id_edit').val(playlistID);
								
								
							}//end of function edit play list assigned to a student by the logged in teacher
							
							
							//function to save edited play list assigned to a student  list by the teacher
							 $scope.saveEdit = function()  {
								//checking default student id or selected student id
								 if($scope.id1 > 0){
										student_id = $scope.id1;
									}else{
										
										student_id = student_id;
									}
								
								 $http({
									url : URL+'/webapi/playlist/edit/'+playlistID,
									method : "POST",
									headers : {
											'Content-Type' : 'application/json',
											},
									async: false,
									data: JSON.stringify({
										playlist_name:$('#playlistName2').val(),
										playlist_pic_url: $('#playlistPicURL2').val() ,
										playlist_color: $('#playlistColor2').val()
										
							        }),
								 }).success(function(res) {
									 
								        }).error(function() {
								        	
								        	
									});
								$('#playlistEditForm').modal('toggle');
								window.location.reload();
								$scope.getCurrentplaylist(student_id);
								
								
							}//end of function to save edited play list assigned to a student  list by the teacher

							
							 //function to delete assigned playlist of student
							 $scope.deletePlaylistStudentMapping = function(play_list_id,playlist_name) {
								//checking default student id or selected student id
								 if($scope.id1 > 0){
										student_id = $scope.id1;
									}else{
										
										student_id = student_id;
									}
								 
								$scope.selected = [];
								
								$scope.selected.push(play_list_id);
								
								if($scope.selected.length != 0) {
									
									if (confirm("Do you want to remove "+playlist_name+" ?") == true){
										$http({
											url : URL+'/webapi/playlist/deleteMapping/'+student_id,
											method : "POST",
											headers : {
												'Content-Type' : 'text/plain',
												},
											data: ''+$scope.selected.join(','),
										}).success(function(res) {
											window.location.reload();
									        }).error(function() {
									        	window.location.reload();
										});
										
										
									}
									
								}
								$scope.getCurrentplaylist(student_id);
								
							}//end of function to delete assigned playlist of student
							
							 
							//function to call the functions for displaying assigned recording,songs and other recordings,songs under a play list to a student
				    			$scope.selected_playlist = function(id) {
				    				//setting default play list id as "0" when changing options
				    				$scope.playlist1 = 0;
				    				
				    				$("input.assigned_radio:radio").click(function(){
				    				$("input.other_radio:radio").prop('checked',false);
				    				});
				    				
				    				$("input.other_radio:radio").click(function(){
					    				$("input.assigned_radio:radio").prop('checked',false);
					    				});
				    				
				    				
				    				playlistID = id;
			    					$scope.getCurrentRecordingList(id);
			    					$scope.getRecordingList(id);
			    					$scope.recordingList();
			    					
			    				}//end of function to call the functions for displaying assigned recording,songs and other recordings,songs under a play list to a student
				    			
				    			
				    			//function to display current recording(song) list under a  particular play list with playlist_id, of a student
				    			$scope.getCurrentRecordingList = function(id) {
				    				
				    				//checking default play list id or selected play list id
				    				if($scope.playlist1 > 0){
				    					id =  $scope.playlist1;
				    				}else{
				    					id = id;
				    				}
				    				//empty recording and song arrays when changing play list options
				    				$scope.songs = [];
				    				$scope.song_img = [];
				    				$scope.song_color = [];
				    				$scope.recording_id = [];
				    			
			    						$http({
			    									url :URL+'/webapi/playlist/fetchAssignedRecordings/'+id,
				    									method : "POST",
				    									headers : {
				    									'Content-Type' : 'application/json',
				    									}
														}).success(function(res) {
														if(res.length!=0){
														for(var i = 0;i<res.length;i++){
															$scope.res = res[i];
															$scope.songs[i] =$scope.res.recording_name;
															$scope.song_img[i] = $scope.res.recording_pic_url;
															$scope.song_color[i] = $scope.res.recording_color;
															$scope.recording_id[i] =$scope.res.recording_id; 
															$scope.assigned_song_id[i] = $scope.res.song_id;
															$scope.assigned_song_id = $scope.assigned_song_id;
															
															}
														}else{
															$scope.songs= [];
														}
														
														
														}).error(function(res) {
															alert("error");
														});
			    	
				    							}//end of function to display current recording(song) list under a  particular play list with playlist_id, of a student
				    			
				    			
				    			//function to display other recording(song) of a student
				    			$scope.getRecordingList = function(id) {
				    				//id is the playlist_id
				    				//checking default play list id or selected play list id
				    				if($scope.playlist1 > 0){
				    					id = $scope.playlist1;
				    					
				    				}else{
				    					id = id;
				    				}
					    			//empty other recording and song arrays when changing play list options
				    				$scope.other_songs = [];
				    				$scope.other_recording_id = [];
				    				$scope.other_song_img = [];
				    				$scope.other_song_color = [];
					    				
				    						$http({
				    									url :URL
				    									+'/webapi/playlist/fetchRecordings/'+id,
					    									method : "POST",
					    									headers : {
					    									'Content-Type' : 'application/json',
					    									}
															}).success(function(res) {
																//console.log(res);
																var no_of_object = res.length;	
													        	var appendData = '';
													        	$('#recordingCheckbox').empty();
													        	if(no_of_object == 0){
													        		appendData += 'No data found';
													        	}else {
																for(var i = 0;i<res.length;i++){
																	$scope.res = res[i];
																	$scope.other_songs[i] =$scope.res.recording_name;
																	$scope.other_recording_id[i] = $scope.res.recording_id;
																	$scope.other_song_img[i] =  $scope.res.recording_pic_url;
																	console.log($scope.other_song_img);
																	$scope.other_song_color[i] = $scope.res.recording_color;
																	appendData += '<input type="checkbox" name="recordingBox" value="'+res[i]['recording_id']+'"> &nbsp;'+res[i]['recording_name']+'<br>';
																}
																	
														        	
														        	}
														        	
														        	$('#recordingCheckbox').append(appendData);
																
															}).error(function(res) {
																alert("error");
															});
				    	
					    							}//end of function to display other recording(song) of a student
				    			
				    			//function to assign a recording to a playlist of a student
								$scope.createPlaylistRecordingMapping = function(recording_id) {
									//checking default play list id or selected play list id
									if($scope.playlist1 > 0){
										playlistID = $scope.playlist1;
									}else{
										playlistID = playlistID;
									}
									
									
									
									$scope.selected = [];
									$scope.selected.push(recording_id);
									if($scope.selected.length != 0) {
										$http({
											url : URL+'/webapi/playlist/recordingPlaylistMapping/'+playlistID,
											method : "POST",
											headers : {
												'Content-Type' : 'text/plain',
												},
											data: ''+$scope.selected.join(','),
										}).success(function(res) {
											
											window.location.reload();
									        }).error(function() {
									        	window.location.reload();
										});
									}
									$scope.getCurrentRecordingList(playlistID);
									
								}//end of function to assign a recording to a playlist of a student
					
				    			
							 var recordingID = '';
							//function to edit recording assigned to a student by the logged in teacher
							 $scope.editRecording = function(id,name,color,url,sid,song_name,composer) {
								
								//hide the list of recordings in the "edit song" modal to (list of songs is shown in the "create new song" modal)
								$('.option_class').addClass("hidden");
								//hide the down arrow in the "edit recording" modal
								$("select").addClass("select_class");
								$('#songlist2').append('<option value="'+sid+'">'+song_name+'</option>');
								$scope.song_name = song_name;
								$scope.song_composer = composer;
							 	recordingID = id;
							 	$('#songlist2').val(sid);
							 	$('#recordingName2').val(name);
							 	$('#recordingColor2').val(color);
							 	$('#recordingPicURL2').val(url);
							 	$('#edit_record_id').val(recordingID);
							 	
							 	
							 }//end of function to edit recording assigned to a student by the logged in teacher

							 
							//function to save edited recording assigned to a student  list by the teacher
							 $scope.saveEditedRecording = function()  {
								 //checking  default student or selected student id
								 if($scope.id1 > 0){
										student_id = $scope.id1;
									}else{
										
										student_id = student_id;
									}
							 	
								 $http({
							 		url : URL+'/webapi/recording/edit/'+recordingID,
							 		method : "POST",
							 		headers : {
										'Content-Type' : 'application/json',
										},
										async: false,
							 		data: JSON.stringify({
							 			recording_name:$('#recordingName2').val(),
							 			recording_pic_url: $('#recordingPicURL2').val() ,
							 			recording_color: $('#recordingColor2').val() ,
							 			song_id: $('#songlist2').val() 
							 			
							         }),
								 }).success(function(res) {
									 //alert("success");
											
									        }).error(function() {
									        	 //alert("error");
									        	window.location.reload();
									        	
										});
							 	
							 	$('#recordingEditForm').modal('toggle');
							 	
							 	$scope.getCurrentRecordingList(student_id);
							 	$scope.recordingList();
							 }//end of function to save edited recording assigned to a student  list by the teacher
							 
							 
			    			//function to the get the song details(raaga,singer,composer) of the recording assigned to a student
			    			function search(nameKey, myArray){
			    				
							    for (i=0;i < myArray.length; i++) {
							    	
							        if (myArray[i].song_id === nameKey) {
							            return myArray[i];
							            
							        }  
							             
							    }
							   
							    }//end of function to the get the song details of the recording assigned to a student
			    			
			    			
			    			//function to get all the songs of all students
							$scope. recordingList  = function() {
								
								$scope.assigned_song_name = [];
								$scope.assigned_song_composer = [];
								$scope.assigned_song_raaga = [];
								$scope.assigned_song_taal = [];
								$scope.assigned_song_singer = [];
								
								
								$http({
									url : URL+'/webapi/recording/fetchall',
									method : "POST",
									headers : {
									'Content-Type' : 'application/json',
									}
								}).success(function(res) {
									
									for(var i = 0;i<res.length;i++){
										
										$scope.res = res[i];
										$scope.search_array.push($scope.res);
										
										for(var j = 0;j<$scope.assigned_song_id.length;j++){
											//search function is for getting the song details from song object using song_id which we get the recording object
											$scope.resultObject[j] = search($scope.assigned_song_id[j], $scope.search_array);
											
											
										}
									
									}
									//get the song,raaga,taala, singer,composer from the filtered array "resultObject"
									for(var k = 0;k< $scope.resultObject.length;k++){
										$scope.assigned_song_name[k] = $scope.resultObject[k].song_name;
										$scope.assigned_song_composer[k] = $scope.resultObject[k].song_composer;
										
										$scope.assigned_song_raaga[k] = $scope.resultObject[k].song_raaga;
										$scope.assigned_song_taal[k] = $scope.resultObject[k].song_taal;
										$scope.assigned_song_singer[k] = $scope.resultObject[k].song_singer;
										
										}
							       
								}).error(function(res){
									
								});
							}//end of function to get all the songs of all students
							
							
							//function to display recording name list in the new song creation modal
							$scope.getSongList = function() {
								
								$('#songlist').empty();
								
		    	
										$http({
												url :URL
												+'/webapi/song/fetchall',
												method : "POST",
												headers : {
												'Content-Type' : 'application/json',
												}
												}).success(function(res) {
												//console.log(res);
													
												for(var i = 0;i<res.length;i++){
													//$('#songlist').append('<option value="'+res[i]['song_id']+'">'+res[i]['song_name']+'</option>');
									        		//$('#songlist2').append('<option value="'+res[i]['song_id']+'">'+res[i]['song_name']+'</option>');
													//$scope.resultObject = search($scope.assigned_song_id, $scope.res);
													$scope.res = res[i];
													$scope.res_all_songs[i] =$scope.res.song_name;
													$scope.singer[i] = $scope.res.song_singer;
													
											//append the list of songs in the create new song modal
							        		$('#songlist').append('<option value="'+res[i]['song_id']+'">'+res[i]['song_name']+'</option>');
							        		$('#songlist2').append('<option class="option_class" value="'+res[i]['song_id']+'">'+res[i]['song_name']+'</option>');
							        		
							        		//display the first song name as the default recording name in the new recording creation modal
							        		$scope.default_recording = res[0]['song_name'];
										}
								
									}).error(function(res) {
										alert("error");
									});

							}//end of function to display recording name list in the new song creation modal
			
							
							//function to set the song name in the recording name box as default in the new record creation modal
							$('#songlist').on('change',function(){
								
								   var optionsText = this.options[this.selectedIndex].text;
								   $scope.default_recording = optionsText;
								   $('#recordingName').val($scope.default_recording).trigger('input');
								   
							});
							//end of function to set the song name in the recording name box as default in the new record creation modal
							
							//function to set the song name in the recording name box as default in the new record creation modal
							$('#songlist').on('change',function(){
								
								   var optionsText = this.options[this.selectedIndex].text;
								   $scope.default_recording = optionsText;
								   $('#recordingName').val($scope.default_recording).trigger('input');
								   
							});
							//end of function to set the song name in the recording name box as default in the new record creation modal
							
							$scope.playlist_pic = function(){
								$('#fileForm').attr('disabled', 'disabled');
								$('.fileForm_class').attr('disabled', 'disabled');
							}
							$scope.upload_pic = function(){
								$('#playlistPicURL').attr('disabled', 'disabled');
								$('#playlistPicURL2').attr('disabled', 'disabled');
								$('#recordingPicURL1').attr('disabled', 'disabled');
								$('#recordingPicURL2').attr('disabled', 'disabled');
								
							}
						//function to create new song under a recording by the logged in teacher
						$scope.recordingProfileSubmit = function(){
							
							
							
							
							if(playlist_nameArray.indexOf($('#playlistName').val()) != -1) {
								
								alert('Name already Exists');
							}
							else {
									$http({
									url : URL+'/webapi/recording/create',
									method : "POST",
									headers : {
											'Content-Type' : 'application/json',
											},
											async: false,
											data: JSON.stringify({
												recording_name:$('#recordingName').val(),
												recording_pic_url: $('#recordingPicURL').val() ,
												recording_color: $('#recordingColor').val() ,
												song_id: $('#songlist').val()
											}),
									}).success(function() {
										//alert("Recording created successfully");
										$('#song_Modal').modal('hide');
										window.location.reload();
										
										
									}).error(function() {
										
										$('#song_Modal').modal('hide');
										window.location.reload();
										//alert("error");
									}); 
								}
							}//end of function to create new song under a recording by the logged in teacher
						
						
						
						
						//function to remove song from a play list  which was assigned to a student by the logged in teacher
						$scope.deletePlaylistRecordingMapping = function(name,recording_id){
							//checking default or selected play list id
							if($scope.playlist1 > 0){
								playlistID =$scope.playlist1; 
							}else{
								playlistID = playlistID;
							}
							$scope.selected = [];
							$scope. selected.push(recording_id);
							if($scope.selected.length != 0) {
							
								if (confirm("Do you want to remove "+name+" ?") == true) {
									
									$http({
										
										url : URL+'/webapi/playlist/deleteRecordingPlaylistMapping/'+playlistID,
										method : "POST",
										headers : {
											'Content-Type' : 'text/plain',
												},
												data: ''+$scope.selected.join(','),
									}).success(function() {
										
								        }).error(function() {
								        	
									});
							    } 
							}
							window.location.reload();
							$scope.getCurrentRecordingList(playlistID);
							$scope.getRecordingList(playlistID);
							$scope.recordingList();
							      	
							}//function to remove song from a play list  which was assigned to a student by the logged in teacher
			    			
						}//end of doOnload function
			
			
			
			
			//function to call the student activities function based on the selected student in the student activities modal
			$scope.student_select_change = function (){
				
				
				$scope.getAllActivity(document.getElementById("student_select").value);
				
			}//end of function to call the student activities function based on the selected student in the student activities modal
			
				
			//function to display all and selected students activities in the modal
			$scope.getAllActivity = function (student_pk){
				
				var showName = document.getElementById("namecheckbox").checked;
				
				if(showName){
					
					//show student name
					if(student_pk == 0){
						var url = URL + '/webapi/studentActivity/getAllActivityWithName/'+uid;
					}else {
						
						var url = URL+'/webapi/studentActivity/getActivityWithName/'+student_pk;
					}
					
				}else{
					
					//no show student name
					if(student_pk == 0){
						
						var url = URL + '/webapi/studentActivity/getAllActivityWOName/'+uid;
					}else {
						
						var url = URL+'/webapi/studentActivity/getActivityWOName/'+student_pk;
					}
				}
					
				$http({
					url : url,
					method : "POST",
					headers : {
						'Content-Type' : 'application/json',
						}
				}).success(function(res) {
						if(res.length == 0){
							
							//No Activity
							$('#activity_Display_heading').empty();
							$('#activity_Display_body').empty();
							last_fetched_data = null;
							document.getElementById('no_activity_display').style.display = 'block';
							document.getElementById('activity_Display').style.display = 'none';
						}else{
							
							$('#activity_Display_heading').empty();
							$('#activity_Display_body').empty();
							last_fetched_data = res;
							document.getElementById('no_activity_display').style.display = 'none';
							document.getElementById('activity_Display').style.display = 'block';
							if(showName){
								//with name
								$('#activity_Display_heading').append('<tr>'+
									'<th>Student Key</th>'+
									'<th>Student Name</th>'+
									'<th>Recording</th>'+
									'<th>Activity Type</th>'+
									'<th>Activity Time on song</th>'+
									'<th>Activity Time</th>'+
									'</tr>');
								for(var i=0 ; i < res.length ; i++){
									$('#activity_Display_body').append('<tr>'+
										'<td>'+res[i]['student_pk']+'</td>'+
										'<td>'+res[i]['student_name']+'</td>'+
										'<td>'+res[i]['recording_name']+'</td>'+
										'<td>'+res[i]['student_activity_type']+'</td>'+
										'<td>'+res[i]['student_activity_time']+'</td>'+
										'<td>'+res[i]['student_activity_timestamp']+'</td>'+
										'</tr>');
								}
							}else{
								//without name
								$('#activity_Display_heading').append('<tr>'+
									'<th>Student Key</th>'+						
									'<th>Recording</th>'+
									'<th>Activity Type</th>'+
									'<th>Activity Time on song</th>'+
									'<th>Activity Time</th>'+
									'</tr>');
								for(var i=0 ; i < res.length ; i++){
									$('#activity_Display_body').append('<tr>'+
										'<td>'+res[i]['student_pk']+'</td>'+
										'<td>'+res[i]['recording_name']+'</td>'+
										'<td>'+res[i]['student_activity_type']+'</td>'+
										'<td>'+res[i]['student_activity_time']+'</td>'+
										'<td>'+res[i]['student_activity_timestamp']+'</td>'+
										'</tr>');
								}
							}
						}
					}).error(function() {
						//alert("Error");
					}); 
					
				}//end of function to display all and selected students activities in the modal
			
			
					 //old design code-
					 //$scope.mystudent_link = true;
					 //$scope.mystudent1 = true;
					 //$scope.create_button = true;
					 //$scope.activity_info = false;
					 //$scope.mystudent_link = true;
	            	 //$scope.mystudent_list = true;
	            	 //$scope.otherStudent = true;
        			 //$scope.otherPlaylist = true;
        			 //$scope.otherSongs = true;
					 //$scope.play_button1 = true;
					 //$scope.pause_button1 = false;
					 //$scope.play_button2 = true;
					 //$scope.pause_button2 = false;
					 //$scope.play_button3 = true;
					 //$scope.pause_button3 = false;
			 		 //$scope.mystudent_list = true;
            	 	 //$scope.new_playlist = true;
				 	 //$scope.new_song = true;
            	 	 //$scope.mystudent1 = true;
            		 //$scope.create_button = true;
            		 //$scope.activity_info = false;
				 	 //$scope.mystudent_link = true;
            	 	 //$scope.mystudent_list = true;
            	 	 //$scope.mystudents = false;
			
					 /*$scope.showAll2 = function () {
			  		$scope.new_song = false;
            		$scope.new_playlist = true;
            		$scope.create_button = true;
				 	$scope.mystudent1 = true;
				 	$scope.activity_info = true;
				 	$scope.mystudent_link = true;
            	 	$scope.mystudent_list = true;
            	 	$scope.mystudents = false;
                	}*/

            		/*$scope.showAll3 = function () {
        			$scope.new_playlist = false;
        			$scope.new_song = true;
        			$scope.mystudent1 = true;
        			$scope.create_button = true;
				 	$scope.activity_info = true;
				 	$scope.mystudent_link = true;
            	 	$scope.mystudent_list = true;
            	 	$scope.mystudents = false;
            		}*/
            		/*$scope.showAll4 = function () {
        			$scope.mystudent1 = false;
        			$scope.mystudent_link = false;
        			$scope.mystudent_list = false;
        			$scope.new_playlist = false;
        			$scope.new_song = false;
        			$scope.otherStudent = false;
					$scope.otherPlaylist = false;
					$scope.otherSongs = false;
        			$scope.mystudents = true;
            		}*/
			
					/*$scope.loadplayList = function () {
					
		    		$scope.showModal1 = true;
						
					}*/
					/*$scope.songProfileForm = function () {
						
		    		$scope.showModal2 = true;
						
					}*/
			
					/*$scope.play1 = function () {
					
					$scope.play_button1 = false;
		    		$scope.pause_button1 = true;
		    			
					}
					$scope.pause1 = function () {
					$scope.pause_button1 = false;
					$scope.play_button1 = true;
		    			
					}
		
					$scope.play2 = function () {
						
					$scope.play_button2 = false;
		    		$scope.pause_button2 = true;
		    			
					}
					$scope.pause2 = function () {
					$scope.pause_button2 = false;
					$scope.play_button2 = true;
		    			
					}
					$scope.play3 = function () {
						
					$scope.play_button3 = false;
		    		$scope.pause_button3 = true;
		    			
					}
					$scope.pause3 = function () {
					$scope.pause_button3 = false;
					$scope.play_button3 = true;
		    			
					}*/
			
					$scope.mystudents = true;
					$scope.student = true;
            		//end of old design code-	
					
					//function to download data from the activities modal
					$scope.downloadData = function () {
						
						$("#dummy").excelexportjs({
							  containerid: "dummy",
							  datatype: 'json',
							  dataset: last_fetched_data, 
							  columns: getColumns(last_fetched_data)     
							});
						
					}//end of function to download data from the activities modal

            			$scope.logout = function () {
            			
            				window.location.href = "index.html";
            				localStorage.clear();
            			}
            			
            			$scope.close = function () {
            				
                		//$scope.showModal1 = false;
                		//$scope.showModal2 = false;
            				$('#playlist_Modal').modal('hide');
                			$('#song_Modal').modal('hide');
                			window.location.reload();
            				
            			}
            			
            			
            			$scope.visualPage = function(){
            				window.location.href = "visual3.html";
            			}


				});//end of app.controller function