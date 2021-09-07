function loginFunction()
{
	
	var pass = $('#Password').val();
	
	if (pass.length == 0) alert("Enter password");
	$.ajax({
		url : URL+'/webapi/validate/details',
		type : 'POST',
		dataType : 'json',
		contentType: 'application/json',
		async: false,
		data: JSON.stringify({
			username: $('#Username').val(),
			password: encryptme(pass)
        }),
        success: function(data){
        	
        	//alert(data.length)
        	if (data.length == 0) {
        		//Invalid credentials
        		alert("Invalid login credentials");
        	}
        	else{
//        		alert(data[0]['admin_id'])
        		if(data[0]['admin_id'] != undefined){
        			//admin
//        			alert("admin");
        			localStorage.setItem("admin_id",data[0]['admin_id']);
        			window.location.href = "admin.html";
        		}
        		else{
        			//teacher
//        			alert("teacher");
        			localStorage.setItem("teacherName",data[0]['teacher_name']);
        			localStorage.setItem("teacher_pk",data[0]['teacher_pk']);
            		window.location.href = "teacherControl.html";
        		}
        	}
        	/*
        	if(data=="Admin"){
        		window.location.href = "admin.html";
        	}
        	else if(data=="failure")
        		alert("Invalid login credentials");
        	else
        	{
        		localStorage.setItem("teacherName",data[0]['teacher_name']);
        		uid = data[0]['teacher_pk'];
        		window.location.href = "teacherControl.html";
        	}
        	*/
        }
	});
}