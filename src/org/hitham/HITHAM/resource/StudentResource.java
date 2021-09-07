/*
 * this is a student resource. It contains methods for creating student account,
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

import org.hitham.HITHAM.model.StudentModel;
import org.hitham.HITHAM.service.StudentService;

@Path("student")
public class StudentResource {
	
/*
 *  this is to create student account. (used in demo 1)
 */
	@POST
	@Path("/createstudent")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response createStudent(StudentModel sm)throws SQLException{
		StudentService studentservice = new StudentService();
		int returnvalue = studentservice.insert(sm);
		if(returnvalue == 1)
			return Response.status(201).entity("success").build();
		else
			return Response.status(500).build();
	}
	
/*
 *  this method is to show student list.
 */
	@GET
	@Path("/fetchall")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchStudentList() throws SQLException{
		StudentService studentservice = new StudentService();
		String  result= studentservice.fetchList();
		if(result != null)
			try {
				return Response.status(201).entity(result).build();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		else
			return Response.status(500).build();
		
		return Response.status(500).build();
	}
	
/*
 * This method is for deleting student. change status to deactivated.
 */
	@POST
	@Path("/delete/{student_id}")
	public Response deleteStudent(@PathParam("student_id") String id) throws SQLException {
		StudentService studentservice = new StudentService();
		int returnvalue = studentservice.delete(id);
		if(returnvalue == 1)
			return Response.ok().entity("success").build();
		else
			return Response.status(500).build();
	}
	



/*
 * This method is for Editing student. change status to deactivated.
 */
	@POST
	@Path("/edit/{student_id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response updateStudent(StudentModel sm,@PathParam("student_id") String id) throws SQLException {
		StudentService studentservice = new StudentService();
		int returnvalue = studentservice.update(sm,id);
		if(returnvalue == 1)
			return Response.ok().entity("success").build();
		else
			return Response.status(500).build();
	}
	
	@POST
	@Path("/change/{student_id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response changePassword(StudentModel sm,@PathParam("student_id") String id) throws SQLException {
		StudentService studentservice = new StudentService();
		int returnvalue = studentservice.changePwd(sm,id);
		System.out.println(returnvalue);
		if(returnvalue == 1)
			return Response.ok().entity("success").build();
		else
			return Response.status(500).build();
	}
}
