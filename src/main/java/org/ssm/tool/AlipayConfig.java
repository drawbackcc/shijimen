package org.ssm.tool;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016102300746098";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCPmM6Qxv3+hEWLLi15qPqL7fWhzVyCAbuWJGTLOMfLp3pKVg1TmsUYFP9ECbBZIE7aNJL+WNrVxMJFUzQVbJDbio4y/oclUsX6mnL56DoWRgLF3wwlomRTl/r8Q5mOP0W+2fLR2gZT7S2fCH0OWvMO60+DBmXHJs0DzHWer3gGWVjHFUgvjbijUJZNNTs8FZ+QE9qJkvhcM4mbESTyz3qvBej3/fKmdC244ttvHcq0sy8rtjFPO9/CO/EJZZlXa5zpoVAWBZWS3Ct76DhpgJEr0zSX85CTVVRwFVFsY+5HqtsnQzAew4c9l867xkcu3q23aZH+yPs3Era4xl9/VoOHAgMBAAECggEAbROP5V2i1lC3Ws/K710yZFRvf2a1XHPggF5Iyi3pZoNjW1Aec2FfUbmxZYdOk4T9ILdK6TWplTQOtgZLy/JZ3spS1d2N3wYPKRtlNvv2E7E+rfuOCJBgUTdjCXh4Dht16VE5J7rLj7jcLK+P/vWLJ8wK6+ZSLYMFvFr1BYMYUwkrsYIohIWV0OiOp9BauCeeZdLHFHzH3jD88PmDDoVQEf2Fv1mN7TvZptnKPq48m2eAZzUu/gZ4EdchudvQULIhG5ySDY6uiWZJWnnN1tpdOLL5sEJnBxsiWZdfMZM8/lKb0pvfnIbzSd5sMFJKkDOcOHZ+Bqh3USeMyPa791R5UQKBgQDKqhUona3yr0M/GTQXL5QYfmgaBAwBHX7nnoY9jfXIlIvYb073kskEfxb+ppqAxCNldbZkPkL9elx/cQb/pY5OiMuxZV4ZUQVEgNksafd6r6twhsJelus365C9JC3HPIchuk5OXNV+pYPp7WbDhnOHj9Sw8/1T+XSoCUFXQemznQKBgQC1YznkpPuaMFRj/DwfI+7fisd3DOrm2y9gY9S30Ovtfd8ilE8ZUgwcl6X87mZUk3kXHGr1MQhnOzde/r9JitoOolcblqkhZoVxREqLBdwQyB5AGzWKBDhIvR3m0CThn4K+xxrSTsHccoI4DuCNvAfl7OcifS5WIunbYdc5Tv/kcwKBgHEPW4hyFsWJktlTpSS+LT9Q3aCN22iP3Ok4HamfVZuVi0KuLf6di7kPcXOU3CKzyQ9kEOFxfovMRGfwVTgvUulrFT+czlcPRQIHY6CMaTyvXdQDydFdHlHu/6sU0NkSYkylk+PRlGT3z1SkVS0FB9R7n+sr4oqDYtoPd71HDypdAoGBAKqjRzI+tuctsiZBgvm0nyKy9sSbZVx6NE6Ue+fU5i4MbN6l8OecFQLM8v1H9QJ5nb/NHx282+/peESomKGBu3Nq61Fr4X4naT/OA+ZXQ9iRukuKjUpif+SF7NxXUWrj2WbJ/gR8zMkq/C/qZvtPOYrm2+XJJ88mlyOoHoWuOPLbAoGAGIEcWyJwaoc60w0MptNHdkEnCsrujqjFDICDqhqsSEMlJdujkOOiEt4lvqmMfhm8C70Wf5RyOnevfvtMQpY5NkcuZWUesShJPaXMMBYqhWoINPHxtIC1OzB7sT4XMyk9E2KwHN9WwQtPBOA5s8Y0wgOruVoibFxGpi91fBukn5A=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkd7V+YtXwGIjhKrc/JNY43y6AP9OmF8UGWr+vzddzgW8ydkqd9CWEyEGAxZ1wfYhxYnmwFJWfp3K6SGis0DEITwb8/NRrcA8uN/EFLOcWh5cxY4siKSTAWTH+AI6Scy1zwH0QQYvgge7BF02SFe5WrMYmE/YxZisOrSquvvk/pqMWOcERoDhWivNPUs9/sg2uJK2dS376/KkBSNYavVg8VQGFlVZt+5nWqjJkurYuzkxeH0emSNGs1579U1cOZ4nyV9z85LyaBbyE2XWV5D5iBnj81MU1AtTSMJfgausc2d5VxktvUogS3ttL2SLCJI1ZYsbfdOSLg4prjCSCzeDwIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://localhost:8080/shijimen/alipay/notify_url";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/shijimen/alipay/return_url";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\Users\\Chenzhimei\\Downloads";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

