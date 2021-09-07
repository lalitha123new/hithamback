/*
 * This is a resource for adding/updating/deleting a song by admin 
 */

package org.hitham.HITHAM.resource;

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
import org.hitham.HITHAM.model.SongModel;


@Path("song")

public class SongResource {
	
	/*
	 * Add a new Song
	 */
	@POST 
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(SongModel slm) throws SQLException
	{
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return Response.status(210).entity("DBError").build();
		}
		String song_name = slm.getSong_name();
		String song_url = slm.getSong_url();
		String song_raaga = slm.getSong_raaga();
		String song_taal = slm.getSong_taal();
		String song_singer = slm.getSong_singer();
		String song_composer = slm.getSong_composer();
		song_url = song_url.replace("open?","uc?export=download&");
		song_url = song_url.replace("file/d/","uc?export=download&id=");
		song_url = song_url.replace("/view?usp=drivesdk","");
		String query = "insert into song (song_name,song_url,song_raaga,song_taal,song_singer,song_composer) values ('"+song_name+"','"+song_url+"','"+song_raaga+"','"+song_taal+"','"+song_singer+"','"+song_composer+"')";
		System.out.println(query);
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return Response.status(201).entity("success").build();
	}
	
	/*
	 *  Update the existing song
	 */
	
	@POST 
	@Path("/edit/{song_id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(SongModel slm,@PathParam("song_id") String song_id) throws SQLException
	{
		
		
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return Response.status(210).entity("DBError").build();
		}
		String song_name = slm.getSong_name();
		String song_url = slm.getSong_url();
		String song_raaga = slm.getSong_raaga();
		String song_taal = slm.getSong_taal();
		String song_singer = slm.getSong_singer();
		String song_composer = slm.getSong_composer();
		song_url = song_url.replace("open?","uc?export=download&");
		song_url = song_url.replace("file/d/","uc?export=download&id=");
		song_url = song_url.replace("/view?usp=drivesdk","");
		String query = "update song set song_name = '"+song_name+"',song_url='"+song_url+"',song_raaga = '"+song_raaga+"',song_taal = '"+song_taal+"',song_singer = '"+song_singer+"',song_composer = '"+song_composer+"' where song_id = '"+song_id+"'";
		System.out.println(query);
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return Response.status(201).entity("success").build();
	}
	
	/*
	 * Delete the song.
	 */
	
	@POST
	@Path("/delete/{song_id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(SongModel sm,@PathParam("song_id") String id) throws SQLException {
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return Response.status(210).entity("DBError").build();
		}
		String query = "update song set song_status = 'deactivated' where song_id = '"+id+"'";
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return Response.status(201).entity("success").build();	
	}
	
	
	/*
	 *  fetch all songs to display.
	 */
	@POST
	@Path("/fetchall")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetch() throws Exception {
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return Response.status(210).entity("DBError").build();
		}
		String query = "select * from song where song_status = 'active'";
		ResultSet rs = dbconn.getStmt().executeQuery(query);
		String js = Convertor.convertToJSON(rs).toString();
		dbconn.closeAll();
		return Response.status(201).entity(js).build();
	}

}
