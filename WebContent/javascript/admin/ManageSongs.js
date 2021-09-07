
// create song profile
function songProfileSubmit() {
	//alert($('#songURL').val());
		$.ajax({
			url : URL+'/webapi/song/create',
			type : 'POST',
			dataType : 'json',
			contentType: 'application/json',
			async: false,
			data: JSON.stringify({
				song_name:$('#songName').val(),
				song_url: $('#songURL').val() ,
				song_raaga: $('#songRaaga').val() ,
				song_taal: $('#songTala').val() ,
				song_singer: $('#songSinger').val() ,
				song_composer: $('#songComposer').val() 
	        }),
	        success: function(data){
	        }
		});
		$('#songProfileForm').modal('toggle');
		loadSongList();
}








//load songList

function loadSongList() {
	//alert("in songList");
	$.ajax({
		url : URL+'/webapi/song/fetchall',
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
       // alert("in success");
        	var no_of_object = data.length;	
			var tdata = '<thead>'+
					        '<tr>'+
					            '<th>Name</th>'+
					            '<th>Song</th>'+
					            '<th>Raga</th>'+
					            '<th>Tala</th>'+
					            '<th>Singer</th>'+
					            '<th>Composer</th>'+
					            '<th>Edit</th>'+
					            '<th>Delete</th>'+
					        '</tr>'+
					    '</thead>';
			$('#songList').empty();
			
			if(no_of_object == 0) {
				tdata += '<tfoot><tr><td> No data found </td></tr></tfoot>';
			}
			else {
				for (var i = 0; i < no_of_object; i++) {
					var song_id = data[i]['song_id'];
					var song_name = data[i]['song_name'];
					var song_url = data[i]['song_url'];
					var song_raaga = data[i]['song_raaga'];
					var song_taal = data[i]['song_taal'];
					var song_singer = data[i]['song_singer'];
					var song_composer = data[i]['song_composer'];
					//song_url = song_url.replace("https://drive.google.com/uc?export=download&id=","https://drive.google.com/open?id=");
					tdata += '<tr><td>'+song_name+
								'</td><td><audio controls>'+
								'<source src="'+song_url+'" type="audio/mpeg">'+
								'</audio>'+
								'</td><td>'+song_raaga+
								'</td><td>'+song_taal+
								'</td><td>'+song_singer+
								'</td><td>'+song_composer+
								'</td><td><a href="#songEditForm" data-toggle="modal" onclick="editsong(\''+song_id+'\',\''+song_name+'\',\''+song_url+'\',\''+song_raaga+'\',\''+song_taal+'\',\''+song_singer+'\',\''+song_composer+'\')">Edit</a>'+
								'</td><td><a href onclick="deletesong(\''+song_name+'\',\''+song_id+'\')">Delete</a></td></tr>';
				}
			}
			
			$('#songList').append(tdata);
        }
	});
}


/*
 * function to delete song record by admin.
 */

function deletesong(name,id) {
	
	if (confirm("Do you want to delete "+name+" ?") == true) {
		$.ajax({
			url : URL+'/webapi/song/delete/'+id,
			type : 'POST',
			dataType : 'json',
			contentType: 'application/json',
			async: false,
	        success: function(data){
	        }
		});
    } 
	loadSongList();
      	
}

var songID;
function editsong1(sid,name,url,raaga,taal,singer,composer) {
	songID = sid;
	$('#songName2').val(name);
	$('#songURL2').val(url) ;
	$('#songRaaga2').val(raaga) ;
	$('#songTala2').val(taal) ;
	$('#songSinger2').val(singer) ;
	$('#songComposer2').val(composer) ;
}

function saveEditedSong()  {
	//alert('in edit'+URL+'/webapi/song/edit/'+songID);
	$.ajax({
		url : URL+'/webapi/song/edit/'+songID,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			song_name:$('#songName2').val(),
			song_url: $('#songURL2').val(),
			song_raaga: $('#songRaaga2').val(),
			song_taal: $('#songTala2').val(),
			song_singer: $('#songSinger2').val(),
			song_composer: $('#songComposer2').val() 
			
        }),
        success: function(data){
        }
	});
	$('#songEditForm').modal('toggle');
	loadSongList();
}
