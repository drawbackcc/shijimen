package org.ssm.entity;

import java.util.Date;

import lombok.Data;

@Data
public class MemberBean {
	
	private Integer memID;
	private String name;
	private String phone;
	private String password;
	private Integer gender;
	private String email;
	private String address;
	private Integer point;
	private Date regDate;
	private String selfPs;
	private String otherPs;
	private Integer state;

}
