package org.hitham.HITHAM.service;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.StringTokenizer;

import org.json.JSONArray;
import org.hitham.HITHAM.database.Convertor;
import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.TeacherModel;

public class TeacherService {

	public int insert(TeacherModel sm) throws SQLException{
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String teacher_name = sm.getTeacher_name();
		String teacher_id = sm.getTeacher_id();
		String teacher_password = sm.getTeacher_password();
		String query = "insert into teacher (teacher_name,teacher_id,teacher_password) values ('"+teacher_name+"','"+teacher_id+"','"+teacher_password+"')";
		System.out.println(query);
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return 1;
	}

	public JSONArray fetchList() throws SQLException{
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from teacher";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of teacher");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
		
		
	}

	public int delete(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String query = "update teacher set teacher_status = 'deactivated' where teacher_pk = "+id;
		try {
			dbconn.getStmt().executeUpdate(query);
			dbconn.closeAll();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dbconn.closeAll();
		}
		
		return 1;
	}

	public int update(TeacherModel sm, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String teacher_name = sm.getTeacher_name();
		String teacher_id = sm.getTeacher_id();
		//String teacher_password = sm.getTeacher_password();
		String query = "update teacher set teacher_name ='"+teacher_name+"',teacher_id='"+teacher_id+"' where teacher_pk="+id;
		//System.out.println(query);
		try {
			dbconn.getStmt().executeUpdate(query);
			dbconn.closeAll();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dbconn.closeAll();
			return 10;
		}
		
		return 1;
	}
	
	public int changePwd(TeacherModel sm, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		
		String teacher_password = sm.getTeacher_password();
		String query = "update teacher set teacher_password ='"+teacher_password+"' where teacher_pk="+id;
		//System.out.println(query);
		try {
			dbconn.getStmt().executeUpdate(query);
			dbconn.closeAll();
		} 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			dbconn.closeAll();
			return 10;
		}
		
		return 1;
	}

	public JSONArray fetchStudentList(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from student where student_status = 'active' and student_pk not in (select student_pk from teacher_student_mapping where teacher_student_mapping_status = 'active'  and teacher_pk = "+id+")";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of student mapping ");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	public int craeteTeacherStudentMapping(String s,String id) throws SQLException {
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
			String queryExist = "select  teacher_student_mapping_id from teacher_student_mapping where teacher_pk="+id+" and student_pk="+token;
			ResultSet rs =dbconn.getStmt().executeQuery(queryExist);
			if(!rs.next())
				query = "insert into teacher_student_mapping (teacher_pk,student_pk) values ("+id+","+token+");";
			else
				query = "update  teacher_student_mapping set teacher_student_mapping_status = 'active' where teacher_pk="+id+" and student_pk="+token;
			dbconn.getStmt().executeUpdate(query);
			
		}
		if(!query.equals("")) {
			dbconn.closeAll();
			return 1;
		}
		dbconn.closeAll();
		return 0;
	}

	public JSONArray fetchAssignedStudentList(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from student where student_status = 'active' and student_pk in (select student_pk from teacher_student_mapping where teacher_student_mapping_status = 'active' and teacher_pk = "+id+")";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			JSONArray result = Convertor.convertToJSON(rs);
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of already assigned student mapping ");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return null;
		}
	}

	public int deleteTeacherStudentMapping(String teacher_pk, String s) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		StringTokenizer sto = new StringTokenizer(s,",");
		String query = "";
		while(sto.hasMoreTokens()) {
			 query = "update teacher_student_mapping set teacher_student_mapping_status = 'deactivated' where teacher_pk = "+teacher_pk+" and student_pk="+sto.nextToken();
			dbconn.getStmt().executeUpdate(query);
			
		}
		
		dbconn.closeAll();
		return 1;
		
	}

}
