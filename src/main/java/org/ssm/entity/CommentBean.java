package org.ssm.entity;

import java.util.Date;

import lombok.Data;

@Data
public class CommentBean {
	
	private Integer orderID;
	private Integer memID;
	private String memName;
	private Integer layoutID;
	private String comment;
	private Date commDate;
	private String reply;
	private Date replyDate;
	private Integer service;
	private Integer device;
	private Integer environment;

}
