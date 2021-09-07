
function doOnLoad() {
	if(localStorage.getItem("teacherName") == undefined){
    	// Not logged in
    	window.location.href = "index.html";
    }
    else{
    	uid = localStorage.getItem("teacher_pk");
    }
	
    $("#Playlist").load("Playlist.html");
    $("#Recording").load("Recording.html");
    $("#StudentAssignment").load("StudentA.html");
    $("#StudentActivity").load("StudentActivities.html");
    
    
    setTimeout(function(){
        //do what you need here
        $(document).ready(function(){
        	loadplayList();
        	getSongList();
        	loadStudentForTeacherList();
        	recordingList();
        	//alert(localStorage.getItem("teacherName"));
        	document.getElementById('role').innerHTML = '<div>Teacher : '+localStorage.getItem("teacherName")+'</div>';
        	//document.getElementById("role").innerHTML = "<h3>"+localStorage.getItem("teacherName")+"</h3>";
        });
    }, 1000);
}

//function loadTeacherList() {
//	$.ajax({
//		url : URL+'/webapi/teacher/fetchall',
//		type : 'GET',
//		dataType : 'json',
//		contentType: 'application/json',
//		async: false,
//        success: function(data){
//        	//alert("in success");
//        	var no_of_object = data.length;	
//			var teacherlistdropdown = '';
//			$('#teacherIDList').empty();
//			if(no_of_object == 0) {
//				teacherlistdropdown += '<option>none</option>';
//			}
//			else {
//				for (var i = 0; i < no_of_object; i++) {
//					var teacher_id = data[i]['teacher_id'];
//					teacherlistdropdown += '<option>'+teacher_id+'</option>';
//				}
//			}
//			
//			$('#teacherIDList').append(teacherlistdropdown);
//        }
//	});
//}

function logout()
{
	localStorage.clear();
	window.location.href = "index.html";
}