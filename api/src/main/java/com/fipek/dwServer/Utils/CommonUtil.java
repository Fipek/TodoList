package com.fipek.dwServer.Utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class CommonUtil {
	
	private static final DateFormat sdf = new SimpleDateFormat("dd/MM/yyy");

	public static String getDateNow() {
		//LocalDate localDate = LocalDate.now();
		//String date = DateTimeFormatter.ofPattern("dd/MM/yyy").format(localDate);
		Date date = new Date();
		String stringFormat =sdf.format(date);  
		System.out.println(stringFormat);
        return stringFormat;
	}
	
	public static String getDateFormat(String date) {
		Date dateFormat;
		try {
			dateFormat = new SimpleDateFormat("yyy-MM-dd").parse(date);
			String stringFormat =sdf.format(dateFormat);
	        System.out.println(date);
	        return date;
		} catch (ParseException e) {
			System.out.println(e.getMessage());
			return e.getMessage();
		}  
		
	}
}
