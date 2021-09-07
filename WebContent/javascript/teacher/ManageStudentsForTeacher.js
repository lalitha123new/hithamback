

function loadStudentForTeacherList() {
	alert("in studentList");
	$.ajax({
		url : URL+'/webapi/teacher/fetchAssignedStudents/'+uid,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert(data.length);
        	console.log(data);
        	var list_for_activity = '<option value="0">All</option>';
        	var no_of_object = data.length;	
			var tdata = '<thead>'+
					        '<tr>'+
					            '<th>Name</th>'+
					            '<th>Username</th>'+
					            '<th>Profile</th>'+
					            '<th>Current Playlist</th>'+
					            '<th>Assign New Playlist</th>'+
					        '</tr>'+
					    '</thead>';
			//$('#studenttable').empty();
			if(no_of_object == 0) {
				tdata += '<tfoot><tr><td> No data found </td></tr></tfoot>';
			}
			else {
				for (var i = 0; i < no_of_object; i++) {
					var student_id = data[i]['student_id'];
					var student_name = data[i]['student_name'];
					var student_profile = data[i]['student_profile'];
					
					var student_pk = data[i]['student_pk'];
					tdata += '<tr><td>'+student_name+
								'</td><td>'+student_id+
								'</td><td>'+student_profile+
								'</td><td><a  href="#currentPlaylistForm" data-toggle="modal" onclick="getCurrentplaylist(\''+student_pk+'\')">click here</a></td>'+
								'<td><a  href="#playlistAssignForm" data-toggle="modal" onclick="getRemainingPlaylist(\''+student_pk+'\')">click here</a></td></tr>';
				//alert(tdata);
					list_for_activity += '<option value="'+student_pk+'">'+student_name+'</option>';
				}
			}
			
			$('#studenttable').append(tdata);
			$('#student_select').append(list_for_activity);
        }
	});
}

var studentID = '';
function getRemainingPlaylist(id) {
	//alert(id);
	studentID = id;
	$.ajax({
		url : URL+'/webapi/playlist/fetchForStudent/'+id,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert(data);
        	var no_of_object = data.length;	
        	var appendData = '';
        	$('#playlistCheckbox').empty();
        	if(no_of_object == 0){
        		appendData += 'No data found';
        	}
        	else {
        		for(var i = 0; i < no_of_object; i++) {
            		appendData += '<input type="checkbox" name="playlistBox" value="'+data[i]['playlist_id']+'"> &nbsp;'+data[i]['playlist_name']+'<br>';
            	}
        	}
        	
        	
        	$('#playlistCheckbox').append(appendData);
        }
	});
	
	
}


function createPlaylistStudentMapping() {
	alert(studentID);
	var selected = [];
	$('#playlistCheckbox input:checked').each(function() {
	    selected.push($(this).attr('value'));
	});
	//alert( selected.join(',') +' '+ teacherID);
	if(selected.length != 0) {
		$.ajax({
			url : URL+'/webapi/playlist/studentPlaylistMapping/'+uid+'/'+studentID,
			type : 'POST',
			dataType : 'text',
			contentType: 'text/plain',
			async: false,
			data: ''+selected.join(','),
	        success: function(data){
	        }
		});
	}
	$('#playlistAssignForm').modal('toggle');
}


function getCurrentplaylist(id) {
	studentID = id;
	$.ajax({
		url : URL+'/webapi/playlist/assignedForStudent/'+id,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert(data);
        	var no_of_object = data.length;	
        	var appendData = '';
        	$('#currentList').empty();
        	if(no_of_object == 0){
        		appendData += 'No data found';
        	}
        	else {
        		for(var i = 0; i < no_of_object; i++) {
            		appendData += '<input type="checkbox" name="deleteplaylistBox" value="'+data[i]['playlist_id']+'"> &nbsp;'+data[i]['playlist_name']+'<br>';
            	}
        	}
        	
        	
        	$('#currentList').append(appendData);
        }
	});
	
}

function deletePlaylistStudentMapping() {

	var selected = [];
	$('#currentList input:checked').each(function() {
	    selected.push($(this).attr('value'));
	});
	//alert( selected.join(',') +' '+ teacherID);
	if(selected.length != 0) {
		
		if (confirm("Do you want to delete ?") == true){
			$.ajax({
				url : URL+'/webapi/playlist/deleteMapping/'+studentID,
				type : 'POST',
				dataType : 'text',
				contentType: 'text/plain',
				async: false,
				data: ''+selected.join(','),
		        success: function(data){
		        }
			});
		}
	}
	$('#currentPlaylistForm').modal('toggle');
}

