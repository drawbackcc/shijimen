package org.ssm.entity;

import java.util.Date;

import lombok.Data;

@Data
public class EmployeeBean {
	
	private Integer emplID;
	private String emplNum;
	private String password;
	private String name;
	private Integer gender;
	private String idCard;
	private String image;
	private String phone;
	private String email;
	private String address;
	private Date createDate;
	private Date employDate;
	private Integer type;
	private Integer state;

}
