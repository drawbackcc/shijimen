package org.ssm.entity;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class OrderBean {
	
	private Integer orderID;//����id
	private String orderNum;//�������
	private String alipayNo;//֧�������׺�
	private Integer memID;//��Աid
	private String memName;
	private String memNum;//��ʵ����ע����ֻ�����
	private Integer layoutID;
	private String layoutName;
	private String orderImage;
//	private String layoutImages;
	private Integer roomID;//����id
	private String roomPlate;
	private String describe;//����
	private String plus;
	private Double price;//
	private Double charge;//
	private Double realCharge;//
	private Integer payState;//�Ƿ��Ѹ���
	private Date date;//������������
	private Date fromDate;//Ԥ����ס����
	private Date toDate;//Ԥ���˷�����
	
	private Date inDate;//��סʱ��
	private Date outDate;//�˷�ʱ��
	
	private Integer dealID;//����ԤԼ�Ĺ�Աid
	private String dealName;
	private String dealNum;
	private Integer cancelID;//ȡ�������Ĺ�Աid
	private String cancelName;
	private String cancelNum;
	private Date cancelDate;//ȡ����������
	private Integer state;//����״̬�����/ȡ��
	private List<PersonBean> persons;
	private Boolean checkIn;
	private List<PersonBean> contacts;
	private CommentBean comment;

}
