
function recordingList() {
	//alert("in recording");
	$.ajax({
		url : URL+'/webapi/recording/fetchall',
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
       //alert("in success");
        	var no_of_object = data.length;	
			var tdata = '<thead>'+
					        '<tr>'+
					            '<th>Recording Name</th>'+
					            '<th>Recording color</th>'+
					            '<th>Picture </th>'+
					            '<th>Song Name</th>'+
					            '<th>Edit</th>'+
					            '<th>Delete</th>'+
					        '</tr>'+
					    '</thead>';
			$('#recordingList').empty();
			if(no_of_object == 0) {
				tdata += '<tfoot><tr><td> No data found </td></tr></tfoot>';
			}
			else {
				for (var i = 0; i < no_of_object; i++) {
					var recording_name = data[i]['recording_name'];
					var recording_color = data[i]['recording_color'];
					var recording_pic_url = data[i]['recording_pic_url'];
					var recording_id = data[i]['recording_id'];
					var song_name = data[i]['song_name'];
					var song_id = data[i]['song_id'];
					recording_pic_url = recording_pic_url.replace("https://drive.google.com/uc?export=download&id=","https://drive.google.com/uc?id=")
					tdata += '<tr><td>'+recording_name+'</td>'+
								'<td bgcolor="'+recording_color+'"</td>'+
								'<td><img src="'+recording_pic_url+'" style="width:100px;height:50px;"></td>'+
								'<td>'+song_name+'</td>'+
								'<td><a href="#recordingEditForm" data-toggle="modal" onclick="editRecording(\''+recording_id+'\',\''+recording_name+'\',\''+recording_color+'\',\''+recording_pic_url+'\',\''+song_id+'\')">click here</a></td>'+
								'<td><a href onclick="deleteRecording(\''+recording_id+'\',\''+recording_name+'\')">click here</a></td></tr>';
				}
			}
			//alert(recording_name);
			$('#recordingList').append(tdata);
        }
	});
}


function clearfield(){
	$("#recordingName").val("");
	$('#recordingPicURL').val("");
	
}
function displayonTextField(){
	var str = "";
		  $( "select option:selected" ).each(function(index){
			  if (index==0) {
			  	str +=$( this ).text() + " ";
			  }
		  });
		  console.log(str);
		  $("#recordingName").val(str);
}
function displayonTextField2(){
	var str = "";
		  $( "select option:selected" ).each(function(index){
			  if (index==1) {
				  	str +=$( this ).text() + " ";
				  }
		  });
		  console.log(str);
		  $("#recordingName2").val(str);
}
function getSongList()
{
	console.log("Get song list called");
	var uri="webapi/song/fetchall";
	$('#songlist').empty();
	$('#songlist2').empty();
	$('#songlist').append('<option hidden="true">Select Song</option>');
	$.ajax({
		url : uri,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success : function(data){
        	console.log(data);
        	for(var i=0 ; i<data.length ; i++){
        		$('#songlist').append('<option value="'+data[i]['song_id']+'">'+data[i]['song_name']+'</option>');
        		$('#songlist2').append('<option value="'+data[i]['song_id']+'">'+data[i]['song_name']+'</option>');
        	}
        }
	});
}

function recordingProfileSubmit()
{
	console.log("In recording Profile Submit");
	var uri="webapi/recording/create";
	$.ajax({
		url : uri,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			recording_name:$('#recordingName').val(),
			recording_pic_url: $('#recordingPicURL').val() ,
			recording_color: $('#recordingColor').val() ,
			song_id: $('#songlist').val()
        }),
        success: function(data){
        	alert("Recording created successfully");
        	clearfield();
        }
	});
	
	$('#recordingProfileForm').modal('toggle');
	//recordingList();
}

function deleteRecording(id,name) {
	var uri="webapi/recording/delete/"+id;
	if (confirm("Do you want to delete "+name+" ?") == true) {
		$.ajax({
			url : uri,
			type : 'POST',
			dataType : 'json',
			contentType: 'application/json',
			async: false,
	        success: function(data){
	        }
		});
    } 
	//recordingList();
      	
}
function HEX_rgb (hex){
    var a = 'rgb(' + parseInt(hex.substring(0,2), 16) + ", " + parseInt(hex.substring(2,4), 16) + ", " + parseInt(hex.substring(4,6), 16) + ')';
    return a;
}

var recordingID = '';
function editRecording(id,name,color,url,sid) {
	recordingID = id;
	$('#songlist2').val(sid);
	$('#recordingName2').val(name);
	$('#recordingColor2').val(color);
	$('#recordingPicURL2').val(url);
	document.getElementById('recordingColor2').jscolor.valueElement.style.backgroundColor = HEX_rgb(color);	
}

function saveEditedRecording()  {
	var uri="webapi/recording/edit/"+recordingID;
	$.ajax({
		url : uri,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			recording_name:$('#recordingName2').val(),
			recording_pic_url: $('#recordingPicURL2').val() ,
			recording_color: $('#recordingColor2').val() ,
			song_id: $('#songlist2').val() 
			
        }),
        success: function(data){
        }
	});
	$('#recordingEditForm').modal('toggle');
	//recordingList();
}