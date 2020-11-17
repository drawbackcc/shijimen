package org.ssm.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AnalysisMapper {
	
	public Double getTotalCharge(Map<String, Object> params);

}
