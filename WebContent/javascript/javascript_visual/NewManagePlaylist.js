var playlist_nameArray = [];
// create playlist profile
function HEX_rgb (hex){
    var a = 'rgb(' + parseInt(hex.substring(0,2), 16) + ", " + parseInt(hex.substring(2,4), 16) + ", " + parseInt(hex.substring(4,6), 16) + ')';
    return a;
}
function playlistProfileSubmit() {
	if(playlist_nameArray.indexOf($('#playlistName').val()) != -1) {
		alert('Name already Exists');
	}
	else {
		$.ajax({
			url : '/webapi/playlist/create',
			type : 'POST',
			dataType : 'json',
			contentType: 'application/json',
			async: false,
			data: JSON.stringify({
				playlist_name:$('#playlistName').val(),
				playlist_pic_url: $('#playlistPicURL').val() ,
				playlist_color: $('#playlistColor').val() ,
				teacher_pk:uid
		
	        }),
	        success: function(data){
	        }
		});
		$('#playlistProfileForm').modal('toggle');
		loadplayList();
	}
}


//load playlistList

function loadplayList() {
	//alert("in playlistList");
	$.ajax({
		url : URL+'/webapi/playlist/fetch/'+uid,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
       //alert("in success");
        	var no_of_object = data.length;	
			var tdata = '<thead>'+
					        '<tr>'+
					            '<th>Name</th>'+
					            '<th>Playlist Color</th>'+
					            '<th>Picture</th>'+
					            '<th>Edit</th>'+
					            '<th>Delete</th>'+
					            '<th>Current Recordings</th>'+
					            '<th>Assign New Recording</th>'+
					        '</tr>'+
					    '</thead>';
			$('#playlisttable').empty();
			playlist_nameArray = [];
			if(no_of_object == 0) {
				tdata += '<tfoot><tr><td> No data found </td></tr></tfoot>';
			}
			else {
				for (var i = 0; i < no_of_object; i++) {
					var playlist_id = data[i]['playlist_id'];
					var playlist_name = data[i]['playlist_name'];
					var playlist_color = data[i]['playlist_color'];
					var playlist_pic_url = data[i]['playlist_pic_url'];
					
					playlist_nameArray.push(playlist_name);
					
					tdata += '<tr><td>'+playlist_name+
					'</td><td bgcolor="'+playlist_color+'">'+
					'</td><td><img src="'+playlist_pic_url+'" style="width:100px;height:50px;">'+
								'</td><td><a href="#playlistEditForm" data-toggle="modal" onclick="editplaylist(\''+playlist_id+'\',\''+playlist_name+'\',\''+playlist_color+'\',\''+playlist_pic_url+'\')">click here</a></td>'+
								'</td><td><a href onclick="deleteplaylist(\''+playlist_name+'\',\''+playlist_id+'\')">click here</a></td>'+
								'</td><td><a href="#currentRecordingsForm" data-toggle="modal" onclick="getCurrentRecordingList(\''+playlist_id+'\')">click here</a></td>'+
								'</td><td><a href="#recordingAssignForm" data-toggle="modal" onclick="getRecordingList(\''+playlist_id+'\')">click here</a></td></tr>';
				}
			}
			//alert(playlist_nameArray);
			$('#playlisttable').append(tdata);
        }
	});
}


/*
 * function to delete song record by admin.
 */

function deleteplaylist(name,id) {
	//alert('in edit'+URL+'/webapi/playlist/delete/'+id);
	if (confirm("Do you want to delete "+name+" ?") == true) {
		$.ajax({
			url : URL+'/webapi/playlist/delete/'+id,
			type : 'POST',
			dataType : 'json',
			contentType: 'application/json',
			async: false,
	        success: function(data){
	        }
		});
    } 
	//loadplayList();
      	
}

var playlistID;
function editplaylist(sid,name,color,url) {
	playlistID = sid;
	$('#playlistName2').val(name);
	$('#playlistColor2').val(color);
	$('#playlistPicURL2').val(url);
	document.getElementById('playlistColor2').jscolor.valueElement.style.backgroundColor = HEX_rgb(color);
	
}

function saveEditedplaylist()  {
//	alert('in edit'+URL+'/webapi/playlist/edit/'+playlistID);
	$.ajax({
		url : URL+'/webapi/playlist/edit/'+playlistID,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			playlist_name:$('#playlistName2').val(),
			playlist_pic_url: $('#playlistPicURL2').val() ,
			playlist_color: $('#playlistColor2').val()
			
        }),
        success: function(data){
        }
	});
	$('#playlistEditForm').modal('toggle');
//	loadplayList();
}


function getRecordingList(id) {
	//alert(id);
	playlistID = id;
	$.ajax({
		url : URL+'/webapi/playlist/fetchRecordings/'+id,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert(data);
        	var no_of_object = data.length;	
        	var appendData = '';
        	$('#recordingCheckbox').empty();
        	if(no_of_object == 0){
        		appendData += 'No data found';
        	}
        	else {
        		for(var i = 0; i < no_of_object; i++) {
            		appendData += '<input type="checkbox" name="recordingBox" value="'+data[i]['recording_id']+'"> &nbsp;'+data[i]['recording_name']+'<br>';
            	}
        	}
        	
        	
        	$('#recordingCheckbox').append(appendData);
        }
	});
	
	
}


function createPlaylistRecordingMapping() {
	var selected = [];
	$('#recordingCheckbox input:checked').each(function() {
	    selected.push($(this).attr('value'));
	});
	//alert( selected.join(',') +' '+ teacherID);
	if(selected.length != 0) {
		$.ajax({
			url : URL+'/webapi/playlist/recordingPlaylistMapping/'+playlistID,
			type : 'POST',
			dataType : 'text',
			contentType: 'text/plain',
			async: false,
			data: ''+selected.join(','),
	        success: function(data){
	        }
		});
	}
	$('#recordingAssignForm').modal('toggle');
}



function getCurrentRecordingList(id) {
	playlistID = id;
	$.ajax({
		url : URL+'/webapi/playlist/fetchAssignedRecordings/'+id,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert(data);
        	var no_of_object = data.length;	
        	var appendData = '';
        	$('#currentRecordingList').empty();
        	if(no_of_object == 0){
        		appendData += 'No data found';
        	}
        	else {
        		for(var i = 0; i < no_of_object; i++) {
        			appendData += '<input type="checkbox" name="deleterecordingBox" value="'+data[i]['recording_id']+'"> &nbsp;'+data[i]['recording_name']+'<br>';
            	}
        	}
        	$('#currentRecordingList').append(appendData);
        }
	});
	
}


function deletePlaylistRecordingMapping() {

	var selected = [];
	$('#currentRecordingList input:checked').each(function() {
	    selected.push($(this).attr('value'));
	});
	//alert( selected.join(','));
	if(selected.length != 0) {
		
		if (confirm("Do you want to delete ?") == true){
			$.ajax({
				url : URL+'/webapi/playlist/deleteRecordingPlaylistMapping/'+playlistID,
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
	$('#currentRecordingsForm').modal('toggle');
}













//// create new playlist--------------------------------------------------start
//function createNewPlayList() {
//	var selectedoption = document.getElementById("playlist_name").value;
//		$.ajax({
//			url : URL+'/webapi/playlist/create',
//			type : 'POST',
//			contentType: 'application/json',
//			dataType : 'json',
//			async: false,
//			data: JSON.stringify({
//				playlist_name:selectedoption
//	        }),
//	        complete : function(request, textStatus, errorThrown){
//	        	$('#playlistmodal').modal('toggle');
//	        }
//		});
//		$('#playlistmodal').modal('toggle');
//		loadPlayList();
//}
//
//// create new playlist-------------------------------------------------------end
//
//
////add song to playlist------------------------------------------------------------------ start
////
////
//
//function assignSongToPlayListFormSubmit() {
//	$.ajax({
//		url : URL+'/webapi/playlist/songassign/'+$('#songListSelect').val()+'/'+$('#playListSelect3').val(),
//		type : 'POST',
//		dataType : 'json',
//		contentType: 'application/json',
//		async: false,
//		data: {},
//        success: function(data){
//        }
//	});
//	displaySongs();
//}
//
////load playlists
//function loadPlayList() {
//	$.ajax({
//		url : URL+'/webapi/playlist/display',
//		type : 'GET',
//		dataType : 'json',
//		success : function(data) {
//			var no_of_object = data.length;	
//			var query3 = '<select id="playListSelect3" style="width:150px" onchange="displaySongs()"> ';
//			$('#selectPlayList3').empty();
//			for (var i = 0; i < no_of_object; i++) {
//				var playlist_id = data[i]['playlist_id'];
//				var playlist_name = data[i]['playlist_name'];
//				query3 += '<option value ="'+playlist_id+'">'+playlist_name+'</option>';
//			}
//			query3 += '</select>';
//			$('#selectPlayList3').append(query3);
//		}
//	});
//	
//}
//
//
////for displaying song to playlist according to playlist
//function displaySongs() {
//	$.ajax({
//		url : URL+'/webapi/playlist/displaysong/'+$('#playListSelect3').val(),
//		type : 'GET',
//		dataType : 'json',
//		async: false,
//		success : function(data) {
//			var no_of_object = data.length;	
//			
//			var query = '<label class="control-label col-sm-3">SongList</label>'+
//			'<div class="col-sm-4" >'+
//			'<select id="songListSelect"> ';
//			$('#selectSongList1').empty();
//			for (var i = 0; i < no_of_object; i++) {
//				var songlist_id = data[i]['songlist_id'];
//				var songlist_name = data[i]['songlist_name'];
//				query += '<option value ="'+songlist_id+'">'+songlist_name+'</option>';
//			}
//			
//			if(no_of_object === 0)
//				query += '<option value ="NULL">None</option>';
//			query += '</select></div>';
//			$('#selectSongList1').append(query);
//		}
//	});
//	
//}
//
//
////
////
////add song to playlist ------------------------------------ end
//
