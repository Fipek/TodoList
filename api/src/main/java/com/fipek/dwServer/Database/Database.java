package com.fipek.dwServer.Database;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.fipek.dwServer.TodoItem;
import com.fipek.dwServer.TodoList;
import com.fipek.dwServer.Utils.CommonUtil;

public class Database {

	 private Connection connect() {  
	        // SQLite connection string  
	        String url = "jdbc:sqlite:todo.db";  
	        Connection conn = null;  
	        try {
	        	Class.forName("org.sqlite.JDBC");
	            conn = DriverManager.getConnection(url);  
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	        } catch(ClassNotFoundException e) {
	        	System.out.println(e.getMessage());  
	        }
	        return conn;  
	  }
	   
	 	public void CreateTodoList(TodoList todoList) { 
	        String sql = "INSERT INTO TODO_LIST(TITLE, CREATE_DATE, USER) VALUES(?,?,?)";  
	   
	        try{  
	            Connection conn = this.connect();  
	            PreparedStatement pstmt = conn.prepareStatement(sql);  
	            pstmt.setString(1, todoList.getTitle()); 
	            pstmt.setString(2, CommonUtil.getDateNow());
	            pstmt.setString(3, todoList.getUser());
	            pstmt.executeUpdate();  
	            conn.close();
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	        }
	    } 
	  
	    public void CreateTodoItem(TodoItem item) { 
	        String sql = "INSERT INTO TODO_ITEM(PARENT_ID, TITLE, DESCRIPTION, DEADLINE, STATUS, CREATE_DATE) VALUES(?,?,?,?,?,?)";  
	        
	        try{  
	            Connection conn = this.connect();  
	            PreparedStatement statement = conn.prepareStatement(sql);  
	            statement.setInt(1, item.getParentId()); 
	            statement.setString(2, item.getTitle());
	            statement.setString(3, item.getDescription());
	            statement.setString(4,item.getDeadline());
	            statement.setString(5, "Active");
	            statement.setString(6, CommonUtil.getDateFormat(item.getDeadline()));
	            int affectedRows = statement.executeUpdate();
	            if (affectedRows == 0) {
	                throw new SQLException("Creating user failed, no rows affected.");
	            }

	            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
	                if (generatedKeys.next()) {
	                	CreateLinkWithListAndItem(conn, item.getParentId(), (int)generatedKeys.getLong(1));
	                	if(!item.getDependency().isEmpty()) {
	                		CreateDependencyWithItem(conn,item,(int)generatedKeys.getLong(1));
	                	}
	                	conn.close();
	                }
	                else {
	                    throw new SQLException("Creating user failed, no ID obtained.");
	                }
	            }
	            
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	        }
	    }
	    
	    private void CreateDependencyWithItem(Connection conn, TodoItem item, int taskId) {
	    	String sql = "INSERT INTO TODO_ITEM_DEPENDENCY(LIST_ID, TASK_ID, DEPENDENT_TASK_ID) VALUES(?,?,?)";  
	    	try{
	    		for(int i=0;i < item.getDependency().size();i++) {
	    			PreparedStatement statement = conn.prepareStatement(sql);  
		            statement.setInt(1, item.getParentId()); 
		            statement.setInt(2, taskId);
		            statement.setInt(3, item.getDependency().get(i));
		            statement.executeUpdate();  
	    		}
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	        }
	    }
	    
	    private void CreateLinkWithListAndItem(Connection conn, int listId, int taskId) {
	    	String sql = "INSERT INTO TODO_LIST_ITEMS(LIST_ID, TASK_ID) VALUES(?,?)";  
	    	try{  
	            PreparedStatement statement = conn.prepareStatement(sql);  
	            statement.setInt(1, listId); 
	            statement.setInt(2, taskId);
	            statement.executeUpdate();  
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	        }
	    }
	    
	    public ArrayList<TodoList> GetTodoList(String user) { 
	        String sql = "SELECT * FROM TODO_LIST WHERE USER='"+user+"'";
	        String sql2 = "SELECT TITLE,STATUS FROM TODO_ITEM WHERE PARENT_ID="; 
	   
	        try{  
	            Connection conn = this.connect(); 
	            Statement stmt  = conn.createStatement();  
	            ResultSet rs    = stmt.executeQuery(sql);  
	            ArrayList<TodoList> todoListArray= new ArrayList<TodoList>();
	            while (rs.next()) {
	            	TodoList todoList = new TodoList();
	            	todoList.setListId(rs.getInt("LIST_ID"));
	            	todoList.setTitle(rs.getString("TITLE"));
	            	todoList.setCreateDate(rs.getString("CREATE_DATE"));
	            	ArrayList<TodoItem> todoItemArray= new ArrayList<TodoItem>();
	            	Statement statement2  = conn.createStatement();
	            	ResultSet rs2 = statement2.executeQuery(sql2+todoList.getListId());
	            	while (rs2.next()) {
	            		if(rs2.getRow() < 3) {
	            			TodoItem todoItem = new TodoItem();
			            	todoItem.setTitle(rs2.getString("TITLE"));
			            	todoItem.setStatus(rs2.getString("STATUS"));
			            	todoItemArray.add(todoItem);
	            		}else {
	            			break;
	            		}
		            }
	            	todoList.setTodoItemLists(todoItemArray);
	            	todoListArray.add(todoList);
	            }
	            conn.close();
	            return todoListArray;
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	            return null;
	        }
	    }
	    
	    public ArrayList<TodoItem> GetTodoTaskList(int listId) { 
	        String sql = "SELECT TASK_ID FROM TODO_LIST_ITEMS WHERE LIST_ID="+listId;
	        String sql2 = "SELECT * FROM TODO_ITEM WHERE ID=";
	   
	        try{  
	            Connection conn = this.connect();  
	            Statement statement  = conn.createStatement();  
	            ResultSet rs = statement.executeQuery(sql);  
	            ArrayList<TodoItem> todoListArray= new ArrayList<TodoItem>();
	            if (rs.next() == false) { 
	            	System.out.println("ResultSet in empty in Java");
	            	return null;
	            }else {
	            	do { 
		            	TodoItem todoItem = new TodoItem();
		            	Statement statement2  = conn.createStatement();
		            		int taskId = rs.getInt(1);
		            		ResultSet rs2 = statement2.executeQuery(sql2+taskId);
		            	
		            		todoItem.setId(rs2.getInt("ID"));
		            		todoItem.setParentId(rs2.getInt("PARENT_ID"));
		            		todoItem.setTitle(rs2.getString("TITLE"));
		            		todoItem.setDescription(rs2.getString("DESCRIPTION"));
		            		todoItem.setDeadline(rs2.getString("DEADLINE"));
		            		todoItem.setStatus(rs2.getString("STATUS"));
		            		todoItem.setCreateDate(rs2.getString("CREATE_DATE"));
		            		todoItem.setDependency(GetDependentItems(conn,todoItem.getId()));
		            		todoListArray.add(todoItem);
	            		}while (rs.next());
	            	conn.close();
	            	return todoListArray;
	            }
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());  
	            return null;
	        }
	    }
	    
	    private ArrayList<Integer> GetDependentItems(Connection conn, int taskId) {
	    	String sql = "SELECT DEPENDENT_TASK_ID FROM TODO_ITEM_DEPENDENCY WHERE TASK_ID="+taskId;
	    	try{
	    		Statement statement  = conn.createStatement();
		    	ResultSet rs = statement.executeQuery(sql);
		    	ArrayList<Integer> dependentTaskList = new ArrayList<Integer>();
	    		while (rs.next()) {
		            	dependentTaskList.add(rs.getInt(1));
	            }
	    		return dependentTaskList;
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage()); 
	            return null;
	        }
	    }
	    
	    public void DeleteTask(int taskId) { 
	        String sql  = "DELETE FROM TODO_LIST_ITEMS WHERE TASK_ID="+taskId;
	        String sql2 = "DELETE FROM TODO_ITEM WHERE ID="+taskId;
	        String sql3 = "DELETE FROM TODO_ITEM_DEPENDENCY WHERE TASK_ID="+taskId+" OR DEPENDENT_TASK_ID="+taskId;
	        try{  
	            Connection conn = this.connect();  
	            Statement statement  = conn.createStatement();  
	            statement.executeUpdate(sql);
	            statement.executeUpdate(sql2);
	            statement.executeUpdate(sql3);
	            conn.close();
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());     
	        }
	    }
	    
	    public void DeleteList(int listId) {
	        String sql  = "DELETE FROM TODO_LIST WHERE LIST_ID="+listId;
	        String sql2 = "DELETE FROM TODO_ITEM WHERE PARENT_ID="+listId;
	        String sql3 = "DELETE FROM TODO_LIST_ITEMS WHERE LIST_ID="+listId;
	        String sql4 = "DELETE FROM TODO_ITEM_DEPENDENCY WHERE LIST_ID="+listId;
	        try{  
	            Connection conn = this.connect();  
	            Statement statement  = conn.createStatement();  
	            statement.executeUpdate(sql);
	            statement.executeUpdate(sql2);
	            statement.executeUpdate(sql3);
	            statement.executeUpdate(sql4);
	            conn.close();
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());     
	        }
	    }
	    
	    public void SetTaskStatus(TodoItem todoItem) { 
	        String sql  = "UPDATE TODO_ITEM SET STATUS= ? WHERE ID= ?";
	        String sql2 = "DELETE FROM TODO_ITEM_DEPENDENCY WHERE DEPENDENT_TASK_ID="+todoItem.getId();
	        try{  
	            Connection conn = this.connect();
	            PreparedStatement pstmt = conn.prepareStatement(sql);
	            pstmt.setString(1,todoItem.getStatus());
	            pstmt.setInt(2,todoItem.getId());
	            pstmt.executeUpdate();
	            if("Done".equals(todoItem.getStatus())){
	            	Statement statement  = conn.createStatement();  
	            	statement.executeUpdate(sql2);
	            }
	            conn.close();
	        } catch (SQLException e) {  
	            System.out.println(e.getMessage());     
	        }
	    }
	    
}
