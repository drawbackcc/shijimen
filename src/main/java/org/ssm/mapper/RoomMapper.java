package org.ssm.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ssm.entity.RoomBean;


@Mapper
public interface RoomMapper {
	
	public List<RoomBean> getRoomList(Map<String, Object> params);
	
	public List<Integer> getRoomIdList(Map<String, Object> params);
	
	public List<Integer> getBookedRoomIdList(@Param("from")Date from, @Param("to")Date to, @Param("oState")Integer orderState);
	
	public Integer getRoomNum(Map<String, Object> params);
	
	public Integer insertRoomByBatch(@Param("rooms")List<RoomBean> rooms);
	
	public Integer deleteRoomByBatch(@Param("ids")int[] ids);
	
	public Integer updateRoom(@Param("r_id")Integer roomID, @Param("plate")String plate,@Param("floor")Integer floor,@Param("l_id")Integer layoutID,@Param("state")Integer state);
}
