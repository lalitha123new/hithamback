package org.hitham.HITHAM.resource;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.hitham.HITHAM.database.Convertor;
import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.RecordingModel;

@Path("recording")
public class RecordingResource {
	
	@POST 
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(RecordingModel record) throws SQLException
	{
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return Response.status(210).entity("DBError").build();
		}
		String recording_name = record.getRecording_name();
		String recording_pic_url = record.getRecording_pic_url();
		String recording_color = record.getRecording_color();
		String song_id = record.getSong_id();
		
		recording_pic_url = recording_pic_url.replace("open?","uc?export=download&");
		recording_pic_url = recording_pic_url.replace("file/d/","uc?export=download&id=");
		recording_pic_url = recording_pic_url.replace("/view?usp=drivesdk","");
		String query = "insert into recording (recording_name,recording_pic_url,recording_color,song_id) values ('"+recording_name+"','"+recording_pic_url+"','"+recording_color+"','"+song_id+"')";
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return Response.status(201).entity("success").build();
	}
	
	//to display playlists available
			@POST
			@Path("/fetchall")
			@Consumes(MediaType.APPLICATION_JSON)
			@Produces(MediaType.APPLICATION_JSON)
			public Response displayAllRecordingsAvailable() throws Exception
			{
				DatabaseConnection dbconn = new DatabaseConnection();
				if(! dbconn.isStatus()){
					dbconn.closeAll();
					return Response.status(210).entity("DBError").build();
				}
				String query = "select * from recording r, song s where s.song_id = r.song_id and r.recording_status = 'active'";
				ResultSet rs = dbconn.getStmt().executeQuery(query);
				String js = Convertor.convertToJSON(rs).toString();
				dbconn.closeAll();
				return Response.status(201).entity(js).build();
			}
			
			/*
			 *  Update the existing recording
			 */
			
			@POST 
			@Path("/edit/{recording_id}")
			@Consumes(MediaType.APPLICATION_JSON)
			@Produces(MediaType.APPLICATION_JSON)
			public Response update(RecordingModel rm,@PathParam("recording_id") String recording_id) throws SQLException
			{
				DatabaseConnection dbconn = new DatabaseConnection();
				if(! dbconn.isStatus()){
					dbconn.closeAll();
					return Response.status(210).entity("DBError").build();
				}
				String recording_name = rm.getRecording_name();
				String recording_color = rm.getRecording_color();
				String recording_pic_url = rm.getRecording_pic_url();
				String song_id = rm.getSong_id();
				recording_pic_url = recording_pic_url.replace("open?","uc?export=download&");
				recording_pic_url = recording_pic_url.replace("file/d/","uc?export=download&id=");
				recording_pic_url = recording_pic_url.replace("/view?usp=drivesdk","");
				String query = "update recording set song_id = '"+song_id+"', recording_name = '"+recording_name+"', recording_pic_url='"+recording_pic_url+"', recording_color = '"+recording_color+"'  where recording_id = "+recording_id;
				//System.out.println(query);
				dbconn.getStmt().executeUpdate(query);
				dbconn.closeAll();
				return Response.status(201).entity("success").build();
			}
			
			/*
			 * Delete the recording.
			 */
			
			@POST
			@Path("/delete/{recording_id}")
			@Consumes(MediaType.APPLICATION_JSON)
			@Produces(MediaType.APPLICATION_JSON)
			public Response delete(@PathParam("recording_id") String id) throws SQLException {
				DatabaseConnection dbconn = new DatabaseConnection();
				if(! dbconn.isStatus()){
					dbconn.closeAll();
					return Response.status(210).entity("DBError").build();
				}
				String query = "update recording set recording_status = 'deactivated' where recording_id = '"+id+"'";
				dbconn.getStmt().executeUpdate(query);
				dbconn.closeAll();
				return Response.status(201).entity("success").build();	
			}
}