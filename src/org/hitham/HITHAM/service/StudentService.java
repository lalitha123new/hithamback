package org.hitham.HITHAM.service;


import java.sql.ResultSet;
import java.sql.SQLException;

import org.hitham.HITHAM.database.Convertor;
import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.StudentModel;

public class StudentService {

	public int insert(StudentModel sm) throws SQLException{
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String student_name = sm.getStudent_name();
		String student_id = sm.getStudent_id();
		String student_password = sm.getStudent_password();
		String student_profile = sm.getStudent_profile();
		String query = "insert into student (student_name,student_id,student_password,student_profile) values ('"+student_name+"','"+student_id+"','"+student_password+"','"+student_profile+"')";
		System.out.println(query);
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
		return 1;
	}

	public String fetchList() throws SQLException{
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return null;
		}
		String query = "select * from student";
		try{
			ResultSet rs =  dbconn.getStmt().executeQuery(query);
			String result = Convertor.convertToJSON(rs).toString();
			dbconn.closeAll();
			return result;
		}
		catch(Exception e) {
			System.out.println("Exception in fetchList of student");
			System.out.println(e.getMessage());
			dbconn.closeAll();
			return "{}";
		}
		
		
	}

	public int delete(String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String query = "update student set student_status = 'deactivated' where student_pk = "+id;
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

	public int update(StudentModel sm, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String student_name = sm.getStudent_name();
		String student_id = sm.getStudent_id();
		//String student_password = sm.getStudent_password();
		String student_profile = sm.getStudent_profile();
		String query = "update student set student_name ='"+student_name+"',student_id='"+student_id+"',student_profile='"+student_profile+"' where student_pk="+id;
		//System.out.println(query);
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

	public int changePwd(StudentModel sm, String id) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		String student_password = sm.getStudent_password();
		
		String query = "update student set student_password ='"+student_password+"' where student_pk="+id;
		
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
}
