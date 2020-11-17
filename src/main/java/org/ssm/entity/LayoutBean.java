package org.ssm.entity;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class LayoutBean {
	
	private Integer l_id;
	private String name;
	private String summarize;
	private String describe;//������ʣ������ݿ���ֱ���û������Ҫ���ϱ��޶�layut_info.limit
	private String image;
	private Double price;
	private String bed_type;
	private Integer bed_num;
	private Integer area;
	private Integer limit;//������ʣ������ݿ���ֱ���û������Ҫ���ϱ��޶�layut_info.limit
	private Date create_date;
	private Date modif_date;
	private Integer state;
	//����Ϊ�����ݿ��ֶ�
	private Boolean available;//���ֶ�,�Ƿ��пշ�
	private Integer availRoomNum;//���෿����
	private Integer allRoomNum;//ȫ��������
    private List<RoomBean> rooms;//���ֶ�
    private List<String> images;//���ֶ�

}
