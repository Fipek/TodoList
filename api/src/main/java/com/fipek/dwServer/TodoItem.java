package com.fipek.dwServer;

import java.sql.Date;
import java.util.ArrayList;


public class TodoItem {
		private int id;
		private int parentId;
		private String title;
	    private String description;
	    private String deadline;
	    private String status;
	    private String createDate;
	    private ArrayList<Integer> dependency;
		
	    public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public int getParentId() {
			return parentId;
		}
		public void setParentId(int parentId) {
			this.parentId = parentId;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getDeadline() {
			return deadline;
		}
		public void setDeadline(String deadline) {
			this.deadline = deadline;
		}
		
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getCreateDate() {
			return createDate;
		}
		public void setCreateDate(String createDate) {
			this.createDate = createDate;
		}
		public ArrayList<Integer> getDependency() {
			return dependency;
		}
		public void setDependency(ArrayList<Integer> dependency) {
			this.dependency = dependency;
		}

	    
}
