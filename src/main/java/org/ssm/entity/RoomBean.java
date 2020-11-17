package org.ssm.entity;

import lombok.Data;

@Data
public class RoomBean {
	
	private Integer r_id;
	private String plate;
	private Integer l_id;
	private Integer floor;
	private Integer state;
	private Boolean booked;//���ֶΣ��Ƿ�Ԥ��
}
