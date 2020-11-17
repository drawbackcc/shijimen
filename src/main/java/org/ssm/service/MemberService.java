package org.ssm.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ssm.entity.*;
import org.ssm.mapper.*;


@Service
public class MemberService {
	
	@Autowired private MemberMapper memberMapper;
	@Autowired private OrderMapper orderMapper;
	@Autowired private DynamicUpdateTableMapper updateMapper;
	@Autowired private CommentMapper commentMapper;
	@Autowired private HttpSession session;
	
	public MemberBean getMemberBeanService(Integer memID, String phone, String password) {
		Map<String, Object> params = new HashMap<>();
		params.put("memID", memID);
		params.put("phone", phone);
		params.put("state", 1);
//		params.put("password", password);//���Դ���ȥ����ò�Ҫ������
		List<MemberBean> list = memberMapper.getMemberList(params);
		MemberBean member = null;
		if(list.size() >= 1) {
			member = list.get(0);
			if(password == null || password.equals(member.getPassword())) {
				member.setPassword(null);
				return member;
			}
		}
		return null;	
	}
	
	public Map<String, Object> getMemberHotelOrderService(Integer memID, Integer curPage, Integer pageSize, String type){
		Map<String, Object> params = new HashMap<>();
		Integer row = (curPage - 1) * pageSize;
		Integer allSize, waitSize, totalSize;
		boolean isWait = (type != null && type.equals("wait")) ? true : false;
		List<OrderBean> orders;
		params.put("memID", memID);
		allSize = orderMapper.getOrderInfoNum(params);//ȫ����������Ŀ
		//
		System.out.println("��δ��ɶ���service");
			Calendar c = Calendar.getInstance();
			if(c.get(Calendar.HOUR) >= 12) {
				c.add(Calendar.DATE, 1);
			}
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); 
			String curDate = format.format(c.getTime());
		//
		if(isWait) {//�������δ��ɶ���
			params.put("curDate", curDate);
			params.put("state", 1);
			isWait = true;
		}
		params.put("row", row);
		params.put("pageSize", pageSize);
		orders = orderMapper.getOrderInfoList(params);
		Map<String, Object> params2 = new HashMap<>();
		for (OrderBean order : orders) {
			params2.clear();
			params2.put("orderID", order.getOrderID());
			CommentBean comment = commentMapper.getCommentList(params2).size() > 0 ? commentMapper.getCommentList(params2).get(0) : null;
			order.setComment(comment);			
			String image = order.getOrderImage();
			if(image != null)
				order.setOrderImage(image.substring(image.indexOf("hotel\\layout")).replaceAll("\\\\", "/"));
		}
		params.put("curDate", curDate);
		params.put("state", 1);
		waitSize = orderMapper.getOrderInfoNum(params);
		totalSize = isWait ? waitSize : allSize;
		params.put("curPage", curPage);
		params.put("allSize", allSize);
		params.put("waitSize", waitSize);
		params.put("totalSize", totalSize);
		params.put("pageNum", (int)Math.ceil((double)totalSize / (double)pageSize));
		params.put("orders", orders);
		params.put("type", type);
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

	public Map<String, Object> updateMemberService(
			Integer memberID, 
			String name, 
			String phone, 
			String password, 
			String email, 
			Integer gender, 
			String selfPs, 
			String otherPs, 
			Integer state,
			Integer type){
		Map<String, Object> table = new HashMap<String, Object>();
		table.put("tabName", "member_info");
		table.put("idName", "m_id");
		table.put("id", memberID);
		if(type == 1 && memberID != null && name != null && !"".equals(name)) {//�û���ͨ��Ϣ�޸�
			table.put("name", "\"" + name + "\"");
			table.put("email", "\"" + email + "\"");
			table.put("gender", gender);
			table.put("self_ps", "\"" + selfPs + "\"");
		}else if (type == 2 && memberID != null && phone != null && !"".equals(phone)) {//�û��ֻ����޸�
			table.put("phone", "\"" + phone + "\"");
		}else if (type == 3 && memberID != null && password != null && !"".equals(password)) {//�û������޸�
			table.put("password", "\"" + password + "\"");
		}else {
			table.clear();
			table.put("status", false);
			table.put("message", "δ֪����");
			return table;
		}
		boolean status;
		String message;
		if(updateMapper.dynamicUpdateTable(table) > 0) {
			status = true;
			message = "����ɹ�";
		}else {
			status = false;
			message = "����ʧ��";
		}
		table.clear();
		table.put("status", status);
		table.put("message", message);
		return table;
	}
	
	public Map<String, Object> getRigisterService(String phone, String valifCode, String password){
		Map<String, Object> params = new HashMap<>();
		try {
			if(!valifCode.toLowerCase().equals(((String)session.getAttribute("valifCode")).toLowerCase())) {
				params.put("status", false);
				params.put("message", "��֤�����");
				return params;
			}
			if(!isMobileNum(phone)) {
				params.put("status", false);
				params.put("message", "�ֻ��Ÿ�ʽ����");
				return params;
			}
			if(!isValidPassword(password)) {
				params.put("status", false);
				params.put("message", "����Ҫ��Ϊ8��16λ����������ĸ���");
				return params;
			}
			MemberBean member = new MemberBean();
			member.setName(phone);
			member.setGender(0);
			member.setPassword(password);
			member.setPhone(phone);
			List<MemberBean> list = new ArrayList<>();
			list.add(member);
			memberMapper.insertMemberByBatch(list);
			params.put("status", true);
			params.put("message", "�����ɹ�");
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "����ʧ��");
			e.printStackTrace();
		}
		return params;
	}
	
	public Map<String, Object> getCommentService(Integer orderID, String content, Integer service, Integer device, Integer environment){
		Map<String, Object> params = new HashMap<>();
		try {
			Integer memberID = (Integer)session.getAttribute("memberID");
			if(memberID == null) {
				params.put("status", false);
    			params.put("message", "��û��Ȩ�޽��д˲����������˺��ѵǳ��������µ�¼");
    			return params;
			}
			CommentBean comment = new CommentBean();
			comment.setOrderID(orderID);
			comment.setMemID(memberID);
			comment.setService(service);
			comment.setDevice(device);
			comment.setEnvironment(environment);
			comment.setComment(content);
			commentMapper.insertComment(comment);
			params.put("status", true);
			params.put("comment", comment);
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> cancelOrderService(String orderNum){
		Map<String, Object> params = new HashMap<>();
		return params;
	}
	
	public static boolean isMobileNum(String mobiles) {
		Pattern p = Pattern.compile("^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$");
		Matcher m = p.matcher(mobiles);
		return m.matches();
	}
	//8-16λ��������ĸ���
	public static boolean isValidPassword(String password) {
		Pattern p = Pattern.compile("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$");
		Matcher m = p.matcher(password);
		return m.matches();
	}
}
