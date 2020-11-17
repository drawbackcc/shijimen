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
public class HotelService {
	
//	@Autowired private RoomMapper roomMapper;
	@Autowired private LayoutMapper layoutMapper;
	@Autowired private CommentMapper commentMapper;
	@Autowired private RoomMapper roomMapper;
	@Autowired private MemberMapper memberMapper;
	@Autowired private OrderMapper orderMapper;
	@Autowired private HttpSession session;
	
	public Map<String, Object> getHotelReservationService(Date from, Date to){
		Map<String, Object> params = new HashMap<>();
		params.put("lState", 1);
		params.put("rState", 1);
		//��ȡȫ����Ч����
		List<LayoutBean> allLayoutBeans = layoutMapper.getLayoutAndRoomBeans(params);
		params.put("from", from);
		params.put("to", to);
		List<Integer> bookedRoomIDs = roomMapper.getBookedRoomIdList(from, to, 1);
		for (LayoutBean layout : allLayoutBeans) {
			int roomNum = layout.getRooms() == null ? 0 : layout.getRooms().size();
			for (RoomBean room : layout.getRooms()) {
				if(bookedRoomIDs.contains(room.getR_id())) roomNum --;
			}
			layout.setAvailable(roomNum > 0 ? true : false);
			layout.setImages(dealImagesUrl(layout.getImage()));
			layout.setRooms(null);
			layout.setImage(null);
		}
		params.put("layouts", allLayoutBeans);
		return params;
	}
	
	public List<String> dealImagesUrl(String string){
		List<String> list = new ArrayList<>();
		if(string == null || string.equals(""))return list;
		String[] images = string.split(",");
		try {
			for (String s : images) list.add(s.substring(s.indexOf("hotel\\layout")).replaceAll("\\\\", "/"));
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return list;
	}
	
	public Map<String, Object> getHotelReservationDetailService(Date from, Date to, Integer layoutID){
		Map<String, Object> params = new HashMap<>();//һ������
		try {
			params.put("lState", 1);
		    params.put("lID", layoutID);
		    LayoutBean layout = layoutMapper.getLayoutBeans(params).get(0);
		    layout.setImages(dealImagesUrl(layout.getImage()));
		    layout.setImage(null);
	     	params.clear();
		    int nights =  (int) ((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
		    params.put("layout", layout);
			params.put("totalMoney", nights * layout.getPrice());
			params.put("from", from);
		    params.put("to", to);
		    params.put("nights",nights);
		    params.put("layoutID", layoutID);
		    params.put("state", true);
		} catch (Exception e) {
			e.printStackTrace();
			params.put("state", false);
		}
		return params;
	}
	
	public Map<String, Object> getHotelReservationDetailCommentService(Integer layoutID, Integer curPage, Integer pageSize){
		Map<String, Object> params = new HashMap<>();//һ������
		params.put("lID", layoutID);
		int total = commentMapper.getCommentNum(params);
		params.put("row", (curPage - 1) * pageSize);
		params.put("pageSize", pageSize);
		List<CommentBean> list = commentMapper.getCommentList(params);
		params.put("curPage", curPage);
		params.put("comments", list);
		params.put("total", total);
		return params;
	}
	
	public List<LayoutBean> getLayoutAndRoomBeans(Map<String, Object> params) {
		return layoutMapper.getLayoutAndRoomBeans(params);
	}
	
	public Map<String, Object> getHotelrReservationDetail01Service(Date from, Date to, Integer layoutID){
		Map<String, Object> params = new HashMap<>();
		try {
			Integer memID = (Integer)session.getAttribute("memberID");
			params.put("memID", memID);
			params.put("state", 1);
			MemberBean member = memberMapper.getMemberList(params).get(0);
			member.setPassword(null);
			params.clear();
			params.put("lID", layoutID);
			params.put("lState", 1);
			LayoutBean layout = layoutMapper.getLayoutBeans(params).get(0);
			int days = (int)((to.getTime() - from.getTime())/(1*24*60*60*1000));
			layout.setImages(dealImagesUrl(layout.getImage()));
			params.put("name", member.getName());
			params.put("phone", member.getPhone());
			params.put("layout", layout);
			params.put("from", from);
			params.put("to", to);
			params.put("charge", days * layout.getPrice());
			params.put("status", true);
		} catch (Exception e) {
			params.put("status", false);
		}
		return params;
		
	}
	
	 public Map<String, Object> getAddOrderService(OrderBean order){
	    	Map<String, Object> params = new HashMap<>();
	    	try {
	    		Integer memberID = (Integer)session.getAttribute("memberID");
	    		List<PersonBean> persons = order.getPersons();   		
	    		if(memberID == null) {
	    			params.put("status", false);
	    			params.put("message", "��û��Ȩ�޽��д˲����������˺��ѵǳ��������µ�¼");
	    		}else {//�������ǰ��������ע�룬���Ի�Ҫ����һ�£��Ȳ�����   				
					order.setOrderNum(getOrderNum());
					order.setMemID(memberID);
					order.setPayState(0);
					String layoutImage = layoutMapper.getLayoutImage(order.getLayoutID());
					if(layoutImage != null) {
						String[] strings = layoutImage.split(",");
						if(strings != null && strings.length > 0) {
							order.setOrderImage(strings[0]);
						}
					}
					List<Integer> bookedIDList = roomMapper.getBookedRoomIdList(order.getFromDate(), order.getToDate(), 1);
					params.put("lID", order.getLayoutID());
					params.put("rState", 1);
					List<Integer> roomIDList = roomMapper.getRoomIdList(params);
					List<OrderBean> list = new ArrayList<OrderBean>();//д������������Ϊ���Ժ����������
					boolean flag = false;
					
					for (Integer roomID : roomIDList) {
						System.out.println("roomid :" + roomID);
						try {
							if( !bookedIDList.contains(roomID)) {								
								order.setRoomID(roomID);
								list.clear();
								list.add(order);
					            orderMapper.insertOrderByBatch(list);	//������������	
					            if(persons != null && persons.size() > 0) {
					            	for (PersonBean person : persons) {
					            		person.setOrderID(order.getOrderID());
								    }
					            	orderMapper.insertContactByBatch(persons);
					            }
					            
					            flag = true;
					            break;
							}
						} catch (Exception e) {
							e.printStackTrace();//�Ѿ���Ԥ��
						}
					}
					System.out.println(order);
					if(flag) {
//						params.
						params.put("status", true);
				        params.put("message", "�����ɹ�");
				        params.put("order", order);
					}else {
						throw new Exception();
					}						    		    
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
	    
	    public boolean updateAlipayService(String orderNo, String alipayNo, Double realCharge) {
	    	try {
				if(orderMapper.updateOrderAliPayState(orderNo, alipayNo, realCharge, 1) > 0)
					return true;
				return false;
			} catch (Exception e) {
				e.printStackTrace();			
			}
	    	return false;
	    }

}
