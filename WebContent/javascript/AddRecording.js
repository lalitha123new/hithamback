//$(function(){
   // alert("came to here");
   // $('#upload_redcord').click(upload_record);
    
//});

function upload_record(){
	
	//alert("coming");
	//$('#upload_record').attr('disabled', 'disabled');
    var file = $('input[name="upload_file1"]').get(0).files[0];
  //var file = document.getElementById("fileForm").value
   
    
    var recordingName = $('#recordingName').val();
	var recordingColor1 =  $('#recordingColor1').val();
	var recordingPicURL1 =  $('#recordingPicURL1').val();
	var song_id = $('#songlist').val()
	//var teacher_pk = uid;
	console.log(recordingName);
	console.log(recordingPicURL1);
	console.log(file);
	
	if((recordingName != "") && (recordingPicURL1 == "" && file != undefined) || (recordingPicURL1 != "" && file === undefined)){
		
	$('.upload_record').attr('disabled', 'disabled');
	var formData = new FormData();
    formData.append('file', file);
	formData.append('recordingName', recordingName);
	formData.append('recordingColor1', recordingColor1);
	formData.append('recordingPicURL1', recordingPicURL1); 
	formData.append('song_id', song_id);
	
   console.log("form_data : "+formData);
   
    $.ajax({
        url: URL+'/webapi/upload2/uploadRecording',
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
