package org.hitham.HITHAM.service;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.Login;

public class LoginService {

	public int validateLogin(Login login) throws SQLException {
		// TODO Auto-generated method stub
		DatabaseConnection dbconn = new DatabaseConnection();
		if(! dbconn.isStatus()){
			dbconn.closeAll();
			return 10;
		}
		ResultSet rs;
		String userid = login.getusername();
		String password = login.getpassword();
		String query = "select * from admin where admin_username ='"+userid+"' and admin_password = '"+password+"'";
		System.out.println(query);
		rs = dbconn.getStmt().executeQuery(query);
		if(rs.next()) {
			dbconn.closeAll();
			return 0;
		}
		else
		{
			String query1 = "select * from teacher where teacher_id ='"+userid+"' and teacher_password = '"+password+"'";
			ResultSet rs1 = dbconn.getStmt().executeQuery(query1);
			if(rs1.next()){
				dbconn.closeAll();
				return 1;
			}
		}
		dbconn.closeAll();
		return 2;
		
	}
}
