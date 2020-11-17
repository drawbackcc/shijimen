package org.ssm.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

@Controller
@CrossOrigin
@RequestMapping("test")
@SessionAttributes(value = {"id","name"})
public class TestController {
	
	@Autowired private HttpSession session;
	
	@RequestMapping("login")
	private String login(Integer id, String name, Model model) {
		model.addAttribute("id", id);
		model.addAttribute("name", name);
		System.out.println("login ----" + id + ", " + name);
		System.out.println("login sessionid" + session.getId());
	    
		return "test/index";
	}
	
	@RequestMapping("login2")
	private String login2(Integer id, String name, HttpSession session) {
		session.setAttribute("id", id);
		session.setAttribute("name", name);
		System.out.println("login2 sessionid" + session.getId());
		return "test/index";
	}
	
	@RequestMapping("login3")
	private String login3(Integer id, String name, HttpServletRequest request) {
		request.getSession().setAttribute("id", id);
		request.getSession().setAttribute("name", name);
		System.out.println("login2 sessionid" + request.getSession().getId());
		return "test/index";
	}
	
	@RequestMapping("logout")
	private String logout(SessionStatus sessionStatus, HttpSession session) {
		System.out.println("logout sessionid" + session.getId());
		session.removeAttribute("id");
	    session.removeAttribute("name");
		sessionStatus.setComplete();
		return "test/index";
	}
	
	@RequestMapping("index")
	private String index(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("index sessionid" + session.getId());
		Cookie[] cookies = request.getCookies();//��������Ի�ȡһ��cookie����
        if (null==cookies) {
            System.out.println("û��cookie=========");
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(30 * 60);// ����Ϊ30min
            cookie.setPath("/");
            response.addCookie(cookie);
        } else {
            for(Cookie cookie : cookies){
                System.out.println("name:"+cookie.getName()+",value:"+ cookie.getValue());
            }
        }
		return "test/index";
	}
	
	@ResponseBody
	@RequestMapping("info")
	private Map<String, Object> info(Model model){
		System.out.println("info sessionid" + session.getId());
		Map<String, Object> map = new HashMap<>();
		map.put("id", session.getAttribute("id"));
		map.put("name", session.getAttribute("name"));
//		map.put("id2", request.)
		map.put("idFromMap", model.asMap().get("id"));
		map.put("nameFromMap", model.asMap().get("name"));
		System.out.println("info ----" + model.asMap().get("id") + ", " + model.asMap().get("name"));
		return map;
	}

}
