package org.hitham.HITHAM.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseConnection {
	
private Connection conn = null;
private Statement stmt = null;
private boolean status;
private String URL = "jdbc:mysql://localhost/hitham?useSSL=false";
private String Username = "root";
//local db
private String Password = "";

//AWS server db
//private String Password = "thanks@123";

//EHRC server db
//private String Password = "ehrc1234";


public DatabaseConnection() 
	{
		status = false;
		try{
			Class.forName("com.mysql.jdbc.Driver");
			conn=DriverManager.getConnection(URL,Username,Password);
			
			stmt = conn.createStatement();
			status = true;
		}
		catch(SQLException e){
			e.printStackTrace();
			System.out.println(""+e.getMessage());
		}
		catch(ClassNotFoundException e){
			e.printStackTrace();
			System.out.println(""+e.getMessage());
		}
	}
	
	public void createConn() {
		try{
			conn=DriverManager.getConnection(URL,Username,Password);
			stmt = conn.createStatement();
			status = true;
		}
		catch(SQLException e){
			e.printStackTrace();
			System.out.println(""+e.getMessage());
		}
		
	}

	public Connection getConn() {
		return conn;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

	public Statement getStmt() {
		return stmt;
	}

	public void setStmt(Statement stmt) {
		this.stmt = stmt;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	public void closeAll() throws SQLException{
		try{
			stmt.close();
		}
		finally{
			conn.close();
		}
		
	}
}

