package org.ssm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ssm.entity.EmployeeBean;

@Mapper
public interface EmployeeMapper {
	
	public List<EmployeeBean> getEmployeeList(Map<String, Object> params);
	
	public List<Integer> getEmployeeIdList(@Param("employee")String employee);
	
	public Integer getEmployeeNum(Map<String, Object> params);
	
	public Integer insertEmployeeByBatch(@Param("employees")List<EmployeeBean> employees);
	
	public Integer deleteEmployeeByBatch(@Param("ids")int[] ids);
	
	public Integer updateEmployee(@Param("e")EmployeeBean employee);
	
	public Integer updateEmployeePassword(@Param("password")String password,@Param("ids")int[] ids);

}
