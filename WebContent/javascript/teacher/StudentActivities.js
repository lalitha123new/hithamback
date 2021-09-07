
var last_fetched_data = null;

function student_select_change()
{
	getAllActivity(document.getElementById("student_select").value)
}

function getAllActivity(student_pk)
{
	var showName = document.getElementById("namecheckbox").checked;
	if(showName){
		//show student name
		if(student_pk == 0){
			var url = URL + '/webapi/studentActivity/getAllActivityWithName/'+uid;
		}
		else {
			var url = URL+'/webapi/studentActivity/getActivityWithName/'+student_pk;
		}
	}
	else{
		//dont show student name
		if(student_pk == 0){
			var url = URL + '/webapi/studentActivity/getAllActivityWOName/'+uid;
		}
		else {
			var url = URL+'/webapi/studentActivity/getActivityWOName/'+student_pk;
		}
	}
		
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		success : function(data){
			if(data.length == 0){
				//No Activity
				$('#activity_Display_heading').empty();
				$('#activity_Display_body').empty();
				last_fetched_data = null;
				document.getElementById('no_activity_display').style.display = 'block';
				document.getElementById('activity_Display').style.display = 'none';
			}
			else{
				
				$('#activity_Display_heading').empty();
				$('#activity_Display_body').empty();
				last_fetched_data = data;
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
					for(var i=0 ; i < data.length ; i++){
						$('#activity_Display_body').append('<tr>'+
							'<td>'+data[i]['student_pk']+'</td>'+
							'<td>'+data[i]['student_name']+'</td>'+
							'<td>'+data[i]['recording_name']+'</td>'+
							'<td>'+data[i]['student_activity_type']+'</td>'+
							'<td>'+data[i]['student_activity_time']+'</td>'+
							'<td>'+data[i]['student_activity_timestamp']+'</td>'+
							'</tr>');
					}
				}
				else{
					//without name
					$('#activity_Display_heading').append('<tr>'+
						'<th>Student Key</th>'+						
						'<th>Recording</th>'+
						'<th>Activity Type</th>'+
						'<th>Activity Time on song</th>'+
						'<th>Activity Time</th>'+
						'</tr>');
					for(var i=0 ; i < data.length ; i++){
						$('#activity_Display_body').append('<tr>'+
							'<td>'+data[i]['student_pk']+'</td>'+
							'<td>'+data[i]['recording_name']+'</td>'+
							'<td>'+data[i]['student_activity_type']+'</td>'+
							'<td>'+data[i]['student_activity_time']+'</td>'+
							'<td>'+data[i]['student_activity_timestamp']+'</td>'+
							'</tr>');
					}
				}
			}
		}
	});
}

function downloadData()
{
	$("#dummy").excelexportjs({
	  containerid: "dummy",
	  datatype: 'json',
	  dataset: last_fetched_data, 
	  columns: getColumns(last_fetched_data)     
	});
}