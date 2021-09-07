package org.hitham.HITHAM.resource;

import java.sql.ResultSet;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.hitham.HITHAM.database.Convertor;
import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.ActivityModel;

@Path("studentActivity")
public class StudentActivityResources {
	
	@POST
	@Path("/getActivityWOName/{student_pk}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getActivityWOName(@PathParam("student_pk") String student_pk) throws Exception{
//		System.out.println("Inside getAllActivity-1 "+student_pk);
		DatabaseConnection dbconn = new DatabaseConnection();
		ResultSet rs;
		String query = "SELECT s.student_pk, r.recording_name, r.recording_id, sa.student_activity_type, sa.student_activity_time, sa.student_activity_timestamp  from student s, recording r, student_activity sa where sa.recording_id = r.recording_id and sa.student_pk = s.student_pk and sa.student_pk="+student_pk+" order by sa.student_activity_timestamp desc";
		rs = dbconn.getStmt().executeQuery(query);
		JSONArray jsonarray = Convertor.convertToJSON(rs);
//		System.out.println(jsonarray.toString());
		dbconn.closeAll();
		return Response.status(201).entity(jsonarray.toString()).build();
	}

	@POST
	@Path("/getActivityWithName/{student_pk}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getActivityWithName(@PathParam("student_pk") String student_pk) throws Exception{
//		System.out.println("Inside getAllActivity-1 "+student_pk);
		DatabaseConnection dbconn = new DatabaseConnection();
		ResultSet rs;
		String query = "SELECT s.student_pk, s.student_name, r.recording_name, r.recording_id, sa.student_activity_type, sa.student_activity_time, sa.student_activity_timestamp  from student s, recording r, student_activity sa where sa.recording_id = r.recording_id and sa.student_pk = s.student_pk and sa.student_pk="+student_pk+" order by sa.student_activity_timestamp desc";
		rs = dbconn.getStmt().executeQuery(query);
		JSONArray jsonarray = Convertor.convertToJSON(rs);
//		System.out.println(jsonarray.toString());
		dbconn.closeAll();
		return Response.status(201).entity(jsonarray.toString()).build();
	}

	
	//for all student assigned to perticular teacher
	@POST
	@Path("/getAllActivityWOName/{teacher_pk}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllActivityWOName(@PathParam("teacher_pk") String teacher_pk) throws Exception{
//		System.out.println("Inside getAllActivity-1 ");
		DatabaseConnection dbconn = new DatabaseConnection();
		ResultSet rs;
		String query = "SELECT s.student_pk, r.recording_name, r.recording_id, sa.student_activity_type, sa.student_activity_time, sa.student_activity_timestamp  from student s, recording r, student_activity sa where sa.recording_id = r.recording_id and sa.student_pk = s.student_pk order by sa.student_activity_timestamp desc";
		rs = dbconn.getStmt().executeQuery(query);
		JSONArray jsonarray = Convertor.convertToJSON(rs);
		dbconn.closeAll();
		return Response.status(201).entity(jsonarray.toString()).build();
	}
	
	@POST
	@Path("/getAllActivityWithName/{teacher_pk}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllActivityWithName(@PathParam("teacher_pk") String teacher_pk) throws Exception{
//		System.out.println("Inside getAllActivity-1 ");
		DatabaseConnection dbconn = new DatabaseConnection();
		ResultSet rs;
		String query = "SELECT s.student_pk, s.student_name, r.recording_name, r.recording_id, sa.student_activity_type, sa.student_activity_time, sa.student_activity_timestamp  from student s, recording r, student_activity sa where sa.recording_id = r.recording_id and sa.student_pk = s.student_pk order by sa.student_activity_timestamp desc";
		rs = dbconn.getStmt().executeQuery(query);
		JSONArray jsonarray = Convertor.convertToJSON(rs);
		dbconn.closeAll();
		return Response.status(201).entity(jsonarray.toString()).build();
	}
	
	// @POST
	// @Path("/allActivity/{student_pk}/{recording_id}")
	// @Produces(MediaType.APPLICATION_JSON)
	// @Consumes(MediaType.APPLICATION_JSON)
	// public Response getActivity(@PathParam("student_pk") String student_pk, @PathParam("recording_id") String recording_id) throws Exception{
	// 	DatabaseConnection dbconn = new DatabaseConnection();
	// 	ResultSet rs;
	// 	String query = "SELECT s.student_id, s.student_name, r.recording_name, r.recording_id,sa.student_activity_type, sa.student_activity_time, sa.student_activity_timestamp  from student s, recording r, student_activity sa where sa.recording_id = r.recording_id and sa.student_pk = s.student_pk and sa.student_pk = "+student_pk+" and r.recording_id = "+recording_id+" order by sa.student_activity_timestamp desc";
	// 	rs = dbconn.getStmt().executeQuery(query);
	// 	JSONArray jsonarray = Convertor.convertToJSON(rs);
	// 	dbconn.closeAll();
	// 	return Response.status(201).entity(jsonarray.toString()).build();
	// }
	
	@POST
	@Path("/logActivity")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response logActivity(ActivityModel activity) throws Exception{
//		System.out.println("Inside logActivity");
		DatabaseConnection dbconn = new DatabaseConnection();
		String query = "INSERT INTO student_activity (student_pk,recording_id,student_activity_type,student_activity_time) VALUES ('"+activity.getStudent_pk()+"',"+activity.getRecording_id()+",'"+activity.getStudent_activity_type()+"','"+activity.getStudent_activity_time()+"')";
		//System.out.println(query);
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return Response.ok().build();
	}

}
