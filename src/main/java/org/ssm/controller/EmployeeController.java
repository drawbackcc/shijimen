package org.ssm.controller;

import java.io.IOException;
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
import org.ssm.entity.*;
import org.ssm.service.EmployeeService;

@Controller
@SessionAttributes(value = {"employeeID","employeeNum","employeeName"})
@RequestMapping("e")
public class EmployeeController {
	
	@Autowired private HttpSession session;
	@Autowired private EmployeeService employeeService;
	
	@RequestMapping("login")
	private String login(HttpServletRequest request, HttpServletResponse response) {
		if (null == request.getCookies()) {
            System.out.println("û��cookie=========");
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(120 * 60);// ����Ϊ120min
            cookie.setPath("/");
            response.addCookie(cookie);
        }
		return "employee/login";
	}
	
	@RequestMapping("logout")
	private void logout(HttpServletResponse response,SessionStatus sessionStatus, HttpSession session) {
		session.removeAttribute("employeeID");
		session.removeAttribute("employeeNum");
	    session.removeAttribute("employeeName");
		sessionStatus.setComplete();
//		return "redirect:login";
		try {
			response.sendRedirect("login");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "isLogin", method = RequestMethod.POST)
	private Boolean isLogin() {
		return session.getAttribute("employeeID") == null;
	}
	
	@ResponseBody
	@RequestMapping(value = "doLogin", method = RequestMethod.POST)
	private Boolean doLogin(String emplNum, String password, Integer type, Model map, HttpSession session) {
		if(emplNum == null || "".equals(emplNum) || password == null || password.trim().equals("") || type == null || type.intValue() != 0)
			return false;
		EmployeeBean employee = employeeService.getEmployeeBeanService(null, emplNum, type, password);
		if(employee == null) return false;
		if(employee.getType().intValue() == 0 || employee.getType().intValue() == 1) {//����Ա�͹�Ա�����Ե�¼
			map.addAttribute("employeeID", employee.getEmplID());
			map.addAttribute("employeeNum", employee.getEmplNum());
			map.addAttribute("employeeName", employee.getName());
		}else {
			return false;
		}
		return true;
	}
	
	
	@RequestMapping("index")
	private String index() {
		if(session.getAttribute("employeeID") == null)
			return "redirect:login";
		return "employee/index";
	}
	
	@RequestMapping("reception-reservation")
	private String reservation() {
		return "employee/reception-reservation";
	}
	
	@RequestMapping("checkinandout")
	private String checkInAndOut() {
		return "employee/checkinandout";
	}
	
	@RequestMapping("orderManage")
	private String orderManage() {
		return "employee/orderManage";
	}
	
	@RequestMapping("member")
	private String member() {
		return "employee/member";
	}
	
	@ResponseBody
	@RequestMapping(value = "layoutData", method = RequestMethod.POST)
	private Map<String, Object> layoutData(@DateTimeFormat(pattern="yyyy-MM-dd")Date fromDate, @DateTimeFormat(pattern="yyyy-MM-dd")Date toDate){
		return employeeService.getLayoutDataService(fromDate, toDate);
	}
	
	@ResponseBody
	@RequestMapping(value = "layoutDetail", method = RequestMethod.POST)
	private Map<String, Object> layoutData(Integer layoutID,@DateTimeFormat(pattern="yyyy-MM-dd")Date fromDate, @DateTimeFormat(pattern="yyyy-MM-dd")Date toDate){
		return employeeService.getLayoutDetailService(layoutID, fromDate, toDate);
	}
	
//	@ResponseBody
//	@RequestMapping(value = "addOrder", method = RequestMethod.POST)
//	private Map<String, Object> addOrder(Integer roomID, String plate, //Ϊ����֤һ����
//			@DateTimeFormat(pattern="yyyy-MM-dd")Date fromDate, @DateTimeFormat(pattern="yyyy-MM-dd")Date toDate,
//			Double charge, Double realCharge, Double price,
//			Integer memID, String memNum, String plus, String describe, @RequestBody List<PersonBean> persons, Boolean checkIn){
//		return employeeService.getAddOrderService(roomID, plate, fromDate, toDate, charge, realCharge, price, memID, memNum, plus, describe, persons, checkIn);
//	}
	
	@ResponseBody
	@RequestMapping(value = "addOrder", method = RequestMethod.POST)
	private Map<String, Object> addOrder(@RequestBody OrderBean order){
		return employeeService.getAddOrderService(order);
	}
	
	@ResponseBody
	@RequestMapping(value = "orderData", method = RequestMethod.POST)
	private Map<String, Object> orderData(
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
		return employeeService.getOrderDataService(type,  state,  orderNum,  plate, people, employee, fromDate, toDate,  startDate,  endDate, sortName,  sortOrder, offset < 0 ? 0 : offset, pageSize < 1 ? 1 : pageSize, fromSite);
	}
	
	@ResponseBody
	@RequestMapping(value = "orderPersons", method = RequestMethod.POST)
	private Map<String, Object> orderPersons(Integer orderID){
		return employeeService.getOrderPersonsDetailService(orderID);
	}
	
	@ResponseBody
	@RequestMapping(value = "orderAllDetails", method = RequestMethod.POST)
	private Map<String, Object> orderAllDetails(Integer orderID){
		return employeeService.getOrderAllDetailService(orderID);
	}
	
	@ResponseBody
	@RequestMapping(value = "cancelOrders", method = RequestMethod.POST)
	private Map<String, Object> cancelOrders(@RequestParam(value="ids[]") int[] ids){
		return employeeService.getCancelOrderService(ids);
	}
	
	@ResponseBody
	@RequestMapping(value = "addPersons", method = RequestMethod.POST)
	private Map<String, Object> addPersons(@RequestBody List<PersonBean> list){
		return employeeService.getAddPersonsService(list);
	}
	
	@ResponseBody
	@RequestMapping(value = "checkInAndOut", method = RequestMethod.POST)
	private Map<String, Object> checkInAndOut(@RequestParam(value="ids[]") int[] ids, Integer type){
		return employeeService.getCheckInAndOutService(ids, type);
	}
	
	@ResponseBody
	@RequestMapping(value = "updateOrderPayState", method = RequestMethod.POST)
	private Map<String, Object> updateOrderPayState(Integer orderID, Double realCharge){
		return employeeService.getUpdateOrderPayStateService(orderID, realCharge);
	}

}
