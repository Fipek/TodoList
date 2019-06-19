package com.fipek.dwServer;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.stream.Collectors;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import com.fipek.dwServer.Database.Database;
import com.google.gson.Gson;

@Path("/todo")
@Produces(MediaType.APPLICATION_JSON)
public class CategoryRESTController {

	    private final Validator validator;
	 
	    public CategoryRESTController(Validator validator) {
	        this.validator = validator;
	    }
	    
	    
	    @POST
	    @Path("/list/create")
	    @Consumes(MediaType.APPLICATION_JSON)
	    public Response CreateTodoList(InputStream request) {
	    	try {
	        	String result = new BufferedReader(new InputStreamReader(request))
	                    .lines().collect(Collectors.joining("\n"));
	        	Gson gson = new Gson();
	        	TodoList todoList = gson.fromJson(result, TodoList.class);
	        	
	        	Database Db = new Database(); 
	        	Db.CreateTodoList(todoList);

	        	return Response.ok()
		        		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.header("Access-Control-Max-Age", "151200")
		        		.build();
	        }catch(Exception e) {
	        	System.out.println(e.getMessage());
	        	return Response.status(Status.NOT_FOUND).header("Access-Control-Allow-Origin", "*").build();
	        }
	    }
	    
	    @POST
	    @Path("/task/create")
	    @Consumes(MediaType.APPLICATION_JSON)
	    public Response createTask(InputStream var) {
	    	try {
	        	String result = new BufferedReader(new InputStreamReader(var))
	                    .lines().collect(Collectors.joining("\n"));
	        	Gson gson = new Gson();
	        	TodoItem myUser = gson.fromJson(result, TodoItem.class);
	        	
	        	Database Db = new Database(); 
	        	Db.CreateTodoItem(myUser);
	        	
	        	return Response.ok()
		        		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.header("Access-Control-Max-Age", "151200")
		        		.build();
	        }catch(Exception e) {
	        	System.out.println(e.getMessage());
	        	return Response.status(Status.NOT_FOUND).header("Access-Control-Allow-Origin", "*").build();
	        }
	    }
	    
	    @GET
	    @Path("/list/get/{user}")
	    public Response getTodoList(@PathParam("user") String user) {
	    	Database Db = new Database();
            ArrayList<TodoList> todoList = Db.GetTodoList(user);
	    	if (todoList != null)
	            return Response.ok(todoList)
	            		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.build();
	        else
	            return Response.status(Status.NOT_FOUND).build();
	    }
	    
	    @GET
	    @Path("/task/get/{listId}")
	    public Response getTasks(@PathParam("listId") int listId) {
	    	Database Db = new Database();
            ArrayList<TodoItem> todoItemList = Db.GetTodoTaskList(listId);
	            return Response.ok(todoItemList)
	            		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.build();
	    }
	    
	    @DELETE
	    @Path("/task/delete/{taskId}")
	    public Response deleteTask(@PathParam("taskId") int taskId) {
	    	Database Db = new Database();
            Db.DeleteTask(taskId);
	            return Response.ok()
	            		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.build();
	    }
	    
	    @DELETE
	    @Path("/list/delete/{listId}")
	    public Response deleteList(@PathParam("listId") int listId) {
	    	Database Db = new Database();
            Db.DeleteList(listId);
	            return Response.ok()
	            		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.build();
	    }
	    
	    @POST
	    @Path("/task/set-status")
	    @Consumes(MediaType.APPLICATION_JSON)
	    public Response checkTask(InputStream request) {
	    	try {
	        	String requestJson = new BufferedReader(new InputStreamReader(request))
	                    .lines().collect(Collectors.joining("\n"));
	        	Gson gson = new Gson();
	        	TodoItem todoItem = gson.fromJson(requestJson, TodoItem.class);
	        	
	        	Database Db = new Database(); 
	        	Db.SetTaskStatus(todoItem);
	        	
	        	return Response.ok()
		        		.header("Access-Control-Allow-Origin", "*")
		        		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
		        		.header("Access-Control-Max-Age", "151200")
		        		.build();
	        }catch(Exception e) {
	        	System.out.println(e.getMessage());
	        	return Response.status(Status.NOT_FOUND).header("Access-Control-Allow-Origin", "*").build();
	        }
	    }
	  
}
