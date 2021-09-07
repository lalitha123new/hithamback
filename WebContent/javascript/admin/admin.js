function doOnLoad()
{
        $("#Song").load("Song.html");
        $("#Teacher").load("Teacher.html");
        $("#Student").load("Student.html");
        
        if(localStorage.getItem("admin_id") == undefined){
        	// Not logged in
        	window.location.href = "index.html";
        }
        else{
        	uid = localStorage.getItem("admin_id");
        }
        
        setTimeout(function(){
            //do what you need here
        	$(document).ready(function(){
            	loadStudentList();
            });
            $(document).ready(function(){
                loadSongList();
            });
            $(document).ready(function(){
            	loadTeacherList();
            });
        }, 200);
}

function logout()
{
	localStorage.clear();
	window.location.href = "index.html";
}