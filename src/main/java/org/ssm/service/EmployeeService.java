package org.ssm.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ssm.entity.*;
import org.ssm.mapper.*;


@Service
public class EmployeeService {
	@Autowired
	EmployeeMapper employeeMapper;
	@Autowired MemberMapper memberMapper;
	@Autowired LayoutMapper layoutMapper;
	@Autowired RoomMapper roomMapper;
	@Autowired OrderMapper orderMapper;
	@Autowired HttpSession session;
	
    public EmployeeBean getEmployeeBeanService(Integer emplID, String emplNum, Integer type, String password) {
		Map<String, Object> params = new HashMap<>();
		params.put("emplID", emplID);
		params.put("emplNum", emplNum);
//		params.put("type", type);
		params.put("state", 1);
		List<EmployeeBean> list = employeeMapper.getEmployeeList(params);
		if(list.size() <= 0) return null;
		EmployeeBean employee = list.get(0);
		if(password == null || password.equals(employee.getPassword())) {
			employee.setPassword(null);
			return employee;
		}
		return null;
	}
    
    public Map<String, Object> getLayoutDataService(Date fromDate, Date toDate){
    	Map<String, Object> params = new HashMap<>();
    	try {
			if(fromDate == null || toDate == null || fromDate.compareTo(toDate) >= 0) throw new Exception();
			params.put("lState", 1);//ֻѡ�����Ч�ķ�����Ϣ
			params.put("rState", 1);
			List<LayoutBean> allLayouts = layoutMapper.getLayoutAndRoomBeans(params);
			params.put("from", fromDate);
			params.put("to", toDate);
			List<Integer> bookedRoomIds = roomMapper.getBookedRoomIdList(fromDate, toDate, 1);
			for (LayoutBean layout : allLayouts) {
				layout.setAllRoomNum(layout.getRooms() == null ? 0 : layout.getRooms().size());
				int availableRoomNum = layout.getAllRoomNum();
				for (RoomBean room : layout.getRooms()) {
					if(bookedRoomIds.contains(room.getR_id())) -- availableRoomNum;
				}
				layout.setAvailRoomNum(availableRoomNum);
				layout.setAvailable(availableRoomNum == 0 ? false : true);
				layout.setRooms(null);//���ϸ��
				layout.setImage(null);
			}
			params.put("rows", allLayouts);
			params.put("total", allLayouts.size());
			params.put("status", true);
			params.put("message", "����ɹ�");
		} catch (Exception e) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��������");
		}
    	return params;
    }
    
    public Map<String, Object> getLayoutDetailService(Integer layoutID, Date fromDate, Date toDate){
    	Map<String, Object> params = new HashMap<>();
    	try {
			params.put("lID", layoutID);
			params.put("rState", 1);
			params.put("lState", 1);
			List<LayoutBean> layouts = layoutMapper.getLayoutBeans(params);
			if(layouts == null || layouts.size() == 0) throw new Exception();
			List<RoomBean> rooms = roomMapper.getRoomList(params);
			List<Integer> bookedRoomIds = roomMapper.getBookedRoomIdList(fromDate, toDate, 1);
			for (RoomBean room : rooms) {
				room.setBooked(bookedRoomIds.contains(room.getR_id()) ? true : false);//��
			}
			layouts.get(0).setImage(null);
			params.put("status", true);
			params.put("rooms", rooms);
			params.put("layout", layouts.get(0));
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "���Ͳ�����");
			e.printStackTrace();
		}
    	return params;
    }
    
    public Map<String, Object> getAddOrderService(OrderBean order){
    	Map<String, Object> params = new HashMap<>();
    	try {
    		Boolean checkIn = order.getCheckIn();
    		Integer employeeID = (Integer)session.getAttribute("employeeID");
    		List<PersonBean> persons = order.getPersons();   		
    		if(employeeID == null) {
    			params.put("status", false);
    			params.put("message", "��û��Ȩ�޽��д˲����������˺��ѵǳ��������µ�¼");
    		}else if(persons == null || persons.size() <= 0 || checkIn == null || 
    				order.getRoomID() == null || order.getFromDate() == null || order.getToDate() ==null || 
    				order.getCharge() == null || order.getRealCharge() == null || order.getPrice() == null){
    			throw new Exception();   			
    		}else {//�������ǰ��������ע�룬���Ի�Ҫ����һ�£��Ȳ�����   	
    			String layoutImage = layoutMapper.getLayoutImage(order.getLayoutID());
				if(layoutImage != null) {
					String[] strings = layoutImage.split(",");
					if(strings != null && strings.length > 0) {
						order.setOrderImage(strings[0]);
					}
				}
				order.setOrderNum(getOrderNum());
				order.setDealID(employeeID);
				order.setPayState(1);
				if(checkIn) order.setInDate(new Date());
				List<OrderBean> list = new ArrayList<OrderBean>();//д������������Ϊ���Ժ����������
				list.add(order);
				orderMapper.insertOrderByBatch(list);	//������������	
				Integer orderID = order.getOrderID();
				if(checkIn) {
					for (PersonBean person : persons) {
						person.setOrderID(orderID);
						person.setInDate(new Date());
						person.setInID(employeeID);
					}
				}else {
					for (PersonBean person : persons) person.setOrderID(orderID);
				}
				orderMapper.insertPersonByBatch(persons);
				params.put("status", true);
			    params.put("message", "�����ɹ�");
    		    System.out.println(order);
			}   		
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "����ʧ��");
			e.printStackTrace();
		}
    	return params;
    }
    
    private String getOrderNum() {
    	DateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		int num = new Random().nextInt(999999);
		if(num < 100000) num += 100000;
		return format.format(new Date()) + num;
    }
    
    public Map<String, Object> getOrderDataService(
    		String type, 
    		Integer state, 
    		String orderNum, 
    		String plate, 
    		String people,
    		String employee,
			Date fromDate, 
			Date toDate, 
			Date startDate, 
			Date endDate,
			String sortName, 
			String sortOrder, 
			Integer offset, 
			Integer pageSize,
			String fromSite){
		Map<String, Object> params = new HashMap<>();
		System.out.println("type:" + type + ",state:" + state + ",orderNum:" + orderNum + ",plate:" + plate + ",people:" + people );
		System.out.println("fromDate:" + fromDate + ",toDate:" + toDate + ",startDate:" + startDate + ",endDate:" + endDate + ",offset:" + offset + ",pageSize:" + pageSize);
		try {
			if(session.getAttribute("employeeID") == null) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�½����");
			return params;
		}else {
			if(employee != null && !employee.equals("")) {//���ݹ�Ա��Ϣѡ���Աid
				List<Integer> employeeIDs = employeeMapper.getEmployeeIdList(employee);
				params.put("dealIDs", employeeIDs);	
			}
			if(people != null && !people.equals("")) {//������ס����Ϣѡ�񶩵�id
				List<Integer> orderIDs = orderMapper.getOrderIdListByPeople(people);
				params.put("orderIDs", orderIDs);//ֻ������ס����Ϣ����
			}
			params.put("fromSite", fromSite);
			params.put("orderType", type);
			params.put("state", state);
			params.put("orderNum", orderNum);
			params.put("plate", plate);
			params.put("fromDate", fromDate);
			params.put("toDate", toDate);
			params.put("startDate", startDate);
			params.put("endDate", endDate);
			Integer total = orderMapper.getOrderInfoNum(params);
			params.put("row", offset);
			params.put("pageSize", pageSize);
			List<OrderBean> list = orderMapper.getOrderInfoList(params);
			params.clear();
			for (OrderBean order : list) {
				order.setOrderImage(null);
			}
			params.put("rows", list);
			params.put("total", total);
			params.put("status", true);
			params.put("message", "����ɹ�");
			return params;
		}
		} catch (Exception e) {
			e.printStackTrace();
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;		
	}
    
    public Map<String, Object> getOrderPersonsDetailService(Integer orderID){
		Map<String, Object> params = new HashMap<>();
		try {
			params.put("orderID", orderID);
			List<PersonBean> list = orderMapper.getPersonListOfOrder(params);
			List<PersonBean> contacts = orderMapper.getContactListOfOrder(orderID);
			params.put("status", true);
			params.put("message", "�����ɹ�");
			params.put("persons", list);
			params.put("contacts", contacts);
			return params;
		} catch (Exception e) {
			e.printStackTrace();
		}
		params.put("status", false);
		params.put("message", "����ʧ��");
		return params;
	}
    
    public Map<String, Object> getOrderAllDetailService(Integer orderID){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("employeeID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			//��ȡ������Ϣ
			//��ȡ������ס����Ϣ
			params.put("orderID", orderID);
			List<PersonBean> list = orderMapper.getPersonListOfOrder(params);
			OrderBean order = orderMapper.getOrderInfoList(params).get(0);
			order.setPersons(list);
			//��ȡ��ϵ����Ϣ
			if(order.getDealID() == null && order.getMemID() != null) {
				List<PersonBean> contacts = orderMapper.getContactListOfOrder(order.getOrderID());
				order.setContacts(contacts);
			}
//			order.setLayoutImages(null);
			//��ȡ��Ա��Ϣ
			Integer memberID = order.getMemID();
			if(memberID != null) {
				params.clear();
				params.put("memID", memberID);
				List<MemberBean> members = memberMapper.getMemberList(params);
				if(members.size() > 0) {
					order.setMemName(members.get(0).getName());
					order.setMemNum(members.get(0).getPhone());
				}
			}
			//��ȡԤԼ�����Ĺ�Ա��Ϣ
			Integer dealID = order.getDealID();
			String emplyeeName = null, employeeNum = null;
			if(dealID != null) {
				params.clear();
				params.put("emplID",dealID);
				List<EmployeeBean> employees = employeeMapper.getEmployeeList(params);
				if(employees.size() > 0) {
					emplyeeName = employees.get(0).getName();
					employeeNum = employees.get(0).getEmplNum();
					order.setDealName(emplyeeName);
					order.setDealNum(employeeNum);
				}
			}
			//��ȡȡ�������Ĺ�Ա��Ϣ
			Integer cancelID = order.getCancelID();
			if(cancelID != null) {
				if(cancelID == dealID) {//���������Ĺ�Ա��ͬһ���ˣ����ò�ѯ
					order.setCancelName(emplyeeName);
				    order.setCancelNum(employeeNum);
				}else {//���²�ѯ
					params.clear();
				    params.put("emplID",cancelID);
				    List<EmployeeBean> employees = employeeMapper.getEmployeeList(params);
				    if(employees.size() > 0) {
					    EmployeeBean e = employees.get(0);
					    order.setCancelName(e.getName());
					    order.setCancelNum(e.getEmplNum());
				    }
				}
				
			}			
//			order.setPersons(list);
			order.setOrderImage(null);
			params.put("status", true);
			params.put("message", "�����ɹ�");
			params.put("order", order);
			
			return params;
		} catch (Exception e) {
			e.printStackTrace();
		}
		params.put("status", false);
		params.put("message", "����ʧ��");
		return params;
	}
    
    public Map<String, Object> getCancelOrderService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		try {
			Integer employeeID = (Integer)session.getAttribute("employeeID");
			if(employeeID == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			if(ids == null || ids.length <= 0) throw new Exception();
			int result = orderMapper.cancelOrderByBatch(ids, employeeID, new Date());
			if(result > 0) {
				params.put("status", true);
			    params.put("message", "�����ɹ�");
			    return params;
			}			
		} catch (Exception e) {			
			e.printStackTrace();
		}
		params.put("status", false);
		params.put("message", "����ʧ��");
		return params;
    }
    
    public Map<String, Object> getAddPersonsService(List<PersonBean> list){
		Map<String, Object> params = new HashMap<>();
		try {
			Integer employeeID = (Integer)session.getAttribute("employeeID");
			if(employeeID == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
//			if(list == null || list.size() <= 0) throw new Exception();
			if(list.get(0).getInDate() != null) {
				for (PersonBean person : list) {
					person.setInID(employeeID);
				}
			}
			if(orderMapper.insertPersonByBatch(list) > 0) {
				params.put("status", true);
				params.put("message", "�����ɹ�");
				return params;
			}
		} catch (Exception e) {			
			e.printStackTrace();
		}
		params.put("status", false);
		params.put("message", "����ʧ��");
		return params;
    }
    
    //getEditPersonsService
    public Map<String, Object> getCheckInAndOutService(int[] ids, Integer type){
		Map<String, Object> params = new HashMap<>();
		try {
			Integer employeeID = (Integer)session.getAttribute("employeeID");
			if(employeeID == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			if(type == 0) {//check in
				if(orderMapper.updatePersonCheckStateByBatch(ids, new Date(), employeeID, null, null) > 0) {
					params.put("status", true);
					params.put("message", "�����ɹ�");
					return params;
				}
			}
			if(type == 1) {//check out
				if(orderMapper.updatePersonCheckStateByBatch(ids, null, null, new Date(), employeeID) > 0) {
					params.put("status", true);
					params.put("message", "�����ɹ�");
					return params;
				}
			}
		} catch (Exception e) {			
			e.printStackTrace();
		}
		params.put("status", false);
		params.put("message", "����ʧ��");
		return params;
    }
    
    public Map<String, Object> getUpdateOrderPayStateService(Integer orderID, Double realCharge){
		Map<String, Object> params = new HashMap<>();
		try {
			orderMapper.updateOrderPayState(orderID, realCharge, 1);
			params.put("status", true);
			params.put("message", "�����ɹ�");
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "����ʧ��");
		}
		return params;
    }

}
