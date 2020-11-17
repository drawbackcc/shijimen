package org.ssm.controller;

import java.util.Date;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.ssm.entity.OrderBean;
import org.ssm.service.HotelService;


@Controller
public class HotelController {
	
	@Autowired private HotelService hotelService;
	@Autowired private HttpSession session;
	
	@RequestMapping("/index")
	private String index(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();//��������Ի�ȡһ��cookie����
        if (null==cookies) {
            System.out.println("û��cookie=========");
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(120 * 60);// ����Ϊ120min
            cookie.setPath("/");
            response.addCookie(cookie);
        } else {
            for(Cookie cookie : cookies){
                System.out.println("name:"+cookie.getName()+",value:"+ cookie.getValue());
            }
        }
		return "member/index";
		
	}
	
	
	@RequestMapping("/hotel-reservation")
	private String reservation(@DateTimeFormat(pattern="yyyy-MM-dd")Date from,  @DateTimeFormat(pattern="yyyy-MM-dd")Date to, Model model) {
		model.addAllAttributes(hotelService.getHotelReservationService(from, to));
		return "member/hotel-reservation";
	}
	
	@RequestMapping("{layoutID}/hotel-reservation-detail")
	private String reservationDetail( @DateTimeFormat(pattern="yyyy-MM-dd")Date from,  @DateTimeFormat(pattern="yyyy-MM-dd")Date to, @PathVariable Integer layoutID, Model model) {
		model.addAllAttributes(hotelService.getHotelReservationDetailService(from, to, layoutID));
		return "member/hotel-reservation-detail";
	}
	
	@ResponseBody
	@RequestMapping("/getComments")
	private Map<String, Object> getLayoutInfo(Integer layoutID,Integer curPage,Integer pageSize) {
		return hotelService.getHotelReservationDetailCommentService(layoutID, curPage, pageSize);
	}
	
	@ResponseBody
	@RequestMapping(value = "/isDetail01Quritied", method = RequestMethod.POST)
	private Map<String, Object> isDetail01Quritied(){
		boolean status = false;
		String message;
		Map<String, Object> map = new HashMap<String, Object>();
		if(session.getAttribute("memberID") == null){
			status = false;
			message = "����δ��¼";
		}else {
			status = true;
			message = "����ɹ�";
		}
		map.put("status", status);
		map.put("message", message);
		return map;
	}
	
	@RequestMapping(value = "hotel-reservation-detail01", method = RequestMethod.POST)
	private String hotelrReservationDetail01(@DateTimeFormat(pattern="yyyy-MM-dd")Date from, @DateTimeFormat(pattern="yyyy-MM-dd")Date to, Integer layoutID, Model model){	
		System.out.println(from);
		System.out.println(to);
		System.out.println(layoutID);
		Map<String, Object> params = hotelService.getHotelrReservationDetail01Service(from, to, layoutID);
		if((Boolean)params.get("status")) {
			model.addAllAttributes(params);
			return "member/hotel-reservation-detail01";
		}
		return "member/login";
	}
	
	@ResponseBody
	@RequestMapping(value = "submitOrder", method = RequestMethod.POST)
	private Map<String, Object> submitOrder(@RequestBody OrderBean order) {
		return hotelService.getAddOrderService(order);
	}
	

//	@RequestMapping(value = "submitOrder", method = RequestMethod.POST)
//	private String submitOrder(
//			Integer layoutID, 
//			String describe, 
//			@DateTimeFormat(pattern="yyyy-MM-dd")Date fromDate, 
//			@DateTimeFormat(pattern="yyyy-MM-dd")Date toDate, 
//			Double charge, 
//			Double price, 
//			List<PersonBean> persons,
//			Model model) {
//		OrderBean order = new OrderBean();
//		order.setLayoutID(layoutID);
//		order.setDescribe(describe);
//		order.setFromDate(fromDate);
//		order.setToDate(toDate);
//		order.setCharge(charge);
//		order.setPrice(price);
//		order.setRealCharge(0.0);
//		order.setPersons(persons);
//		System.out.print(persons);
//		Map<String, Object> map = hotelService.getAddOrderService(order);
//		Boolean status = (Boolean)map.get("status");
//		if(status) {
//			model.addAttribute("WIDout_trade_no", order.getOrderNum());
//			model.addAttribute("WIDtotal_amount", order.getCharge());
//			model.addAttribute("WIDsubject", order.getDescribe());
//			model.addAttribute("WIDbody", order.getDescribe() + fromDate + toDate);
//			return "alipay/alipay.trade.page.pay";
//		}
//		return "alipay/error";
//	}
	

}
