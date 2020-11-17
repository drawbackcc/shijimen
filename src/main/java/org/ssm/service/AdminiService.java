package org.ssm.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.ssm.entity.*;
import org.ssm.mapper.*;
import org.ssm.tool.DateTimeTool;

@Service
public class AdminiService {
	@Autowired private HttpSession session;
	@Autowired private LayoutMapper layoutMapper;
	@Autowired private RoomMapper roomMapper;
	@Autowired private EmployeeMapper employeeMapper;
	@Autowired private MemberMapper memberMapper;
	@Autowired private OrderMapper orderMapper;
	@Autowired private AnalysisMapper analysisMapper;
	@Autowired private DynamicUpdateTableMapper updateMapper;
	
	public Map<String, Object> getLayoutDataService(Integer offset, Integer pageSize){
		Map<String, Object> params = new HashMap<>();
		if(session.getAttribute("adminiID") == null) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��δ��¼");
		}else {
			Integer total = layoutMapper.getLayoutBeansNum(params);
			params.put("row", offset);
			params.put("pageSize", pageSize);
			List<LayoutBean> list = layoutMapper.getLayoutBeans(params);
			List<Integer> lIDs = new ArrayList<>();
			for (LayoutBean layout : list) {
				lIDs.add(layout.getL_id());
			}
			params.clear();
			params.put("lIDs", lIDs);
			List<LayoutBean> detailList = layoutMapper.getLayoutAndRoomBeans(params);
			for (LayoutBean layout : list) {
				for (LayoutBean detail : detailList) {
					if(layout.getL_id() == detail.getL_id()) {
						layout.setAllRoomNum(detail.getRooms() == null || detail.getRooms().size() == 0 ? 0 : detail.getRooms().size());
					    detailList.remove(detail);
					    break;
					}
				}
				layout.setImage(null);
			}
//			System.out.println(layoutMapper.getLayoutRoomNumberMapList());
			params.clear();
			params.put("rows", list);
			params.put("total", total);
			params.put("status", true);
			params.put("message", "����ɹ�");
		}
		return params;		
	}
	
	public Map<String, Object> getEditLayoutService(
			Integer l_id, 
			String name, 
			String summarize,
//			String describe, 
			String bed_type,
			Integer bed_num,
			Integer area,
			Integer limit,
			Double price,
			Integer state
			){
		Map<String, Object> params = new HashMap<>();
		int result = 0;
		if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else {
			params.put("tabName", "layout_info");
			params.put("idName", "l_id");
			params.put("id", l_id);
			params.put("name", "\"" + name + "\"");
			params.put("summarize", "\"" + summarize + "\"");
//			params.put("layout_info.describe", "\"" + describe + "\"");
			params.put("bed_type", "\"" +bed_type + "\"");
			params.put("bed_num", bed_num);
			params.put("area", area);
			params.put("layout_info.limit", limit);
			params.put("price", price);
			params.put("state", state);
			result = updateMapper.dynamicUpdateTable(params);
		}
			params.clear();
			if(result >= 1) {
				params.put("status", true);
			    params.put("message", "�޸ĳɹ�");
			}else {
				params.put("status", false);
			    params.put("message", "�޸�ʧ��");
			}
			
		    return params;	
	}
	
	public Map<String, Object> getAddLayoutService(List<LayoutBean> layouts){
		Map<String, Object> params = new HashMap<>();
		try {
			layoutMapper.insertLayoutByBatch(layouts);
			params.put("status",true);
			params.put("message","����ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status",false);
			params.put("message","���ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getDeleteLayoutService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		try {
			int result = 0;
		if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else if (ids == null || ids.length == 0) {
			params.put("status", false);
			params.put("message", "��������");
			return params;
		}else {
			result = layoutMapper.deleteLayoutByBatch(ids);
		}
		if(result >= 1) {
			params.put("status", true);
		    params.put("message", "ɾ���ɹ�");
		}else {
			params.put("status", false);
		    params.put("message", "ɾ��ʧ��");
		}
		} catch (Exception e) {
			params.put("status", false);
		    params.put("message", "ɾ��ʧ��,�÷����ѱ�����");
		}	
		return params;
	}
	
	public Map<String, Object> getLayoutManageMoreService(Integer layoutID){
		Map<String, Object> params = new HashMap<>();
		if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��δ��¼");
			params.put("layout", null);
			params.put("rooms", null);
			return params;
		}
		params.put("lID", layoutID);
		List<RoomBean> rooms = roomMapper.getRoomList(params);
		LayoutBean layout = layoutMapper.getLayoutBeans(params).get(0);
		params.put("layout", layout);
		params.put("rooms", rooms);
		return params;
		
	}
	
	public Map<String, Object> getUpLooadLayoutFileService(MultipartFile[] multipartFiles, Integer layoutID){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
			    params.put("status", false);
			    params.put("message", "��δ��¼");
			    return params;
		   }else if(multipartFiles == null || multipartFiles.length <= 0 || layoutID == null){
			   params.put("status", false);
			   params.put("message", "��������");
			   return params;
		   }else{
			   List<String> fileList = new ArrayList<>();
			   String appRootpath = System.getProperty("appRootPath");
			   for (MultipartFile multipartFile : multipartFiles) {
				    InputStream is = multipartFile.getInputStream();
				    String string = getFileString(layoutID)+".jpg";
				    File file = new File(appRootpath+"/WEB-INF/static/hotel/layout", string);
				    if(!file.exists()) file.createNewFile();
				    FileOutputStream fos = new FileOutputStream(file);
				    IOUtils.copy(is, fos);
				    fileList.add(file.getAbsolutePath());
				    is.close();
				    fos.close();
			   }
			   String image = layoutMapper.getLayoutImage(layoutID);
			   StringBuffer sb = new StringBuffer(image == null ? "" :image);
			   for (String string : fileList)  sb.append( "," + string);
			   if(sb.charAt(0) == ',') {
				   sb.deleteCharAt(0);
			   }
			   layoutMapper.updateLayoutImage(layoutID, sb.toString());
			   params.put("status", true);
			   params.put("message", "�����ɹ�");
			   params.put("image", sb.toString());
		   }
		}catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public static String getFileString(Integer layoutID) {
		return "" + new Random().nextInt(500) + layoutID + System.currentTimeMillis();
	}
	
	public Map<String, Object> getLayoutImageService(Integer layoutID) {
		Map<String, Object> params = new HashMap<>();
		System.out.println("getLayoutImageService");
		try {
			params.put("images", turnDatabaseImageIntoListForWeb(layoutMapper.getLayoutImage(layoutID)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return params;
	}
	
	public List<String> turnDatabaseImageIntoListForWeb(String imagesStringFromDatabase){
		List<String> list = new ArrayList<>();
		if(imagesStringFromDatabase == null || imagesStringFromDatabase.equals(""))return list;
		String[] images = imagesStringFromDatabase.split(",");
		try {
			for (String s : images) list.add(s.substring(s.indexOf("hotel\\layout")).replaceAll("\\\\", "/"));
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return list;
	}
	
	public String turnListIntoDatabaseImage(List<String> imageUrlList) {
		StringBuffer sb = new StringBuffer();
		for (String string : imageUrlList)  sb.append(string + ",");
		return imageUrlList.size() > 0 ? sb.deleteCharAt(sb.length() - 1).toString() : "";
	}
	
	public Map<String, Object> getRemoveLayoutImageService(Integer layoutID, String[] images){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
			    params.put("status", false);
			    params.put("message", "��δ��¼");
			    return params;
		     }else{
		    	System.out.println("getRemoveLayoutImageService"+images);
		    	System.out.println(layoutID);
				String originString = layoutMapper.getLayoutImage(layoutID);
				StringBuilder regSb = new StringBuilder(".*(");
				for (String s : images) {regSb.append(s.replaceAll("/", "\\\\\\\\") + "|");}
				regSb.deleteCharAt(regSb.length() - 1);
				regSb.append(").*");
				String reg = regSb.toString();
				List<String> list = new ArrayList<>();
				for (String string : originString.split(",")) {
					if(!Pattern.matches(reg, string)) { list.add(string); }
				}
				for (String string : list) {
					System.out.println(string);
				}
				layoutMapper.updateLayoutImage(layoutID, turnListIntoDatabaseImage(list));
				params.put("status", true);
			    params.put("message", "�����ɹ�");
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getRoomDataService(Integer state, Integer layoutID, String plate, Integer floor, String sortName, String sortOrder, Integer offset, Integer pageSize){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else {
			params.put("rState", state);
			params.put("lID", layoutID);
			params.put("plate", plate);
			params.put("floor", floor);
			Integer total = roomMapper.getRoomNum(params);
			params.put("sortName", sortName);
			params.put("sortOrder", sortOrder);		
			System.out.println("sortName" + sortName + ",sortOrder:" + sortOrder);
			params.put("row", offset);
			params.put("pageSize", pageSize);
			List<RoomBean> list = roomMapper.getRoomList(params);
			params.clear();
			params.put("rows", list);
			params.put("total", total);
			params.put("status", true);
			params.put("message", "����ɹ�");
			return params;
		}
		} catch (Exception e) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;		
	}
	
	public Map<String, Object> getAllLayoutDataService(){
		Map<String, Object> params = new HashMap<>();
		params.put("data", layoutMapper.getLayoutBeans(params));
		params.put("status", true);
		return params;
	}
	
	public Map<String, Object> getAddRoomService(List<RoomBean> rooms){
		Map<String, Object> params = new HashMap<>();
		try {
			roomMapper.insertRoomByBatch(rooms);
			params.put("status",true);
			params.put("message","����ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status",false);
			params.put("message","����Ų����ظ���");
		}
		return params;
	}
	
	public Map<String, Object> getDeleteRoomService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		int result = 0;
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else if (ids == null || ids.length == 0) {
			params.put("status", false);
			params.put("message", "��������");
			return params;
		}else {
			result = roomMapper.deleteRoomByBatch(ids);
		}
		if(result >= 1) {
			params.put("status", true);
		    params.put("message", "ɾ���ɹ�");
		}else {
			params.put("status", false);
		    params.put("message", "ɾ��ʧ��");
		}
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;
	}
	
	public Map<String, Object> getUpdateRoomService(Integer roomID, String plate, Integer floor, Integer layoutID, Integer state){
		Map<String, Object> params = new HashMap<>();
		try {
			roomMapper.updateRoom(roomID, plate, floor, layoutID, state);
			params.put("status", true);
		    params.put("message", "���³ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getEmployeeDataService(Integer emplID, String idCard, String emplNum, String name, String phone,Integer state, Integer offset, Integer pageSize){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else {
			params.put("emplID", emplID);
			params.put("idCard", idCard);
			params.put("emplNum", emplNum);
			params.put("name", name);
			params.put("phone", phone);
			params.put("state", state);
			Integer total = employeeMapper.getEmployeeNum(params);
			params.put("row", offset);
			params.put("pageSize", pageSize);
			List<EmployeeBean> list = employeeMapper.getEmployeeList(params);
			params.clear();
			for (EmployeeBean employee : list) {
				employee.setPassword(null);
			}
			params.put("rows", list);
			params.put("total", total);
			params.put("status", true);
			params.put("message", "����ɹ�");
			return params;
		}
		} catch (Exception e) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;		
	}
	
	public Map<String, Object> getAddEmployeeService(List<EmployeeBean> employees){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��δ��¼");
				return params;
			}
			for (EmployeeBean employee : employees) {
//				if(employee.getEmplNum() == null || employee.getEmplNum() == "") throw new Exception();
				String idcard = employee.getIdCard();
				employee.setPassword(idcard != null && idcard.length() >=6 ? idcard.substring(idcard.length() - 6, idcard.length()) : employee.getEmplNum());
				System.out.println(employee);
			}
			employeeMapper.insertEmployeeByBatch(employees);
			params.put("status",true);
			params.put("message","����ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status",false);
			params.put("message","Ա���Ų����ظ�");
		}
		return params;
	}
	
	public Map<String, Object> getDeleteEmployeeService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		int result = 0;
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else if (ids == null || ids.length == 0) {
			params.put("status", false);
			params.put("message", "��������");
			return params;
		}else {
			result = employeeMapper.deleteEmployeeByBatch(ids);
		}
		if(result >= 1) {
			params.put("status", true);
		    params.put("message", "ɾ���ɹ�");
		}else {
			params.put("status", false);
		    params.put("message", "ɾ��ʧ��");
		}
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;
	}

	public Map<String, Object> getUpdateEmployeeService(EmployeeBean employee){
		Map<String, Object> params = new HashMap<>();
		System.out.println(employee);
		try {
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			employeeMapper.updateEmployee(employee);
			params.put("status", true);
		    params.put("message", "���³ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getResetEmployeePasswordService(int[] ids, String password){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			if(!isValidPassword(password)) {
				params.put("status", false);
			    params.put("message", "����ӦΪ8-16λ��������ĸ���");
			    return params;
			}
			employeeMapper.updateEmployeePassword(password, ids);
			params.put("status", true);
		    params.put("message", "���³ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	//8-16λ��������ĸ���
	public boolean isValidPassword(String password) {
		Pattern p = Pattern.compile("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$");
		Matcher m = p.matcher(password);
		return m.matches();
	}
	
	public Map<String, Object> getMemberDataService(Integer state, String name, String phone, String email,  String sortName, String sortOrder, Integer offset, Integer pageSize){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
			return params;
		}else {
			params.put("state", state);
			params.put("name", name);
			params.put("phone", phone);
			params.put("email", email);
			params.put("fuzzy", true);//ģ����ѯ
			Integer total = memberMapper.getMemberNum(params);
			params.put("row", offset);
			params.put("pageSize", pageSize);
			List<MemberBean> list = memberMapper.getMemberList(params);
			params.clear();
			for (MemberBean member : list) {
				member.setPassword(null);
			}
			params.put("rows", list);
			params.put("total", total);
			params.put("status", true);
			params.put("message", "����ɹ�");
			return params;
		}
		} catch (Exception e) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;		
	}
	
	public Map<String, Object> getAddMemberService(List<MemberBean> members){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			for (MemberBean member : members) {
//				if(employee.getEmplNum() == null || employee.getEmplNum() == "") throw new Exception();
				member.setPassword("123456");
				System.out.println(member);
			}
			memberMapper.insertMemberByBatch(members);
			params.put("status",true);
			params.put("message","����ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status",false);
			params.put("message","���ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getDeleteMemberService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		int result = 0;
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
			return params;
		}else if (ids == null || ids.length == 0) {
			params.put("status", false);
			params.put("message", "��������");
			return params;
		}else {
			result = memberMapper.deleteMemberByBatch(ids);
		}
		if(result >= 1) {
			params.put("status", true);
		    params.put("message", "ɾ���ɹ�");
		}else {
			params.put("status", false);
		    params.put("message", "ɾ��ʧ��");
		}
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;
	}

	public Map<String, Object> getUpdateMemberService(MemberBean member){
		Map<String, Object> params = new HashMap<>();
		System.out.println(member);
		try {
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			memberMapper.updateMember(member);
			params.put("status", true);
		    params.put("message", "���³ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getResetMemberPasswordService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		try {
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			memberMapper.updateMemberPassword("123456", ids);
			params.put("status", true);
		    params.put("message", "���³ɹ�");
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
		    params.put("message", "����ʧ��");
		}
		return params;
	}
	
	public Map<String, Object> getOrderDataService(String type, Integer state, String orderNum, String plate, String people, String employee, 
			Date fromDate, Date toDate, Date startDate, Date endDate,String sortName, String sortOrder, Integer offset, Integer pageSize){
		Map<String, Object> params = new HashMap<>();
		System.out.println("type:" + type + ",state:" + state + ",orderNum:" + orderNum + ",plate:" + plate + ",people:" + people + ",employee:" + employee);
		System.out.println("fromDate:" + fromDate + ",toDate:" + toDate + ",startDate:" + startDate + ",endDate:" + endDate + ",offset:" + offset + ",pageSize:" + pageSize);
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("rows", null);
			params.put("total", 0);
			params.put("status", false);
			params.put("message", "����û��Ȩ�޽��д˲������������˺��Ѿ��ǳ��������µ�¼����");
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
	
	public Map<String, Object> getDeleteOrderService(int[] ids){
		Map<String, Object> params = new HashMap<>();
		int result = 0;
		try {
			if(session.getAttribute("adminiID") == null) {
			params.put("status", false);
			params.put("message", "��δ��¼");
			return params;
		}else if (ids == null || ids.length == 0) {
			params.put("status", false);
			params.put("message", "��������");
			return params;
		}else {
			result = orderMapper.deleteOrderByBatch(ids);
		}
		if(result >= 1) {
			params.put("status", true);
		    params.put("message", "ɾ���ɹ�");
		}else {
			params.put("status", false);
		    params.put("message", "ɾ��ʧ��");
		}
		} catch (Exception e) {
			e.printStackTrace();
			params.put("status", false);
			params.put("message", "��������");
		}	
		return params;
	}
	
	public Map<String, Object> getOrderDataDetailService(Integer orderID){
		Map<String, Object> params = new HashMap<>();
		try {
			params.put("orderID", orderID);
			List<PersonBean> list = orderMapper.getPersonListOfOrder(params);
			params.put("status", true);
			params.put("message", "�����ɹ�");
			params.put("persons", list);
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
			if(session.getAttribute("adminiID") == null) {
				params.put("status", false);
				params.put("message", "��û��Ȩ�޽��д˲����������˺��Ѿ��ǳ��������µ�¼����");
				return params;
			}
			System.out.print("");
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
	
	public Map<String, Object> analysisInlineAndOfflineOrder(String year){
		Map<String, Object> params = new HashMap<>();
		try {//����Ȩ�ޣ��㰮��������
			List<Double> online = new ArrayList<>();
			List<Double> offline = new ArrayList<>();
			params.put("payState", 1);
			params.put("state", 1);
			params.put("type", 0);// ���϶���
			DateTimeTool date = new DateTimeTool();
			for (int i = 1; i <= 12; i++) {
				params.put("startDate", date.getFirstDayOfMonth(year + "-" + i));
				params.put("endDate", date.getLastDayOfMonth(year + "-" + i));
				online.add(analysisMapper.getTotalCharge(params));
			}
			params.put("type", 1);// ����
			for (int i = 1; i <= 12; i++) {
				params.put("startDate", date.getFirstDayOfMonth(year + "-" + i));
				params.put("endDate", date.getLastDayOfMonth(year + "-" + i));
				offline.add(analysisMapper.getTotalCharge(params));
		    }
			params.put("status", true);
			params.put("online", online);
			params.put("offline", offline);
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "����ʧ��");
			e.printStackTrace();
		}
		
		return params;
	}
	
	public Map<String, Object> analysisLayoutOrder(Date startDate, Date endDate){
		Map<String, Object> params = new HashMap<>();
		try {
			params.put("startDate", startDate);
			params.put("endDate", endDate);
			params.put("state", 1);
			params.put("payState", 1);
			List<PieData> data = new ArrayList<>();
			List<Integer> roomIDs = new ArrayList<>();
			List<String> names = new ArrayList<>();
			List<LayoutBean> layouts = layoutMapper.getLayoutAndRoomBeans(params);
			for (LayoutBean layout : layouts) {
				roomIDs.clear();
				for (RoomBean room : layout.getRooms()) {
					roomIDs.add(room.getR_id());
				}
				Double charge = 0.0;
				if(layout.getRooms().size() > 0) {
					params.put("roomIDs", roomIDs);
					charge = analysisMapper.getTotalCharge(params);
				}
				data.add(new PieData(charge, layout.getName()));
				names.add(layout.getName());
			}
			params.put("data", data);
			params.put("names", names);
			params.put("status", true);
		} catch (Exception e) {
			params.put("status", false);
			params.put("message", "����ʧ��");
			e.printStackTrace();
		}	
		return params;
	}
}
