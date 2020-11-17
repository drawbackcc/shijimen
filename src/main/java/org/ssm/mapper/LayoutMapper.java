package org.ssm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ssm.entity.LayoutBean;

@Mapper
public interface LayoutMapper {
	
	public List<LayoutBean> getLayoutBeans(Map<String, Object> params);
	
	public Integer getLayoutBeansNum(Map<String, Object> params);

	public List<LayoutBean> getLayoutAndRoomBeans(Map<String, Object> params);
	
//	public List<LayoutBean> getBookedLayoutAndRoomBeans(Map<String, Object> params);
//	
//	public List<LayoutBean> getUnbookedLayoutAndRoomBeans(Map<String, Object> params);
	
	public Integer insertLayoutByBatch(@Param("layouts")List<LayoutBean> layouts);
	
	public Integer deleteLayoutByBatch(@Param("ids")int[] ids);
	
	public Integer updateLayoutImage(@Param("layoutID")Integer layoutID, @Param("images")String images);
	
	public String getLayoutImage(@Param("layoutID")Integer layoutID);

}
