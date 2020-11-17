package org.ssm.tool;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class DateTimeTool {
	
	public String getLastDayOfMonth(String yearMonth) {//��̬��������
		int year = Integer.parseInt(yearMonth.split("-")[0]);  //��
		int month = Integer.parseInt(yearMonth.split("-")[1]); //��
		Calendar cal = Calendar.getInstance();
		// �������
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		int lastDay = cal.getMinimum(Calendar.DATE);
		cal.set(Calendar.DAY_OF_MONTH, lastDay - 1);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(cal.getTime());
	}
	public String getFirstDayOfMonth(String yearMonth) {
		int year = Integer.parseInt(yearMonth.split("-")[0]);  //��
		int month = Integer.parseInt(yearMonth.split("-")[1]); //��
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month - 1); 
		cal.set(Calendar.DAY_OF_MONTH, 1); 
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(cal.getTime());
	}

}
