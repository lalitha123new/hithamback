/*$(function(){
	
    $('#upload_btn_mp3').click(upload_mp3);
    
   // $('#upload_redcord').click(upload_record);
    console.log("checking song");
    
});*/

//upload_mp3_fun
function upload_mp3(){
	
    var file = $('input[name="upload_mp3"]').get(0).files[0];
    
    
    var song_name      = $('#songName').val();
    var song_url       = $('#songURL').val();
    var song_raaga     = $('#songRaaga').val();
    var song_taal      = $('#songTala').val();
    var song_singer    = $('#songSinger').val();
    var song_composer  = $('#songComposer').val();
    
    console.log(song_name);
    console.log(song_url);
    console.log(song_raaga);
    console.log(song_taal);
    console.log(song_singer);
    console.log(song_composer);
    console.log(file);
    
    
    if((song_name != "") && (song_raaga != "") && (song_taal != "") && (song_singer != "") && (song_composer != "") && ((song_url == "" && file != "") || (song_url != "" && file === undefined))){
    
    $('#upload_btn_mp3').attr('disabled', 'disabled');
    var formData = new FormData();
    formData.append('file', file);
    
	formData.append('song_name', song_name);
	formData.append('song_url', song_url);
	formData.append('song_raaga', song_raaga);
	formData.append('song_taal', song_taal);
	formData.append('song_singer', song_singer);
	formData.append('song_composer', song_composer);
	
   
   
   
    $.ajax({
        url: URL+'/webapi/upload2/uploadmp3',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(){
           // alert('file MP3 upload complete');
        	alert('file upload complete');
            $('#songProfileForm').modal('hide');
        	
        	window.location.reload();
            //location.reload();
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

//upload mp3 end

var songID1;
function editsong(sid,name,url,raaga,taal,singer,composer) {
	songID1 = sid;
	$('#songName2').val(name);
	$('#songURL2').val(url) ;
	$('#songRaaga2').val(raaga) ;
	$('#songTala2').val(taal) ;
	$('#songSinger2').val(singer) ;
	$('#songComposer2').val(composer) ;
}




function upload_editSong(){
	
	//alert("- - - - "+songID1);

	    
	   var file = $('input[name="upload_editmp3file1"]').get(0).files[0];
	    var song_name      = $('#songName2').val();
	    var song_url       = $('#songURL2').val();
	    var song_raaga     = $('#songRaaga2').val();
	    var song_taal      = $('#songTala2').val();
	    var song_singer    = $('#songSinger2').val();
	    var song_composer  = $('#songComposer2').val();
	   
	    
	    
	    if((song_name != "") && (song_url == "" && file != "") || (song_url != "" && file === undefined) && (song_raaga != "") && (song_taal != "") && (song_singer != "") && (song_composer != "")){
	        
	    $('#upload_record1').attr('disabled', 'disabled');
	    
	    
	    var formData = new FormData();
	    formData.append('file', file);
	    // alert("song_name--"+song_name);
		formData.append('song_name', song_name);
		formData.append('song_url', song_url);
		formData.append('song_raaga', song_raaga);
		formData.append('song_taal', song_taal);
		formData.append('song_singer', song_singer);
		formData.append('song_composer', song_composer);
    	
  
   
    $.ajax({
        url: URL+'/webapi/upload2/editMp3File/'+songID1,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(){
        	alert('file upload complete');
            $('#songEditForm').modal('hide');
        	
        	window.location.reload();
        	//location.reload();
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

function myFunction1(){
	
	$('.upload_mp3').attr('disabled', 'disabled');
	$('.upload1_mp3').attr('disabled', 'disabled');
	
}
function myFunction2(){
	
	$('.songURL').attr('disabled', 'disabled');
	$('.songURL1').attr('disabled', 'disabled');
	
	
}


function close1(){
	
	$('#songProfileForm').modal('hide');
	$('#songEditForm').modal('hide');
	window.location.reload();
}