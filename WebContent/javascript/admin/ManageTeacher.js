var teacher_nameArray = [];

// create teacher profile
function teacherProfileSubmit() {
	if(teacher_nameArray.indexOf($('#teacherId1').val()) != -1) {
		alert('Username already Exists');
	}
	else {
		$.ajax({
			url : URL+'/webapi/teacher/createteacher',
			type : 'POST',
			dataType : 'text',
			contentType: 'application/json',
			async: false,
			data: JSON.stringify({
				teacher_name:$('#teacherName').val(),
				teacher_id: $('#teacherId1').val() ,
				teacher_password: encryptme($('#teacherpassword').val())
				
	        }),
	        success: function(data){
	        }
		});
		$('#teacherProfileForm').modal('hide');
		loadTeacherList();
	}
}

//load teacherList

function loadTeacherList() {
	//alert("in teacherList");
	$.ajax({
		url : URL+'/webapi/teacher/fetchall',
		type : 'GET',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert("in success");
        	var no_of_object = data.length;	
			var tdata = '<thead>'+
					        '<tr>'+
					            '<th>Name</th>'+
					            '<th>Username</th>'+
					            '<th>Edit</th>'+
					            '<th>Delete</th>'+
					            '<th>Current Students</th>'+
					            '<th>Assign New Student</th>'+
					        '</tr>'+
					    '</thead>';
			$('#teacherList').empty();
			teacher_nameArray = [];
			if(no_of_object == 0) {
				tdata += '<tfoot><tr><td> No data found </td></tr></tfoot>';
			}
			else {
				for (var i = 0; i < no_of_object; i++) {
					var teacher_id = data[i]['teacher_id'];
					var teacher_name = data[i]['teacher_name'];
					var teacher_password = data[i]['teacher_password'];
					var teacher_pk = data[i]['teacher_pk'];
					var teacher_status = data[i]['teacher_status'];
					teacher_nameArray.push(teacher_id);
					
					if(teacher_status == 'active') {
						tdata += '<tr><td>'+teacher_name+
						'</td><td>'+teacher_id+
						'</td><td>'+'<a  href="#teacherEditForm" data-toggle="modal" onclick="editteacher(\''+teacher_pk+'\',\''+teacher_name+'\',\''+teacher_id+'\',\''+teacher_password+'\')">Edit</a>'+
						'</td><td><a href onclick="deleteteacher(\''+teacher_id+'\',\''+teacher_pk+'\')">Delete</a></td>'+
						'</td><td><a href="#currentStudentForm" data-toggle="modal" onclick="getCurrentStudentList(\''+teacher_pk+'\')">click here</a></td>'+
						'</td><td><a href="#studentAssignForm" data-toggle="modal" onclick="getStudentList(\''+teacher_pk+'\')">click here</a></td></tr>';
					}
					
				}
			}
			
			$('#teacherList').append(tdata);
        }
	});
}


/*
 * function to delete teacher record by admin.
 */

function deleteteacher(id,pk) {
	
	if (confirm("Do you want to delete "+id+" ?") == true) {
		$.ajax({
			url : URL+'/webapi/teacher/delete/'+pk,
			type : 'POST',
			dataType : 'text',
			contentType: 'application/json',
			async: false,
	        success: function(data){
	        }
		});
		loadTeacherList();
    } 
	
      	
}

var teacherID;
function editteacher(pk,name,sid,pass) {
	teacherID = pk;
	$('#teacherName2').val(name);
	$('#teacherId2').val(sid);
	$('#teacherPassword2').val("");
}

function saveEditedTeacher()  {
	
	$.ajax({
		url : URL+'/webapi/teacher/edit/'+teacherID,
		type : 'POST',
		dataType : 'text',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			teacher_name:$('#teacherName2').val(),
			teacher_id: $('#teacherId2').val() ,
			
        }),
        success: function(data){
        }
	});
	$('#teacherEditForm').modal('toggle');
	loadTeacherList();
}

function changePassWord() {
	
	$.ajax({
		url : URL+'/webapi/teacher/change/'+teacherID,
		type : 'POST',
		dataType : 'text',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			teacher_password: encryptme($('#teacherPassword2').val()),
			
        }),
        success: function(data){
        }
	});
	$('#teacherEditForm').modal('toggle');
	loadTeacherList();
	
}



function getStudentList(id) {
	//alert(id);
	teacherID = id;
	$.ajax({
		url : URL+'/webapi/teacher/fetchStudents/'+id,
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
        success: function(data){
        	//alert(data);
        	var no_of_object = data.length;	
        	var appendData = '';
        	$('#studentCheckbox').empty();
        	if(no_of_object == 0){
        		appendData += 'No data found';
        	}
        	else {
        		for(var i = 0; i < no_of_object; i++) {
            		appendData += '<input type="checkbox" name="studentBox" value="'+data[i]['student_pk']+'"> &nbsp;'+data[i]['student_name']+'<br>';
            	}
        	}
        	
        	
        	$('#studentCheckbox').append(appendData);
        }
	});
	
	
}


function createTeacherStudentMapping() {
	var selected = [];
	$('#studentCheckbox input:checked').each(function() {
	    selected.push($(this).attr('value'));
	});
	//alert( selected.join(',') +' '+ teacherID);
	if(selected.length != 0) {
		$.ajax({
			url : URL+'/webapi/teacher/teacherStudentMapping/'+teacherID,
			type : 'POST',
			dataType : 'text',
			contentType: 'text/plain',
			async: false,
			data: ''+selected.join(','),
	        success: function(data){
	        }
		});
	}
	$('#studentAssignForm').modal('toggle');
}



function getCurrentStudentList(id) {
	teacherID = id;
	$.ajax({
		url : URL+'/webapi/teacher/fetchAssignedStudents/'+id,
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
            		appendData += '<input type="checkbox" name="studentDeleteBox" value="'+data[i]['student_pk']+'"> &nbsp;'+data[i]['student_name']+'<br>';
            	}
        	}
        	
        	
        	$('#currentList').append(appendData);
        }
	});
	
}

function deleteTeacherStudentMapping() {

	var selected = [];
	$('#currentList input:checked').each(function() {
	    selected.push($(this).attr('value'));
	});
	//alert( selected.join(',') +' '+ teacherID);
	if(selected.length != 0) {
		
		if (confirm("Do you want to delete ?") == true){
			$.ajax({
				url : URL+'/webapi/teacher/deleteMapping/'+teacherID,
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
	$('#currentStudentForm').modal('toggle');
}