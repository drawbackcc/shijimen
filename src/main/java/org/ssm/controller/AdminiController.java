package org.ssm.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.ssm.entity.*;
import org.ssm.service.AdminiService;
import org.ssm.service.EmployeeService;


@Controller
@SessionAttributes(value = {"adminiID", "adminiNum", "adminiName"})
@RequestMapping("a")
public class AdminiController {
	@Autowired private HttpSession session;
	@Autowired private EmployeeService employeeService;
	@Autowired private AdminiService adminiService;
	
	@RequestMapping("logout")
	private String logout(SessionStatus sessionStatus, HttpSession session) {
		session.removeAttribute("adminiID");
		session.removeAttribute("adminiNum");
	    session.removeAttribute("adminiName");
		sessionStatus.setComplete();
		return "redirect:../e/login";
	}
	
	@ResponseBody
	@RequestMapping(value = "isLogin", method = RequestMethod.POST)
	private Boolean isLogin() {
		return session.getAttribute("adminiID") == null;
	}
	
	@ResponseBody
	@RequestMapping(value = "doLogin", method = RequestMethod.POST)
	private Boolean doLogin(String emplNum, String password, Integer type, Model map, HttpSession session) {
		if(emplNum == null || "".equals(emplNum) || password == null || password.trim().equals("") || type == null || type.intValue() != 1)
			return false;
		EmployeeBean employee = employeeService.getEmployeeBeanService(null, emplNum, type, password);
		if(employee == null) return false;
		if(employee.getType().intValue() == 1) {
			map.addAttribute("adminiID", employee.getEmplID());
			map.addAttribute("adminiNum", employee.getEmplNum());
			map.addAttribute("adminiName", employee.getName());
		}else {
			return false;
		}
		return true;
	}
	
	@RequestMapping("index")
	private String index(HttpServletRequest request, HttpServletResponse response) {
		if (null == request.getCookies()) {
            System.out.println("û��cookie=========");
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(120 * 60);// ����Ϊ120min
            cookie.setPath("/");
            response.addCookie(cookie);
        }
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/index";
	}
	
	@RequestMapping("analysisManage")
	private String analysisManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/analysisManage";
	}
	
	@RequestMapping("analysis2Manage")
	private String analysis2Manage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/analysis2Manage";
	}
	
	@RequestMapping("employeeManage")
	private String employeeManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/employeeManage";
	}
	
	@RequestMapping("hotelManage")
	private String hotelManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/hotelManage";
	}
	
	@RequestMapping("layoutManage")
	private String layoutManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/layoutManage";
	}
	
	@RequestMapping("memberManage")
	private String memberManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/memberManage";
	}
	
	@RequestMapping("orderManage")
	private String orderManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/orderManage";
	}
	
	@RequestMapping("roomManage")
	private String roomManage() {
		if(session.getAttribute("adminiID") == null)
			return "redirect:../e/login";
		return "employee/administrator/roomManage";
	}
	
	/*------------------------------------------------*/
	
	@ResponseBody
	@RequestMapping(value = "layoutData", method = RequestMethod.POST)
	private Map<String, Object> layoutData(Integer offset, Integer pageSize){
		return adminiService.getLayoutDataService(offset < 0 ? 0 : offset, pageSize < 1 ? 1 : pageSize);
	}
	
	@ResponseBody
	@RequestMapping(value = "editLayout", method = RequestMethod.POST)
	private Map<String, Object> editLayout(
			Integer l_id, 
			String name, 
			String summarize, 
//			String describe,
			String bed_type,
			Integer bed_num,
			Integer area,
			Integer limit,
			Double price,
			Integer state){
		return adminiService.getEditLayoutService(l_id, name, summarize, bed_type, bed_num, area, limit, price, state);
	}
	
	@ResponseBody
	@RequestMapping(value = "addLayout", method = RequestMethod.POST)
	private Map<String, Object> addLayout(@RequestBody List<LayoutBean> layouts){
		System.out.print(layouts);
		return adminiService.getAddLayoutService(layouts);
	}
	
	@ResponseBody
	@RequestMapping(value = "deleteLayout", method = RequestMethod.POST)
	private Map<String, Object> deleteLayout(@RequestParam(value="ids[]") int[] ids){
		return adminiService.getDeleteLayoutService(ids);
	}
	
	@RequestMapping("layoutManageImage")
	private String layoutManageImage(Integer layoutID, Model model) {
		model.addAllAttributes(adminiService.getLayoutImageService(layoutID));
		return "employee/administrator/layoutManageImage";
	}
	
	@RequestMapping("layoutManageMore")
	private String layoutManageMore(Integer layoutID, Model model) {
		model.addAllAttributes(adminiService.getLayoutManageMoreService(layoutID));
		return "employee/administrator/layoutManageMore";
	}
	
	@ResponseBody
	@RequestMapping(value = "upLoadLayoutImages", method = RequestMethod.POST)
	private Map<String, Object> upLoadLayoutImages(MultipartFile[] file, Integer layoutID){
		return adminiService.getUpLooadLayoutFileService(file, layoutID);
	}
	
	@ResponseBody
	@RequestMapping(value = "removeLayoutImage", method = RequestMethod.POST)
	private Map<String, Object> removeLayoutImage(Integer layoutID, @RequestParam("images[]")String[] images){
		return adminiService.getRemoveLayoutImageService(layoutID, images);
	}
	
	/*------------------------------------------------*/
	
	@ResponseBody
	@RequestMapping(value = "roomData", method = RequestMethod.POST)
	private Map<String, Object> roomData(Integer state, Integer layoutID, String plate, Integer floor, String sortName, String sortOrder, Integer offset, Integer pageSize){
		return adminiService.getRoomDataService(state, layoutID, plate, floor, sortName, sortOrder, offset < 0 ? 0 : offset, pageSize < 1 ? 1 : pageSize);
	}
	
	@ResponseBody
	@RequestMapping(value = "editRoom", method = RequestMethod.POST)
	private Map<String, Object> editRoom(Integer r_id, String plate, Integer floor, Integer l_id, Integer state){
		return adminiService.getUpdateRoomService(r_id, plate, floor, l_id, state);
	}
	
	@ResponseBody
	@RequestMapping(value = "allLayoutData", method = RequestMethod.POST)
	private Map<String, Object> allLayoutData(){
		return adminiService.getAllLayoutDataService();
	}
	
	@ResponseBody
	@RequestMapping(value = "addRoom", method = RequestMethod.POST)
	private Map<String, Object> addRoom(@RequestBody List<RoomBean> rooms){
		System.out.print(rooms);
		return adminiService.getAddRoomService(rooms);
	}
	
	@ResponseBody
	@RequestMapping(value = "deleteRoom", method = RequestMethod.POST)
	private Map<String, Object> deleteRoom(@RequestParam(value="ids[]") int[] ids){
		return adminiService.getDeleteRoomService(ids);
	}
	
	/*------------------------------------------------*/
	
	@ResponseBody
	@RequestMapping(value = "employeeData", method = RequestMethod.POST)
	private Map<String, Object> employeeData(Integer emplID,String idCard, String emplNum, String name, String phone, Integer state, Integer offset, Integer pageSize){
		return adminiService.getEmployeeDataService(emplID, idCard, emplNum, name, phone, state, offset < 0 ? 0 : offset, pageSize < 1 ? 1 : pageSize);
	}
	
	@ResponseBody
	@RequestMapping(value = "addEmployee", method = RequestMethod.POST)
	private Map<String, Object> addEmployee(@RequestBody List<EmployeeBean> employees){
		System.out.println(employees);
		return adminiService.getAddEmployeeService(employees);
	}
	
	@ResponseBody
	@RequestMapping(value = "deleteEmployee", method = RequestMethod.POST)
	private Map<String, Object> deleteEmployee(@RequestParam(value="ids[]") int[] ids){
		return adminiService.getDeleteEmployeeService(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "editEmployee", method = RequestMethod.POST)
	private Map<String, Object> editEmployee(@RequestBody EmployeeBean employee){
		return adminiService.getUpdateEmployeeService(employee);
	}
	
	@ResponseBody
	@RequestMapping(value = "resetEmployeePassword", method = RequestMethod.POST)
	private Map<String, Object> resetEmployeePassword(@RequestParam(value="ids[]") int[] ids, String password){
		return adminiService.getResetEmployeePasswordService(ids, password);
	}
	
	/*------------------------------------------------*/
	
	@ResponseBody
	@RequestMapping(value = "memberData", method = RequestMethod.POST)
	private Map<String, Object> memberData(Integer state, String name, String phone, String email, String sortName, String sortOrder, Integer offset, Integer pageSize){
		return adminiService.getMemberDataService(state, name, phone, email, sortName, sortOrder, offset < 0 ? 0 : offset, pageSize < 1 ? 1 : pageSize);
	}
	
	@ResponseBody
	@RequestMapping(value = "editMember", method = RequestMethod.POST)
	private Map<String, Object> editMember(@RequestBody MemberBean member){
		return adminiService.getUpdateMemberService(member);
	}
	
	@ResponseBody
	@RequestMapping(value = "addMember", method = RequestMethod.POST)
	private Map<String, Object> addMember(@RequestBody List<MemberBean> members){
		System.out.print(members);
		return adminiService.getAddMemberService(members);
	}
	
	@ResponseBody
	@RequestMapping(value = "deleteMember", method = RequestMethod.POST)
	private Map<String, Object> deleteMember(@RequestParam(value="ids[]") int[] ids){
		return adminiService.getDeleteMemberService(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "resetMemberPassword", method = RequestMethod.POST)
	private Map<String, Object> resetMemberPassword(@RequestParam(value="ids[]") int[] ids){
		return adminiService.getResetMemberPasswordService(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "orderData", method = RequestMethod.POST)
	private Map<String, Object> orderData(String type, Integer state, String orderNum, String plate, String people, String employee, 
			Date fromDate, Date toDate, Date startDate, Date endDate,
			String sortName, String sortOrder, Integer offset, Integer pageSize){
		return adminiService.getOrderDataService(type, state, orderNum, plate, people, employee, fromDate, toDate, startDate, endDate, sortName, sortOrder, offset < 0 ? 0 : offset, pageSize < 1 ? 1 : pageSize);
	}
	
	@ResponseBody
	@RequestMapping(value = "deleteOrder", method = RequestMethod.POST)
	private Map<String, Object> deleteOrder(@RequestParam(value="ids[]") int[] ids){
		return adminiService.getDeleteOrderService(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "orderDataDetail", method = RequestMethod.POST)
	private Map<String, Object> deleteOrder(Integer orderID){
		return adminiService.getOrderDataDetailService(orderID);
	}
	
	@ResponseBody
	@RequestMapping(value = "orderAllDetails", method = RequestMethod.POST)
	private Map<String, Object> orderAllDetails(Integer orderID){
		return adminiService.getOrderAllDetailService(orderID);
	}
	
	@ResponseBody
	@RequestMapping(value = "analysisInlineAndOfflineOrder")
	private Map<String, Object> analysisInlineAndOfflineOrder(String year){
		return adminiService.analysisInlineAndOfflineOrder(year);
	}
	
	@ResponseBody
	@RequestMapping(value = "analysisLayoutOrder")
	private Map<String, Object> analysisLayoutOrder(@DateTimeFormat(pattern="yyyy-MM-dd")Date startDate, @DateTimeFormat(pattern="yyyy-MM-dd")Date endDate){
		return adminiService.analysisLayoutOrder(startDate, endDate);
	}
	
	
	
}
