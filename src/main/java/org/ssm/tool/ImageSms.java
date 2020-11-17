package org.ssm.tool;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.Random;

import javax.imageio.ImageIO;

public class ImageSms {
	
	 // ͼƬ�Ŀ�ȡ�  
    private int width = 160;  
    // ͼƬ�ĸ߶ȡ�  
    private int height = 40;  
    // ��֤���ַ�����  
    private int codeCount = 4;  
    // ��֤���������  
    private int lineCount = 150;  
    // ��֤��  
    private String code = null;  
    // ��֤��ͼƬBuffer  
    private BufferedImage buffImg = null;  
    
 // ��֤�뷶Χ,ȥ��0(����)��O(ƴ��)���׻�����(Сд��1��LҲ����ȥ��,��д������)  
    private char[] codeSequence = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',  
            'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',  
            'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9'};  
  
    /** 
     * Ĭ�Ϲ��캯��,����Ĭ�ϲ��� 
     */  
    public ImageSms() {  
        this.createCode();  
    }  
    
    /** 
     * @param width  ͼƬ�� 
     * @param height ͼƬ�� 
     */  
    public ImageSms(int width, int height) {  
        this.width = width;  
        this.height = height;  
        this.createCode();  
    }  
  
    /** 
     * @param width     ͼƬ�� 
     * @param height    ͼƬ�� 
     * @param codeCount �ַ����� 
     * @param lineCount ���������� 
     */  
    public ImageSms(int width, int height, int codeCount, int lineCount) {  
        this.width = width;  
        this.height = height;  
        this.codeCount = codeCount;  
        this.lineCount = lineCount;  
        this.createCode();  
    }  
  
    public void createCode() {  
        int x = 0, fontHeight = 0, codeY = 0;  
        int red = 0, green = 0, blue = 0;  
  
        x = width / (codeCount + 2);//ÿ���ַ��Ŀ��(���Ҹ��ճ�һ���ַ�)  
        fontHeight = height - 2;//����ĸ߶�  
        codeY = height - 4;  
  
        // ͼ��buffer  
        buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
        Graphics2D g = buffImg.createGraphics();        
          
        /*// ��ͼ�񱳾����Ϊ��ɫ  
        g.setColor(Color.WHITE);  
        g.fillRect(0, 0, width, height);*/
        // �����������ʹ�ñ���͸�� 
        buffImg = g.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);  
        g.dispose();  
        g = buffImg.createGraphics();  
        // ����͸���������  
          
        // ��ͼBasicStroke��JDK���ṩ��һ�������Ļ�����,���Ƕ������û��ʵĴ�ϸ���Ϳ�����drawPanel�����⻭���Լ���Ҫ��ͼ���ˡ�  
        g.setColor(new Color(255, 0, 0));  
        g.setStroke(new BasicStroke(1f));  
        g.fillRect(128, 128, width, height);
        
        // ���������  
        Random random = new Random();    
                        //�����������͡������С��������ʽ��
                Font font = new Font("΢���ź�",Font.PLAIN, fontHeight);
  
        g.setFont(font);  
  
        for (int i = 0; i < lineCount; i++) {  
            // ���������ʼ�ͽ�������  
            int xs = random.nextInt(width);//x���꿪ʼ  
            int ys = random.nextInt(height);//y���꿪ʼ  
            int xe = xs + random.nextInt(width / 8);//x�������  
            int ye = ys + random.nextInt(height / 8);//y�������  
  
            // �����������ɫֵ���������ÿ�������ߵ���ɫֵ������ͬ��  
            red = random.nextInt(255);  
            green = random.nextInt(255);  
            blue = random.nextInt(255);  
            g.setColor(new Color(red, green, blue));  
            g.drawLine(xs, ys, xe, ye);  
        }  
  
        // randomCode��¼�����������֤��  
        StringBuffer randomCode = new StringBuffer();  
        // �������codeCount���ַ�����֤�롣  
        for (int i = 0; i < codeCount; i++) {  
            String strRand = String.valueOf(codeSequence[random.nextInt(codeSequence.length)]);  
            // �����������ɫֵ���������ÿ���ַ�����ɫֵ������ͬ��  
            red = random.nextInt(255);  
            green = random.nextInt(255);  
            blue = random.nextInt(255);  
            //ָ��ĳ����ɫ
            //g.setColor(new Color(252, 145, 83));
            g.setColor(new Color(red, green, blue));  
            g.drawString(strRand, (i + 1) * x, codeY);  
            // ���������ĸ�����������һ��  
            randomCode.append(strRand);  
        }  
        // ����λ���ֵ���֤�뱣�浽Session�С�  
        code = randomCode.toString();  
        System.out.println(code);
    }  
  
    public void write(String path) throws IOException {  
        OutputStream sos = new FileOutputStream(path);  
        this.write(sos);  
    }  
  
    public void write(OutputStream sos) throws IOException {  
        ImageIO.write(buffImg, "png", sos);  
        sos.close();  
    }  
  
    public BufferedImage getBuffImg() {  
        return buffImg;  
    }  
  
    public String getCode() {  
        return code;  
    }  
  
    /** 
     * ���Ժ���,Ĭ�����ɵ�C�� 
     * @param args 
     */  
    public static void main(String[] args) {  
        ImageSms vCode = new ImageSms(141,44,5,300);  
        try {  
            String path="C:/Users/Chenzhimei/Pictures/"+new Date().getTime()+".png";  //C:\Users\Chenzhimei\Pictures
            System.out.println(vCode.getCode()+" >"+path);  
            vCode.write(path);  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  

}
