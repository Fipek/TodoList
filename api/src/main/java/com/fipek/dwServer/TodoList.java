package com.fipek.dwServer;

import java.util.ArrayList;

public class TodoList {
	
	private int listId;
	private String title;
	private String createDate;
	private String user;
	private ArrayList<TodoItem> todoItemLists;
	
	public int getListId() {
		return listId;
	}
	public void setListId(int listId) {
		this.listId = listId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public ArrayList<TodoItem> getTodoItemLists() {
		return todoItemLists;
	}
	public void setTodoItemLists(ArrayList<TodoItem> todoItemLists) {
		this.todoItemLists = todoItemLists;
	}
}
