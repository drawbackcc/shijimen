package org.ssm.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import org.ssm.service.HotelService;
import org.ssm.tool.AlipayConfig;


@Controller
@RequestMapping("alipay")
public class AlipayController {
	
	@Autowired private HotelService hotelService;
	
	/**
     * ǰ��֧�������������ؽ���֧��
     */
	@ResponseBody
	@RequestMapping(value = "alipayPay", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	private String alipayTradePagePay(String tradeno, String amount, String subject, String body) {
		System.out.println(tradeno);
		System.out.println(amount);
		System.out.println(subject);
		System.out.println(body);
		try {
		    AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);
			AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
			alipayRequest.setReturnUrl(AlipayConfig.return_url);
			alipayRequest.setNotifyUrl(AlipayConfig.notify_url);
//			String timeout = "1c";
			//�ñʶ��������������ʱ�䣬���ڽ��رս��ס�ȡֵ��Χ��1m��15d��m-���ӣ�h-Сʱ��d-�죬1c-���죨1c-���������£����۽��׺�ʱ����������0��رգ��� �ò�����ֵ������С���㣬 �� 1.5h����ת��Ϊ 90m
			alipayRequest.setBizContent("{\"out_trade_no\":\"" + tradeno + "\"," + "\"total_amount\":\"" + amount
					+ "\"," + "\"subject\":\"" + subject + "\"," + "\"body\":\"" + body + "\","
				//	+ "\"timeout_express\":\""+ timeout +"\","
					+ "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
			String result = alipayClient.pageExecute(alipayRequest).getBody();
			return result;
		} catch (AlipayApiException e) {
			e.printStackTrace();
		}
		return "������Ϣ����!";
	}
	
	
	/**
     * ֧����ͬ��֪ͨҳ��,�ɹ�������ҳ
     * ��ҳ��ĳ�����Կɲ����ڷ������϶��Ǳ����ϵ��ԡ����С� 
     */
	@RequestMapping("return_url")
	private String returnUrl(HttpServletRequest request) {
		System.out.println("return_url");
		try {
			Map<String, String> params = new HashMap<String, String>();
			Map<String, String[]> requestParams = request.getParameterMap();
			for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
				String name = (String) iter.next();
				String[] values = (String[]) requestParams.get(name);
				String valueStr = "";
				for (int i = 0; i < values.length; i++) {
					valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
				}
				// ����������δ����ڳ�������ʱʹ��
			    valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
				params.put(name, valueStr);
				System.out.println(name + ":" + valueStr);
			}

			boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset, AlipayConfig.sign_type);
			if(signVerified) {
				//�̼ҽ��׺�
				String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
				//֧�������׺�
				String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");
				//���׽��
				String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"),"UTF-8");
				//ҵ�����
				if(hotelService.updateAlipayService(out_trade_no, trade_no, Double.valueOf(total_amount))) {
					return "redirect:/member/member-center-hotelOrder?type=wait";
				}else {
					return "redirect:/alipay/error";
				}
			}else {
				System.out.println("��ǩʧ��");
			}
		} catch (AlipayApiException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "redirect:/member/member-center-hotelOrder?type=wait";
	}
	
	 /**
     * ֧�����첽 ֪ͨҳ��
     * ��ҳ��ĳ�����Ա����ڷ������ϵ��ԡ����С� 
     */
	@RequestMapping(value = "notify_url", method = RequestMethod.POST)
	private String notifyUrl(HttpServletRequest request) {
		System.out.println("notify_url");
		// ��ȡ֧����POST����������Ϣ
//		try {
//			Map<String, String> params = new HashMap<String, String>();
//			Map<String, String[]> requestParams = request.getParameterMap();
//			for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
//				String name = (String) iter.next();
//				String[] values = (String[]) requestParams.get(name);
//				String valueStr = "";
//				for (int i = 0; i < values.length; i++) {
//					valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
//				}
//				// ����������δ����ڳ�������ʱʹ��
//			    valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
//				params.put(name, valueStr);
//				System.out.println(name + ":" + valueStr);
//			}
//
//			boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key,
//					AlipayConfig.charset, AlipayConfig.sign_type);
//			System.out.println(signVerified);
//			if(signVerified) {
//				String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
//				System.out.println(out_trade_no + ":" + out_trade_no);
//				//֧�������׺�
//				String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");
//				System.out.println(trade_no + ":" + trade_no);
//				//����״̬
//				String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");
//				System.out.println(trade_status + ":" + trade_status);
//			}
//		} catch (AlipayApiException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		return "alipay/notify_url";
	}
	/**
	 * �̼��˺�rajwej2373@sandbox.com
�̻�UID2088102180787077
��¼����111111
�˻����
970.15��ֵȡ��
�����Ϣ
����˺�qcetsd4236@sandbox.com
��¼����111111
֧������111111
�û�����ɳ�价��
֤���������֤(IDENTITY_CARD)
֤������851151197111158705
	 * 
	 */
	@RequestMapping("error")
	private String error() {
		return "alipay/error";
	}
	

}
