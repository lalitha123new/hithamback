/*
 * this is a Teacher resource. It contains methods for creating Teacher account,
 * editing and deleting it.
 * 
 * 
 */

package org.hitham.HITHAM.resource;

import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.hitham.HITHAM.model.TeacherModel;
import org.hitham.HITHAM.service.TeacherService;

@Path("teacher")
public class TeacherResource {
	


/*
 *  this is to create Teacher account. 
 */
	@POST
	@Path("/createteacher")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response createTeacher(TeacherModel sm)throws SQLException{
		TeacherService Teacherservice = new TeacherService();
		int returnvalue = Teacherservice.insert(sm);
		if(returnvalue == 1)
			return Response.status(201).entity("success").build();
		else
			return Response.status(500).build();
	}
	
/*
 *  this method is to show Teacher list.
 */
	@GET
	@Path("/fetchall")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchTeacherList() throws SQLException{
		TeacherService Teacherservice = new TeacherService();
		JSONArray  result= Teacherservice.fetchList();
		if(result != null)
			try {
				return Response.status(201).entity(result.toString()).build();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		else
			return Response.status(500).build();
		
		return Response.status(500).build();
	}
	
/*
 * This method is for deleting Teacher. change status to deactivated.
 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/delete/{Teacher_id}")
	public Response deleteTeacher(@PathParam("Teacher_id") String id) throws SQLException {
		TeacherService Teacherservice = new TeacherService();
		int returnvalue = Teacherservice.delete(id);
		if(returnvalue == 1)
			return Response.ok().entity("success").build();
		else
			return Response.status(500).build();
	}
	



/*
 * This method is for deleting Teacher. change status to deactivated.
 */
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/edit/{Teacher_id}")
	public Response updateTeacher(TeacherModel sm,@PathParam("Teacher_id") String id) throws SQLException {
		TeacherService Teacherservice = new TeacherService();
		int returnvalue = Teacherservice.update(sm,id);
		if(returnvalue == 1)
			return Response.ok().entity("success").build();
		else
			return Response.status(500).build();
	}
	
	
	/*
	 * This method is for updating password. 
	 */
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.TEXT_PLAIN)
		@Path("/change/{Teacher_id}")
		public Response changePassword(TeacherModel sm,@PathParam("Teacher_id") String id) throws SQLException {
			TeacherService Teacherservice = new TeacherService();
			int returnvalue = Teacherservice.changePwd(sm,id);
			if(returnvalue == 1)
				return Response.ok().entity("success").build();
			else
				return Response.status(500).build();
			
			
		}
	
	
/*
 * Teacher - Student Assignment
 * 1) get list of students for particular teacher.
 * 2) assign student.
 */
	
	@POST
	@Path("/fetchStudents/{Teacher_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchStudentList(@PathParam("Teacher_id") String id) throws SQLException{
		TeacherService teacherservice = new TeacherService();
		JSONArray  result= teacherservice.fetchStudentList(id);
		if(result != null)
			try {
				return Response.status(201).entity(result.toString()).build();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		else
			return Response.status(500).build();
		
		return Response.status(500).build();
	}
	
	@POST
	@Path("/teacherStudentMapping/{Teacher_id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public Response createTeacherStudentMapping(String s,@PathParam("Teacher_id") String id)throws SQLException{
		TeacherService Teacherservice = new TeacherService();
		int returnvalue = Teacherservice.craeteTeacherStudentMapping(s,id);
		if(returnvalue == 1)
			return Response.status(201).entity("success").build();
		else
			return Response.status(500).build();
	}
	
	
	@POST
	@Path("/fetchAssignedStudents/{Teacher_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchAssignedStudentList(@PathParam("Teacher_id") String id) throws SQLException{
		TeacherService teacherservice = new TeacherService();
		JSONArray  result= teacherservice.fetchAssignedStudentList(id);
		if(result != null)
			try {
				return Response.status(201).entity(result.toString()).build();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		else
			return Response.status(500).build();
		
		return Response.status(500).build();
	}
	
	/*
	 * 
	 * dalete student teacher mapping
	 */
	
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/deleteMapping/{teacher_pk}")
	public Response deleteStudentTeacherMapping(@PathParam("teacher_pk") String teacher_pk, String s) throws SQLException {
		TeacherService Teacherservice = new TeacherService();
		int returnvalue = Teacherservice.deleteTeacherStudentMapping(teacher_pk,s);
		if(returnvalue == 1)
			return Response.ok().entity("success").build();
		else
			return Response.status(500).build();
	}
}

