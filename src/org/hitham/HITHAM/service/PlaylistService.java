package org.hitham.HITHAM.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.StringTokenizer;

import org.json.JSONArray;
import org.hitham.HITHAM.database.Convertor;
import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.PlayListModel;

public class PlaylistService {

	public int createPlaylist(PlayListModel pm) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String playlist_name = pm.getPlaylist_name();
		String teacher_pk = pm.getTeacher_pk();
		String playlist_color = pm.getPlaylist_color();
		String playlist_pic_url = pm.getPlaylist_pic_url();
		
		playlist_pic_url = playlist_pic_url.replace("open?","uc?export=download&");
		playlist_pic_url = playlist_pic_url.replace("file/d/","uc?export=download&id=");
		playlist_pic_url = playlist_pic_url.replace("/view?usp=drivesdk","");
		
		String query = "insert into playlist (playlist_name,teacher_pk,playlist_color,playlist_pic_url) values ('"+playlist_name+"',"+teacher_pk+",'"+playlist_color+"','"+playlist_pic_url+"')";
		System.out.println(query);
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return 1;
	}

	public  String fetchAllPlaylist() throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from playlist where playlist_status = 'active'";
		try{
			String result =  Convertor.convertToJSON(dbconn.getStmt().executeQuery(query)).toString();
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of playlist");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return "{}";
		}
	}
	
	public int update(PlayListModel plm, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String playlist_name = plm.getPlaylist_name();
		String playlist_color = plm.getPlaylist_color();
		String playlist_pic_url = plm.getPlaylist_pic_url();
		
		
		playlist_pic_url = playlist_pic_url.replace("open?","uc?export=download&");
		playlist_pic_url = playlist_pic_url.replace("file/d/","uc?export=download&id=");
		playlist_pic_url = playlist_pic_url.replace("/view?usp=drivesdk","");
		
		String query = "update playlist set playlist_name = '"+playlist_name+"', playlist_color = '"+playlist_color+"', playlist_pic_url = '"+playlist_pic_url+"' where playlist_id = "+id;
		System.out.println(query);
		try {
			dbconn.getStmt().executeUpdate(query);
			dbconn.closeAll();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dbconn.closeAll();
			return 10;
		}
		
		return 1;
	}
	
	
	public int delete(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String query = "update playlist set playlist_status = 'deactivated' where playlist_id = "+id;
		try {
			dbconn.getStmt().executeUpdate(query);
			dbconn.closeAll();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dbconn.closeAll();
		}
		
		return 1;
	}

	public String fetchParticularPlaylist(String id) throws SQLException {
		System.out.println("checking1");
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from playlist where playlist_status = 'active' and teacher_pk = "+id;
		try{
			String result =  Convertor.convertToJSON(dbconn.getStmt().executeQuery(query)).toString();
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of playlist");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	
	public int craetePlaylistRecordingMapping(String s, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		StringTokenizer sto = new StringTokenizer(s,",");
		String query = "";
		while(sto.hasMoreTokens()) {
			String token = sto.nextToken();
			String queryExist = "select recording_playlist_mapping_id from recording_playlist_mapping where playlist_id="+id+" and recording_id="+token;
			//System.out.println(queryExist);
			ResultSet rs =  dbconn.getStmt().executeQuery(queryExist);
			if(!rs.next())
				query = "insert into recording_playlist_mapping (playlist_id,recording_id) values ("+id+","+token+");";
			else
				query = "update  recording_playlist_mapping set recording_playlist_mapping_status = 'active' where playlist_id="+id+" and recording_id="+token;
			//System.out.println(query);
			dbconn.getStmt().executeUpdate(query);
			
		}
		
		dbconn.closeAll();
		return 1;
	}

	public JSONArray fetchRecordingList(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from recording where recording_status = 'active' and recording_id not in (select recording_id from recording_playlist_mapping where recording_playlist_mapping_status = 'active' and playlist_id = "+id+")";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of recording ");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	public JSONArray fetchAssignedRecordingList(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from recording where recording_status = 'active' and recording_id  in (select recording_id from recording_playlist_mapping where recording_playlist_mapping_status = 'active' and playlist_id = "+id+")";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of  already assigned recording ");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	public JSONArray fetchPlaylistAssignedToStudent(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from playlist where playlist_status = 'active' and playlist_id  in (select playlist_id from student_playlist_assignment where student_playlist_assignment_status = 'active' and student_pk = "+id+")";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of recording ");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	public JSONArray fetchPlaylistAvailForStudent(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from playlist where playlist_status = 'active' and playlist_id not in (select playlist_id from student_playlist_assignment where student_playlist_assignment_status='active' and student_pk = "+id+")";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of recording ");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	public int craeteStudentPlaylistMapping(String s, String tid, String sid) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		StringTokenizer sto = new StringTokenizer(s,",");
		String query = "";
		while(sto.hasMoreTokens()) {
			String token = sto.nextToken();
			String queryExist = "select student_playlist_assignment_id from student_playlist_assignment where playlist_id="+token+" and student_pk="+sid;
			//System.out.println(queryExist);
			ResultSet rs =  dbconn.getStmt().executeQuery(queryExist);
			if(!rs.next())
				query = "insert into student_playlist_assignment (playlist_id,student_pk,teacher_pk) values ("+token+","+sid+","+tid+");";
			else
				query = "update  student_playlist_assignment set student_playlist_assignment_status = 'active' where playlist_id="+token+" and student_pk="+sid;
			//System.out.println(query);
			dbconn.getStmt().executeUpdate(query);
			
		}
		
		dbconn.closeAll();
		return 1;
	}

	public int deletePlaylistStudentMapping(String id, String s) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		StringTokenizer sto = new StringTokenizer(s,",");
		String query = "";
		while(sto.hasMoreTokens()) {
			query = "update student_playlist_assignment set student_playlist_assignment_status = 'deactivated' where student_pk = "+id+" and playlist_id="+sto.nextToken();
			dbconn.getStmt().executeUpdate(query);
			
		}
		dbconn.closeAll();
		return 1;
	}

	public int deletePlaylistRecordingMapping(String s, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		StringTokenizer sto = new StringTokenizer(s,",");
		String query = "";
		while(sto.hasMoreTokens()) {
			query = "update recording_playlist_mapping set recording_playlist_mapping_status = 'deactivated' where recording_id = "+sto.nextToken()+" and playlist_id="+id;
			System.out.println(query);
			dbconn.getStmt().executeUpdate(query);
			
		}
		dbconn.closeAll();
		return 1;
	}

}
