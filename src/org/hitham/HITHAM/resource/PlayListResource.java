// this file consists of services related to  teacher
package org.hitham.HITHAM.resource;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.hitham.HITHAM.model.PlayListModel;
import org.hitham.HITHAM.service.PlaylistService;
import org.json.JSONArray;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("playlist")
public class PlayListResource {
	
	
	
		// To create a new playlist
		@POST 
		@Path("/create")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response create(PlayListModel pm) throws SQLException
		{
			PlaylistService pls = new PlaylistService(); 
			int rvalue = pls.createPlaylist(pm);
			if(rvalue == 1)
				return Response.status(201).entity("success").build();
			else if(rvalue == 10)
				return Response.status(210).entity("DBError").build();
			else
				return Response.status(500).build();
				
		}
		
		
		
		
		
		
		
		
		
		//to display playlists available
		@GET
		@Path("/fetchall")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response displayAllplaylistAvailable() throws Exception
		{
			PlaylistService pls = new PlaylistService(); 
			String result= pls.fetchAllPlaylist();
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
		 *  Update the existing playlist
		 */
		
		@POST 
		@Path("/edit/{playlist_id}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response update(PlayListModel plm,@PathParam("playlist_id") String id) throws SQLException
		{
			PlaylistService pls = new PlaylistService(); 
			int returnvalue = pls.update(plm,id);
			if(returnvalue == 1)
				return Response.ok().entity("success").build();
			else
				return Response.status(500).build();
		}
		
		/*
		 * Delete the playlist.
		 */
		
		@POST
		@Path("/delete/{playlist_id}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response delete(@PathParam("playlist_id") String id) throws SQLException {
			PlaylistService pls = new PlaylistService(); 
			int returnvalue = pls.delete(id);
			if(returnvalue == 1)
				return Response.ok().entity("success").build();
			else
				return Response.status(500).build();
		}
		
		/*
		 * fetch Playlist created by current teacher.
		 * 
		 */
		@POST
		@Path("/fetch/{teacher_pk}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response displayplaylistAvailableForTeacher(@PathParam("teacher_pk") String id) throws Exception
		{
			System.out.println("checking");
			PlaylistService pls = new PlaylistService(); 
			String result= pls.fetchParticularPlaylist(id);
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
		 * 
		 * fetch playlist not allocated particular student
		 */
		@POST
		@Path("/fetchForStudent/{student_pk}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response displayplaylistAvailableForStudent(@PathParam("student_pk") String id) throws Exception
		{
			PlaylistService pls = new PlaylistService(); 
			JSONArray  result= pls.fetchPlaylistAvailForStudent(id);
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
		 * fetch playlist assigned for particular student
		 * 
		 */
		
		@POST
		@Path("/assignedForStudent/{student_pk}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response displayplaylistAssignedForStudent(@PathParam("student_pk") String id) throws Exception
		{
			PlaylistService pls = new PlaylistService(); 
			JSONArray  result= pls.fetchPlaylistAssignedToStudent(id);
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
		 * create student playlist mapping
		 */
		
		@POST
		@Path("/studentPlaylistMapping/{teacher_pk}/{student_pk}")
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.TEXT_PLAIN)
		public Response createPlaylistStudentMapping(String s,@PathParam("teacher_pk") String tid,@PathParam("student_pk") String sid)throws SQLException{
			PlaylistService playlistservice = new PlaylistService();
			int returnvalue = playlistservice.craeteStudentPlaylistMapping(s,tid,sid);
			if(returnvalue == 1)
				return Response.status(201).entity("success").build();
			else
				return Response.status(500).build();
		}
		
		/*
		 * delete playlist student mapping
		 * 
		 */
		
		
		@POST
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.TEXT_PLAIN)
		@Path("/deleteMapping/{student_pk}")
		public Response deleteStudentPlaylistMapping(@PathParam("student_pk") String student_pk, String s) throws SQLException {
			PlaylistService playlistservice = new PlaylistService();
			int returnvalue = playlistservice.deletePlaylistStudentMapping(student_pk,s);
			if(returnvalue == 1)
				return Response.ok().entity("success").build();
			else
				return Response.status(500).build();
		}
		
		/*
		 * Playlist - recording Assignment
		 * 1) get list of Recordings for particular playlist which are not  already assigned.
		 * 2) assign recording.
		 * 3) get list of Recordings for particular playlist which are already assigned.
		 */
//1)			
			@POST
			@Path("/fetchRecordings/{Playlist_id}")
			@Produces(MediaType.APPLICATION_JSON)
			public Response fetchRecordings(@PathParam("Playlist_id") String id) throws SQLException{
				PlaylistService playlistservice = new PlaylistService();
				JSONArray  result= playlistservice.fetchRecordingList(id);
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

//2)
			@POST
			@Path("/recordingPlaylistMapping/{Playlist_id}")
			@Consumes(MediaType.TEXT_PLAIN)
			@Produces(MediaType.TEXT_PLAIN)
			public Response createPlaylistRecordingMapping(String s,@PathParam("Playlist_id") String id)throws SQLException{
				PlaylistService playlistservice = new PlaylistService();
				int returnvalue = playlistservice.craetePlaylistRecordingMapping(s,id);
				if(returnvalue == 1)
					return Response.status(201).entity("success").build();
				else
					return Response.status(500).build();
			}
			
//3)			
			@POST
			@Path("/fetchAssignedRecordings/{Playlist_id}")
			@Produces(MediaType.APPLICATION_JSON)
			public Response fetchAssignedRecordingList(@PathParam("Playlist_id") String id) throws SQLException{
				PlaylistService playlistservice = new PlaylistService();
				JSONArray  result= playlistservice.fetchAssignedRecordingList(id);
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
			@Path("/deleteRecordingPlaylistMapping/{Playlist_id}")
			@Consumes(MediaType.TEXT_PLAIN)
			@Produces(MediaType.TEXT_PLAIN)
			public Response deletePlaylistRecordingMapping(String s,@PathParam("Playlist_id") String id)throws SQLException{
				PlaylistService playlistservice = new PlaylistService();
				int returnvalue = playlistservice.deletePlaylistRecordingMapping(s,id);
				if(returnvalue == 1)
					return Response.status(201).entity("success").build();
				else
					return Response.status(500).build();
			}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
//		@GET
//		@Path("/displayplaylist/{student_id}")
//		@Consumes(MediaType.APPLICATION_JSON)
//		@Produces(MediaType.APPLICATION_JSON)
//		public Response displayplaylist(@PathParam("student_id") String id) throws Exception
//		{
//			DatabaseConnection dbconn = new DatabaseConnection();
//			if(! dbconn.isStatus()){
//				return Response.status(210).entity("DBError").build();
//			}
//			String query = "select * from playlist where playlist_id not in( select playlist_id from student_playlist_assignment where student_id = "+id+")";
//			ResultSet rs = dbconn.getStmt().executeQuery(query);
//			JSONArray jsonarray = Convertor.convertToJSON(rs);
//			dbconn.getConn().close();
//			return Response.ok().entity(jsonarray.toString()).build();
//		}
//		
//
//		//to assign playlist to a student
//		@POST 
//		@Path("/assign/{student_id}/{playlist_id}")
//		@Produces(MediaType.APPLICATION_JSON)
//		public Response assign(@PathParam("student_id") String sid,@PathParam("playlist_id") String playlist_id) throws SQLException
//		{
//			DatabaseConnection dbconn = new DatabaseConnection();
//			if(! dbconn.isStatus()){
//				return Response.status(210).entity("DBError").build();
//			}
//			
//			String query = "insert into student_playlist_assignment (student_id,playlist_id) values ('"+sid+"',"+playlist_id+")";
//			System.out.println(query);
//			dbconn.getStmt().executeUpdate(query);
//			dbconn.getConn().close();
//			return Response.status(201).entity("success").build();
//		}
//		
//		
//		@POST 
//		@Path("/songassign/{songlist_id}/{playlist_id}")
//		@Produces(MediaType.APPLICATION_JSON)
//		public Response song_play_assign(@PathParam("songlist_id") String songid,@PathParam("playlist_id") String playlist_id) throws SQLException
//		{
//			DatabaseConnection dbconn = new DatabaseConnection();
//			if(! dbconn.isStatus()){
//				return Response.status(210).entity("DBError").build();
//			}
//			
//			String query = "insert into recording_playlist_mapping (songlist_id,playlist_id) values ("+songid+","+playlist_id+")";
//			System.out.println(query);
//			dbconn.getStmt().executeUpdate(query);
//			dbconn.getConn().close();
//			return Response.status(201).entity("success").build();
//		}
//		
//		// get all songs
//		@GET
//		@Path("/displaysong/{playlist_id}")
//		@Consumes(MediaType.APPLICATION_JSON)
//		@Produces(MediaType.APPLICATION_JSON)
//		public Response displaysonglist(@PathParam("playlist_id") String playlist_id) throws Exception
//		{
//			DatabaseConnection dbconn = new DatabaseConnection();
//			if(! dbconn.isStatus()){
//				return Response.status(210).entity("DBError").build();
//			}
//			String query = "select * from recording where recording_id not in( select song_id from _playlist_mapping where playlist_id = "+playlist_id+")";
//			ResultSet rs = dbconn.getStmt().executeQuery(query);
//			JSONArray jsonarray = Convertor.convertToJSON(rs);
//			dbconn.getConn().close();
//			return Response.ok().entity(jsonarray.toString()).build();
//		}
		
		
}
