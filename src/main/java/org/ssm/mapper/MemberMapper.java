package org.ssm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ssm.entity.MemberBean;


@Mapper
public interface MemberMapper {
	
	public List<MemberBean> getMemberList(Map<String, Object> params);
	
	public List<Integer> getMemberIdList(Map<String, Object> params);
	
	public Integer getMemberNum(Map<String, Object> params);
	
//	public Integer updateMemberInfo(Map<String, Object> params);
	
    public Integer insertMemberByBatch(@Param("members")List<MemberBean> members);
	
	public Integer deleteMemberByBatch(@Param("ids")int[] ids);
	
	public Integer updateMember(@Param("m")MemberBean member);
	
	public Integer updateMemberPassword(@Param("password")String password,@Param("ids")int[] ids);

}
