$(function(){
    $('#upload_btn').click(upload);
   // $('#upload_redcord').click(upload_record);
    
});

function upload(){
	
	
	
    var file = $('input[name="upload_file"]').get(0).files[0];
  //var file = document.getElementById("fileForm").value
    
    
    
    var playlist_name = $('#playlistName').val();
	var playlist_pic_url =  $('#playlistPicURL').val();
	var playlist_color =  $('#playlistColor').val();
	var teacher_pk = uid;
	if((playlist_name != "") && (playlist_pic_url == "" && file != "") || (playlist_pic_url != "" && file === undefined)){
		
		
		
		
		$('#upload_btn').attr('disabled', 'disabled');
	var formData = new FormData();
    formData.append('file', file);
	
	formData.append('playlist_name', playlist_name);
	formData.append('playlist_pic_url', playlist_pic_url);
	formData.append('playlist_color', playlist_color);
	formData.append('teacher_pk', teacher_pk);
	
   console.log("form_data : "+formData);
   
    $.ajax({
        url: URL+'/webapi/upload2/upload21',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(){
            alert('file upload complete');
            $('#playlist_Modal').modal('hide');
        	
        	window.location.reload();
        },
        error: function(response){
            var error = "error";
            if (response.status === 409){
                
            }else if(response.status === 500){
            	
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
	}else{
		alert("Please fill in all fields");
	}
    
}
//edit playList
function upload_editPlaylist(){
	
		
    var playlistID = $('#student_id_edit').val();
    //alert(playlistID);
    var file = $('input[name="upload_editfile1"]').get(0).files[0];
    var playlist_name = $('#playlistName2').val();
	var playlist_pic_url =  $('#playlistPicURL2').val();
	var playlist_color =  $('#playlistColor2').val();
	console.log(playlist_name);
	console.log(playlist_pic_url);
	console.log(file);
	
	
	if((playlist_name != "") && (playlist_pic_url == "" && file != "") || (playlist_pic_url != "" && file === undefined)){
		
	
	
		
	$('#upload_record1').attr('disabled', 'disabled');
	
    var formData = new FormData();
    formData.append('file', file);
    formData.append('playlist_name', playlist_name);
	formData.append('playlist_pic_url', playlist_pic_url);
	formData.append('playlist_color', playlist_color);
	formData.append('playlist_id', playlistID);
    	
  
   
    $.ajax({
        url: URL+'/webapi/upload2/edit1PL',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(){
        	$('#playlist_Modal').modal('hide');
        	
            alert('file upload complete');
            
        	window.location.reload();
        },
        error: function(response){
            var error = "error";
            if (response.status === 409){
                
            }else if(response.status === 500){
            	
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
	
	}else{
		alert("Please fill in all fields");
	}
}

//edit RecordList
function upload_editRecord(){
	
		
    var recordingID = $('#edit_record_id').val();
    //alert(recordingID);
    var file = $('input[name="upload_editrecord1"]').get(0).files[0];
    
    //alert(file);
    var recording_name = $('#recordingName2').val();
	var	recording_pic_url = $('#recordingPicURL2').val();
	var	recording_color = $('#recordingColor2').val();
	var song_id = $('#songlist2').val(); 
	console.log(recording_name);
	console.log(recording_pic_url);
	console.log(file);
	
	if((recording_name != "") && (recording_pic_url == "" && file != "") || (recording_pic_url != "" && file === undefined)){
		
	$('.upload_record1').attr('disabled', 'disabled');
	
    var formData = new FormData();
    formData.append('file', file);
    formData.append('recording_name', recording_name);
	formData.append('recording_pic_url', recording_pic_url);
	formData.append('recording_color', recording_color);
	formData.append('recordingID', recordingID);
	formData.append('song_id', song_id);
    	
  
   
    $.ajax({
        url: URL+'/webapi/upload2/editRecording',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(){
            alert('file upload complete');
           
        	$('#song_Modal').modal('hide');
        	window.location.reload();
        },
        error: function(response){
            var error = "error";
            if (response.status === 409){
                
            }else if(response.status === 500){
            	
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
	}else{
		alert("Please fill in all fields");
	}
}




function progress(e) {
    if (e.lengthComputable) {
        $('#progress_percent').text(Math.floor((e.loaded * 100) / e.total));
        $('progress').attr({value:e.loaded,max:e.total});
    }
}