package org.ssm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ssm.entity.CommentBean;


@Mapper
public interface CommentMapper {
	
	public List<CommentBean> getCommentList(Map<String, Object> params);
	
	public Integer getCommentNum(Map<String, Object> params);//����������ͬ���Ĳ�������ȥpagesize��pagenum��Ȼ��ͨ��list.size�ó���������Ҫװ�ض����˷���Դ

	public Integer insertComment(@Param("comment")CommentBean comment);
}
