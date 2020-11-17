package org.ssm.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ssm.entity.OrderBean;
import org.ssm.entity.PersonBean;

@Mapper
public interface OrderMapper {
	/*
	 * 
	 * */
	public List<OrderBean> getOrderInfoList(Map<String, Object> params);
	
	public List<PersonBean> getPersonListOfOrder(Map<String, Object> params);
	
	public List<PersonBean> getContactListOfOrder(@Param("orderID")Integer orderID);
	
	public Integer getOrderInfoNum(Map<String, Object> params);
	
	public List<Integer> getOrderIdListByPeople(@Param("people")String people);
	
	public List<Integer> getOrderIdListByEmployee(@Param("ids")List<Integer> ids);
	
	public Integer deleteOrderByBatch(@Param("ids")int[] ids);
	
	public Integer cancelOrderByBatch(@Param("ids")int[] ids, @Param("employeeID")Integer emloyeeID, @Param("cancelDate")Date cancelDate);
	
	public Integer insertOrderByBatch(@Param("list")List<OrderBean> orders);
	
	//��������ס����Ϣ
	public Integer insertPersonByBatch(@Param("persons")List<PersonBean> persons);
	//��ϵ����Ϣ
	public Integer insertContactByBatch(@Param("persons")List<PersonBean> persons);
	
	public Integer updatePersonCheckStateByBatch(@Param("ids")int[] ids, @Param("inDate")Date inDate, @Param("inID")Integer inID, @Param("outDate")Date outDate, @Param("outID")Integer outID);
	
	public Integer updateOrderPayState(@Param("orderID")Integer orderID, @Param("realCharge")Double realCharge, @Param("payState")Integer payState);
	
	public Integer updateOrderAliPayState(@Param("orderNum")String orderNo, @Param("alipayNo")String alipayNo, @Param("realCharge")Double realCharge, @Param("payState")Integer payState);
	

}
