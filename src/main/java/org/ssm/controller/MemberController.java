package org.ssm.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.ssm.entity.MemberBean;
import org.ssm.service.MemberService;
import org.ssm.tool.ImageSms;

@Controller
@CrossOrigin
@SessionAttributes(value = {"memberID","memberName","isPasswordRight", "valifCode"})//��model��memberID��memberName����session
@RequestMapping("member")
public class MemberController {
	
	@Autowired private MemberService memberService;
	@Autowired private HttpSession session;
	
	@RequestMapping("login")
	private String login(HttpServletRequest request, HttpServletResponse response) {
        if (null == request.getCookies()) {
            System.out.println("û��cookie=========");
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(120 * 60);// ����Ϊ120min
            cookie.setPath("/");
            response.addCookie(cookie);
        }
		return "member/login";
	}
	
//ȫ���˳�?�������û���Ա��������Ա?
	@RequestMapping("logout")
	private String logout(SessionStatus sessionStatus, HttpSession session) {
		session.removeAttribute("memberID");
	    session.removeAttribute("memberName");
	    session.removeAttribute("valifCode");
		sessionStatus.setComplete();
		return "redirect:/index";
	}
	
	@RequestMapping("register")
	private String register() {	
		return "member/register";
	}
	
	@ResponseBody
	@RequestMapping("valifcode")
	private Map<String, Object> valifcode(Model model, HttpSession session){
		Map<String, Object> map = new HashMap<>();
		try {
			String appRootpath = System.getProperty("appRootPath");
			ImageSms vCode = new ImageSms(141,44,5,300);
			String name = "" + new Date().getTime()+".png";
			String path= appRootpath + "/WEB-INF/static/hotel/verifcode/" + name; 
            vCode.write(path);  
            model.addAttribute("valifCode", vCode.getCode());
            map.put("status", true);
			map.put("imageUrl", "static/hotel/verifcode/" + name);
			
		} catch (Exception e) {
			map.put("status", false);
			map.put("message", "��ȡ��֤��ʧ��");
		}
		return map;
	}
	
	@RequestMapping("forget")
	private String forget() {
		return "member/forget";
	}
	
	@ResponseBody
	@RequestMapping(value = "isLogin", method = RequestMethod.POST)
	private Boolean isLogin() {
		if(session.getAttribute("memberID") == null)//δ��¼
			return false;
		return true;
	}
	
	@ResponseBody
	@RequestMapping(value = "doLogin", method = RequestMethod.POST)
	private Boolean doLogin(String phone, String password, Model map, HttpSession session) {
		if(null == phone || "".equals(phone) || null == password || "".equals(password))
			return false;
		MemberBean member = memberService.getMemberBeanService(null, phone, password);
		System.out.println(member);
		if(member == null)
			return false;
		map.addAttribute("memberID", member.getMemID());
		map.addAttribute("memberName", member.getName());
		return true;
	}
	
	@ResponseBody
	@RequestMapping(value = "doRegister", method = RequestMethod.POST)
	private Map<String, Object> doRegister(String phone, String valifCode, String password) {
		return memberService.getRigisterService(phone, valifCode, password);
	}
	
	
	@RequestMapping("member-center")
	private String memberCenter(HttpSession session) {
		if(session.getAttribute("memberID") == null) {
			System.out.println("member-center controller, δ��¼");
			return "redirect:login";//�ض�������¼
			//δ��¼
		}	
		System.out.println("member-center controller, ��¼");
		return "member/member-center";
	}
	
	@RequestMapping("member-center-hotelOrder")
	private String memberCenterHotelOrder(String type, Integer curPage, Integer pageSize, Model model){
		Integer memID = (Integer)session.getAttribute("memberID");
		if(memID == null)//δ��¼
			return "redirect:login";//�ض�������¼
		if(null == pageSize || pageSize <= 0) pageSize = 5;
		if(null == curPage || curPage <= 0) curPage = 1;
		Map<String, Object> map = null;
		if(type != null && type.equals("wait")) {//δ��ס
			map = memberService.getMemberHotelOrderService(memID, curPage, pageSize, "wait");
		}else {//ȫ��
			map = memberService.getMemberHotelOrderService(memID, curPage, pageSize, "all");
		}
		model.addAllAttributes(map);
		return "member/member-center-hotelOrder";
	}
	
	@RequestMapping("member-center-information")
	private String memberCenterInformation(Model model){
		Integer memID = (Integer)session.getAttribute("memberID");
		if(memID == null)//δ��¼
			return "redirect:login";//�ض�������¼
		MemberBean member = memberService.getMemberBeanService(memID, null, null);
		StringBuilder sb = new StringBuilder(member.getPhone());
		member.setPhone(sb.replace(3, 7, "****").toString());
		model.addAttribute("member", member);
		return "member/member-center-information";
	}
	
	@ResponseBody
	@RequestMapping(value = "updateMemberInfo", method = RequestMethod.POST)
	private Map<String, Object> update(
			Integer memberID, //@RequestParam(required = true)
			String name, 
			String phone, 
			String password, 
			String rePassword,
			String email, 
			Integer gender, 
			String selfPs, 
			String otherPs, 
			Integer state,
			Integer type,
			Model model,
			HttpSession session){
		;
		Integer memID = (Integer)session.getAttribute("memberID");
		Map<String, Object> message = new HashMap<>();
		if(type == null ||memID == null || memberID == null || memID.intValue() != memberID.intValue()) {//δ��¼,�ж�����Integer�Ƿ���ȣ�������==
			message.put("status", false);
			message.put("message", "����δ��¼");
			return message;
		}
		if(type == 3) {//�޸�����
			if(password != null && rePassword != null && !password.trim().equals(rePassword.trim())) {
			    message.put("status", false);
			    message.put("message", "���벻һ��");
			    return message;
			}else if (session.getAttribute("isPasswordRight") == null || session.getAttribute("isPasswordRight") != null && !(Boolean)session.getAttribute("isPasswordRight")) {
				message.put("status", false);
			    message.put("message", "����δ��֤");
			    return message;
			}else {
				
			}
		}
		model.addAttribute("isPasswordRight", false);
		message = memberService.updateMemberService(memberID, name, phone, password, email, gender, selfPs, otherPs, state, type);			
		return message;
	}
	
	@RequestMapping("member-center-message")
	private String memberCenterMessage(){
		if(session.getAttribute("memberID") == null)//δ��¼
			return "redirect:login";//�ض�������¼
		return "member/member-center-message";
	}
	
	@RequestMapping("member-center-password")
	private String memberCenterPassword(){
		if(session.getAttribute("memberID") == null)//δ��¼
			return "redirect:login";//�ض�������¼
		return "member/member-center-password";
	}
	
	@ResponseBody
	@RequestMapping(value = "isPasswordRight", method = RequestMethod.POST)
	private Boolean isPasswordRight(String password, Model model, HttpSession session) {
		if(session.getAttribute("memberID") == null || password == null || password.trim().equals(""))
			return false;
		Integer memberID = (Integer)session.getAttribute("memberID");
		if(memberService.getMemberBeanService(memberID, null, password) != null) {
			model.addAttribute("isPasswordRight", true);
			return true;
		}
		return false;
	}
	
	@ResponseBody
	@RequestMapping(value = "comment", method = RequestMethod.POST)
	private Map<String, Object> comment(Integer orderID, String content, Integer service, Integer device, Integer environment) {
		return memberService.getCommentService(orderID, content, service, device, environment);
	}
	
	@ResponseBody
	@RequestMapping(value = "cancel", method = RequestMethod.POST)
	private Map<String, Object> cancel(String orderNum) {
		return memberService.cancelOrderService(orderNum);
	}

}
