package org.hitham.HITHAM.service;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.StudentLoginModel;

public class StudentLoginService {

	public int validateLogin(StudentLoginModel login) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		ResultSet rs;
		String userid = login.getStudent_id();
		String password = login.getStudent_password();
		String query = "select * from student where student_id ='"+userid+"' and student_password = '"+password+"'";
		rs = dbconn.getStmt().executeQuery(query);
		if(rs.next()) {
			dbconn.closeAll();
			return 0;
		}
		else{
			dbconn.closeAll();
			return 1;
		}
	}
}
