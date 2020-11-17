package org.ssm.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface DynamicUpdateTableMapper {
	
	int dynamicUpdateTable(@Param("table") Map<String, Object> table);

}
