package org.ssm.entity;

import java.util.Date;

import lombok.Data;

@Data
public class PersonBean {
	private Integer personID;
	private Integer orderID;
	private Integer gender;
	private String name;
	private String idCard;
	private String phone;
	private String ps;
	//
	private Date inDate;//��סʱ��
	private Integer inID;//������ס�Ĺ�Աid
	private String inNum;//������ס�Ĺ�Ա����
	private String inName;//������ס�Ĺ�Ա����
	private Date outDate;//�˷�ʱ��
	private Integer outID;//�����˷��Ĺ�Աid
	private String outNum;//�����˷��Ĺ�Ա����
	private String outName;//�����˷��Ĺ�Ա����
}
