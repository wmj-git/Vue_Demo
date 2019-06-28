export default {
  data: null,
  win: [
    {
      id: "menu",
      title: "_",
      top: "20%",
      left: 20,
      width: 100,
      height: 450,
      show: false,
      resizable: false,
      maximizable: false,
      class: "em-menu-window",
      component: "em_menu",
      component_data: {}
    },
    {
      id: "type_manage",
      title: "类型管理",
      top: "20%",
      left: "20%",
      width: "45%",
      height: 516,
      show: false,
      class: "em-table-window",
      component: "list_table",
      component_data: {
        list: {
          list_url: "/rest/type/queryType",
          params: {relevanceId: 1},
          title: "分类",
          keyObj: {
            keyName: "parentId",
            keyValue: "0"
          },
        },
        operation: [
          {
            type: "complex_em_input",
            select: [
              {
                name: "类型名",
                params: "accountNumber"
              },
              {
                name: "英文名",
                params: "userEname"
              }
            ]

          },
          {
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "type_manage_table",
            fn: "search"
          },
          {
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "type_manage_table",
            fn: "add",
            url: "/user/userext/addPeopleInfo"
          },
          {
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "type_manage_table",
            fn: "modify",
          },
          {
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "type_manage_table",
            fn: "dele",
            url: ""
          }
        ],
        table: {
          id: "type_manage_table",
          table_url: "/rest/type/queryTypeByPages",
          label: [
            {
              name: "id",
              prop: "id",
              width: "80"
            },
            {
              name: "类型名称",
              prop: "typeCname",
              width: "140"
            },
            {
              name: "类型编码",
              prop: "typeCode",
              width: "180"
            },
            {
              name: "英文名",
              prop: "typeEname",
              width: "180"
            }, {
              name: "备注",
              prop: "remark",
              width: "180"
            }, {
              name: "父类型",
              prop: "parentId",
              width: "60"
            },
          ]
        }
      }
    },
    {
      id: "role_manage",
      title: "角色管理",
      top: 80,
      left: 400,
      width: 700,
      height: 400,
      class: "em-table-window",
      show: false,
      component: "sole_table",
      component_data: {
        operation: [
          {
            id:"role_manage_input_roleCname",
            type: "em_input",
            placeholder: "中文名",
            params: "roleCname"

          },
          {
            id:"role_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "role_manage_table",
            fn: "search"
          },
          {
            id:"role_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "role_manage_table",
            fn: "add",
            url: "/user/userext/addPeopleInfo"
          },
          {
            id:"role_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "role_manage_table",
            fn: "modify",
          },
          {
            id:"role_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "role_manage_table",
            fn: "dele",
            url: ""
          }

        ],
        table: {
          id: "role_manage_table",
          table_url: "/user/role/queryPage",
          label: [
            {
              name: "英文名",
              prop: "roleEname",
              width: "100"
            },
            {
              name: "中文名",
              prop: "roleCname",
              width: "100"
            },

            {
              name: "角色编码",
              prop: "roleCode",
              width: "80"
            },
            {
              name: "备注",
              prop: "remark",
              width: "80"
            },


          ]
        }
      }
    },
    {
      id: "system_record",
      title: "系统日志",
      top: 80,
      left: 400,
      width: 1100,
      height: 400,
      class: "em-table-window",
      show: false,
      component: "sole_table",
      component_data: {
        operation: [
          {
            id:"system_record_date",
            type: "em_date",

          },
          {
            id:"system_record_input_loginName",
            type: "em_input",
            placeholder: "用户名",
            params: "loginName"
          },
          {
            id:"system_record_input_methodName",
            type: "em_input",
            placeholder: "操作",
            params: "methodName"
          },
          {
            type: "em_input",
            placeholder: "请求地址",
            params: "requestUrl"
          },
          {
            id:"system_record_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            fn: "search",
            url: "/logs/select",
            control_id: "system_record_table",
          }
        ],
        table: {
          id: "system_record_table",
          table_url: "/logs/select",
          label: [
            {
              name: "用户名",
              prop: "loginName",
              width: "100"
            },
            {
              name: "操作",
              prop: "methodName",
              width: "120"
            },
            {
              name: "操作内容",
              prop: "operateContent",
              width: "200"
            },
            {
              name: "请求IP",
              prop: "requestIp",
              width: "120"
            },
            {
              name: "请求地址",
              prop: "requestUrl",
              width: "180"
            },
            {
              name: "生成时间",
              prop: "syslogTime",
              width: "140"
            },
          ]
        }
      }
    },
    {
      id: "account_manage",
      title: "账户管理",
      top: 80,
      left: 400,
      /* width:"55%",*/
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id:"account_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "帐户",
                params: "accountNumber"
              },
              {
                name: "英文名",
                params: "userEname"
              },
              {
                name: "中文名",
                params: "userCname"
              },
            ]

          },
          {
            id:"account_manage_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "account_manage_table",
            fn: "search"
          },
          {
            id:"account_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "account_manage_table",
            fn: "add",
            url: "/user/userext/addPeopleInfo"
          },
          {
            id:"account_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "account_manage_table",
            fn: "modify",
            url: "/user/userext/updatePeopleInfo"


          },
          {
            id:"account_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "account_manage_table",
            fn: "dele",
            url: "/user/userext/deletePeopleInfo"
          },
          {
            id:"account_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "account_manage_table",
            download_url: "/user/userext/downCsvmodel",
            import_url: "/user/userext/ajaxUpload"
          },
          {
            id:"account_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "account_manage_table",
            fn: "export",
            url: "/user/userext/exportCsv"
          }
        ],
        table: {
          id: "account_manage_table",
          reset_button:true,
          table_url: "/user/userext/queryUserExt",
          label: [
            {
              name: "账户",
              prop: "accountNumber",
              width: "100",
              type: "em_input",
              placeholder: "账户",
              params: "accountNumber",
              alter_show: true,
              add_show: true,
              alter_readonly: true,
              add_readonly: false
            },
            {
              name: "中文名",
              prop: "userCname",
              width: "100",
              type: "em_input",
              placeholder: "中文名",
              params: "userCname",
              alter_show: true,
              add_show: true
            },
            {
              name: "英文名",
              prop: "userEname",
              width: "100",
              type: "em_input",
              placeholder: "英文名",
              params: "userEname",
              alter_show: true,
              add_show: true
            },
            {
              name: "状态",
              prop: "userStateCvalue",
              width: "80",
              type: "em_selectUrl",
              params: "userState",
              optionUrl: "/user/userext/queryUserStateinfo",
              alter_show: true,
              add_show: true
            },
            {
              name: "性别",
              prop: "userSexCvalue",
              width: "80",
              type: "em_selectUrl",
              placeholder: "性别",
              params: "userSex",
              optionUrl: "/user/enuminfo/queryEnumInfoByType?enumType=user_sex",
              alter_show: true,
              add_show: true

            },
            {
              name: "电话",
              prop: "phoneNumber",
              width: "140",
              type: "em_input",
              placeholder: "电话",
              params: "phoneNumber",
              alter_show: true,
              add_show: true
            },
            {
              name: "年龄",
              prop: "userAge",
              width: "80",
              type: "em_input",
              placeholder: "年龄",
              params: "userAge",
              alter_show: true,
              add_show: true
            },
            {
              name: "部门",
              prop: "deptFullName",
              width: "80",
              type: "em_selectUrl",
              placeholder: "部门",
              params: "deptId",
              optionUrl: "/user/dept/queryAllDept",
              alter_show: true,
              add_show: true
            },
            {
              name: "人员类型",
              prop: "userTypeCvalue",
              width: "180",
              type: "em_selectUrl",
              placeholder: "人员类型",
              params: "userType",
              optionUrl: "/user/userext/queryUserTypeinfo",
              alter_show: false,
              add_show: true
            }
          ]
        }
      }


    },
    {
      id: "time_detective",
      title: "实时监测",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "oil_detetive",
      title: "土壤监测",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "population_detective",
      title: "人流量监测",
      top: 80,
      left: 400,
      class: "em-table-window",
      show: false,
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "air_detective",
      title: "空气监测",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "fire_alert",
      title: "火灾报警",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "grid_scope",
      title: "网格范围",
      top: 80,
      left: 400,
      show: false,
      width: 800,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "grid_scope_date",
            type: "em_date",

          },
          {
            id: "grid_scope_input_userCname",
            type: "em_input",
            placeholder: "用户名",
            params: "userCname"
          },
          {
            id: "grid_scope_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            fn: "search",
            url: "http://localhost:5000",
            control_id: "grid_scope_table",
          }
        ],
        table: {
          id: "grid_scope_table",
          table_url: "http://localhost:5000/db",
          label: [
            {
              name: "名称",
              prop: "grid_name",
              width: "100"
            },
            {
              name: "网格id",
              prop: "grid_id",
              width: "120"
            },
            {
              name: "网格位置",
              prop: "grid_position",
              width: "200"
            },
            {
              name: "备注",
              prop: "memo",
              width: "120"
            }


          ]
        }
      }
    },
    {
      id: "department_manage",
      title: "部门管理",
      top: 80,
      left: 400,
      height:500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "department_manage_input_shortName",
            type: "em_input",
            placeholder: "简称",
            params: "shortName"

          },
          {
            id: "department_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "department_manage_table",
            fn: "search"
          },
          {
            id: "department_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "department_manage_table",
            fn: "add",
            url: "/user/dept/addDept"
          },
          {
            id: "department_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "department_manage_table",
            fn: "modify",
          },
          {
            id: "department_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "department_manage_table",
            fn: "dele",
            url: "/user/dept/deleteDept"
          },
          {
            id: "department_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "department_manage_table",
            fn: "import"
          },
          {
            id: "department_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "department_manage_table",
            fn: "export"
          }
        ],
        table: {
          id: "department_manage_table",
          table_url: "/user/dept/queryAllUsableDeptInfo",
          label: [{
            name: "全称",
            prop: "fullName",
            width: "140",
            type: "em_input",
            params: "fullName",
            placeholder: "全称",
            alter_show: true,
            add_show: true

          },
            {
              name: "简称",
              prop: "shortName",
              width: "100",
              type: "em_input",
              params: "shortName",
              placeholder: "简称",
              alter_show: true,
              add_show: true
            },
            {
              name: "单位编码",
              prop: "deptCode",
              width: "80",
              type: "em_input",
              params: "deptCode",
              placeholder: "单位编码",
              alter_show: true,
              add_show: true


            },
            {
              name: "电话",
              prop: "phoneNumber",
              width: "140",
              type: "em_input",
              params: "phoneNumber",
              placeholder: "电话",
              alter_show: true,
              add_show: true
            },
            {
              name: "组织id",
              prop: "organizationId",
              width: "140",
              type: "em_input",
              params: "organizationId",
              placeholder: "组织id",
              alter_show: true,
              add_show: true
            },
            {
              name: "备注",
              prop: "remark",
              width: "100",
              type: "em_input",
              params: "remark",
              placeholder: "备注",
              alter_show: true,
              add_show: true

            }


          ]
        }

      }
    },
    {
      id: "tree_distribution",
      title: "特殊树木分布",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "",
      component_data: {
        name: ""
      }
    },
    {
      id: "tree_statistic",
      title: "特殊树木统计分析",
      top: 80,
      left: 400,
      width: 980,
      height: 600,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        table: {},
        chart: {
          type: "pie",
          id: "pie1",
          chart_url: 'http://localhost:3000/chartdata'
        }
      }
    },
    {
      id: "soil_temperature_analysis",
      title: "土壤温度统计分析",
      top: 80,
      left: 400,
      width: 1100,
      height: 800,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id:"soil_temperature_analysis_date",
            type: "em_date",

          },
          {
            id: "soil_temperature_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "soil_temperature_analysis_table",
            fn: "search"
          },
          {
            id: "soil_temperature_analysis_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "soil_temperature_analysis_table",
            fn: "import"
          },
          {
            id: "soil_temperature_analysis_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "soil_temperature_analysis_table",
            fn: "export"
          }
        ],
        table: {
          id: "soil_temperature_analysis_table",
          table_url: "/gardens/temperature/queryAllByPage?dataType=S",
          label: [{
            name: "监测点",
            prop: "pointsId",
            width: "140",
            type: "em_input",
            params: "pointsId",
            placeholder: "全称",
            alter_show: true,
            add_show:true

          },
            {
              name: "温度值",
              prop: "temValue",
              width: "100",
              type: "em_input",
              params: "temValue",
              placeholder: "温度值",
              alter_show: true,
              add_show:true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: false,
              add_show:false

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true,
              add_show:true
            }


          ]
        },
        chart: {
          type: "line1",
          id: "line1",
          chart_url: '/gardens/temperature/queryAll?dataType=S'
        }
      }
    },
    {
      id: "soil_humidity_analysis",
      title: "土壤湿度统计分析",
      top: 80,
      left: 400,
      width: 1100,
      height: 800,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id:"soil_temperature_analysis_date",
            type: "em_date",

          },
          {
            id: "soil_humidity_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "soil_humidity_analysis_table",
            fn: "search"
          },
          {
            id: "soil_humidity_analysis_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "soil_humidity_analysis_table",
            fn: "import"
          },
          {
            id: "soil_humidity_analysis_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "soil_humidity_analysis_table",
            fn: "export"
          }
        ],
        table: {
          id: "soil_humidity_analysis_table",
          table_url: "/gardens/humidity/queryAllByPage?dataType=S",
          label: [{
            name: "监测点",
            prop: "pointsId",
            width: "140",
            type: "em_input",
            params: "pointsId",
            placeholder: "全称",
            alter_show: true

          },
            {
              name: "湿度值",
              prop: "humValue",
              width: "100",
              type: "em_input",
              params: "humValue",
              placeholder: "温度值",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        chart: {
          type: "line2",
          id: "line2",
          chart_url: '/gardens/humidity/queryAll?dataType=S'
        }
      }
    },
    {
      id: "population_analysis",
      title: "人流量统计分析",
      top: 80,
      left: 400,
      width: 1100,
      height: 800,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id:"population_analysis_date",
            type: "em_date",

          },
          {
            id: "population_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "population_analysis_table",
            fn: "search"
          },
          {
            id: "population_analysis_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "population_analysis_table",
            fn: "import"
          },
          {
            id: "population_analysis_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "population_analysis_table",
            fn: "export"
          }
        ],
        table: {
          id: "population_analysis_table",
          table_url: "/gardens/humantrafficinfo/queryAllByPage",
          label: [{
            name: "监测点",
            prop: "humanTrafficId",
            width: "140",
            type: "em_input",
            params: "humanTrafficId",
            placeholder: "监测点",
            alter_show: true

          },
            {
              name: "人流量信息",
              prop: "humanTrafficValue",
              width: "100",
              type: "em_input",
              params: "humanTrafficValue",
              placeholder: "humanTrafficValue",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        chart: {
          type: "line3",
          id: "line3",
          chart_url: '/gardens/humantrafficinfo/queryAll'
        }
      }
    },
    {
      id: "air_temperature_analysis",
      title: "空气温度统计分析",
      top: 80,
      left: 400,
      height: 800,
      width: 1100,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id:"soil_temperature_analysis_date",
            type: "em_date",

          },
          {
            id: "air_temperature_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_temperature_analysis_table",
            fn: "search"
          },
          {
            id: "air_temperature_analysis_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "air_temperature_analysis_table",
            fn: "import"
          },
          {
            id: "air_temperature_analysis_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "air_temperature_analysis_table",
            fn: "export"
          }
        ],
        table: {
          id: "air_temperature_analysis_table",
          table_url: "/gardens/temperature/queryAllByPage?dataType=A",
          label: [{
            name: "监测点",
            prop: "pointsId",
            width: "140",
            type: "em_input",
            params: "pointsId",
            placeholder: "全称",
            alter_show: true

          },
            {
              name: "温度值",
              prop: "temValue",
              width: "100",
              type: "em_input",
              params: "temValue",
              placeholder: "温度值",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        chart: {
          type: "line4",
          id: "line4",
          chart_url: '/gardens/temperature/queryAll?dataType=A'
        }
      }
    },
    {
      id: "air_humidity_analysis",
      title: "空气湿度统计分析",
      top: 80,
      left: 400,
      height: 800,
      width: 1100,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id:"soil_temperature_analysis_date",
            type: "em_date",

          },
          {
            id: "air_humidity_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_humidity_analysis_table",
            fn: "search"
          },
          {
            id: "air_humidity_analysis_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "air_humidity_analysis_table",
            fn: "import"
          },
          {
            id: "air_humidity_analysis_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "air_humidity_analysis_table",
            fn: "export"
          }
        ],
        table: {
          id: "air_humidity_analysis_table",
          table_url: "/gardens/humidity/queryAllByPage?dataType=A",
          label: [{
            name: "监测点",
            prop: "pointsId",
            width: "140",
            type: "em_input",
            params: "pointsId",
            placeholder: "全称",
            alter_show: true

          },
            {
              name: "湿度值",
              prop: "humValue",
              width: "100",
              type: "em_input",
              params: "humValue",
              placeholder: "温度值",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        chart: {
          type: "line5",
          id: "line5",
          chart_url: '/gardens/humidity/queryAll?dataType=A'
        }
      }
    },
    {
      id: "fire_alert_anaysis",
      title: "火险报警统计分析",
      top: 80,
      left: 400,
      width: 1100,
      height: 800,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id:"fire_alert_anaysis_date",
            type: "em_date",

          },
          {
            id: "fire_alert_anaysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "fire_alert_anaysis_table",
            fn: "search"
          },
          {
            id: "fire_alert_anaysis_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "fire_alert_anaysis_table",
            fn: "import"
          },
          {
            id: "fire_alert_anaysis_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "fire_alert_anaysis_table",
            fn: "export"
          }
        ],
        table: {
          id: "fire_alert_anaysis_table",
          table_url: "/gardens/firealarminfo/queryAllByPage",
          label: [{
            name: "监测点",
            prop: "fireAlarmId",
            width: "140",
            type: "em_input",
            params: "fireAlarmId",
            placeholder: "监测点",
            alter_show: true

          },
            {
              name: "报警等级",
              prop: "fireAlarmLevel",
              width: "100",
              type: "em_input",
              params: "fireAlarmLevel",
              placeholder: "fireAlarmLevel",
              alter_show: true
            },
            {
              name: "报警信息",
              prop: "fireAlarmValue",
              width: "100",
              type: "em_input",
              params: "fireAlarmValue",
              placeholder: "fireAlarmLevel",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        chart: {
          type: "bar",
          id: "bar1",
          chart_url: '/gardens/firealarminfo/queryAllByPage'
        }
      }
    },
    {
      id: "people_manage",
      title: "人员管理",
      top: 80,
      left: 400,
      width: "55%",
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "people_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "姓名",
                params: "name"
              },
              {
                name: "职务",
                params: "duty"
              }
            ]

          },
          {
            id: "people_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "people_manage_table",
            fn: "search"
          },
          {
            id: "people_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "people_manage_table",
            fn: "add",
            url: "/gardens/person/add"
          },
          {
            id: "people_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "people_manage_table",
            fn: "modify",
            url: "/gardens/person/update"
          },
          {
            id: "people_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "people_manage_table",
            fn: "dele",
            url: "/gardens/person/deletes"
          },
          {
            id: "people_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "people_manage_table",
            fn: "import",
            download_url: "/gardens/person/downCsvmodel",
            import_url: "/gardens/person/ajaxUpload"
          },
          {
            id: "people_manage_button_export",
            type: "em_button",
            control_id: "people_manage_table",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            url: "/gardens/person/exportCsv"
          }
        ],
        table: {
          id: "people_manage_table",
          table_url: "/gardens/person/queryAllByPage",
          label: [{
            name: "姓名",
            prop: "name",
            width: "100",
            type: "em_input",
            placeholder: "名字",
            params: "name",
            alter_show: true,
            add_show: true
          },
            {
              name: "性别",
              prop: "sex",
              width: "100",
              type: "em_select",
              params: "sex",
              options: [{
                value: "男",
                label: "男"
              },
                {
                  value: "女",
                  label: "女"
                }

              ],
              alter_show: true,
              add_show: true
            },
            {
              name: "职务",
              prop: "duty",
              width: "140",
              type: "em_input",
              placeholder: "职务",
              params: "duty",
              alter_show: true,
              add_show: true
            },
            {
              name: "人员类型",
              prop: "personTypeName",
              width: "140",
              type: "em_selectUrl",
              params: "personTypeId",
              optionUrl: "gardens/persontype/queryAll",
              alter_show: true,
              add_show: true

            },
            {
              name: "电话",
              prop: "telephone",
              width: "140",
              type: "em_input",
              placeholder: "电话",
              params: "telephone",
              alter_show: true,
              add_show: true
            },
            {
              name: "从事专业",
              prop: "professional",
              width: "140",
              type: "em_input",
              placeholder: "从事专业",
              params: "professional",
              alter_show: true,
              add_show: true
            },
            {
              name: "工作单位",
              prop: "entName",
              width: "100",
              type: "em_selectUrl",
              params: "entId",
              optionUrl: "gardens/ent/queryAll",
              alter_show: true,
              add_show: true
            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              alter_show: true,
              add_show: true

            },
            {
              name: "排序号",
              prop: "orderNo",
              width: "100",
              type: "em_input",
              placeholder: "排序号",
              params: "orderNo",
              alter_show: true,
              add_show: true

            }


          ]
        }
      }


    },
    {
      id: "protect_company_manage",
      title: "维护单位管理",
      top: 80,
      left: 400,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [

          {
            id: "protect_company_manage_input_entName",
            type: "em_input",
            placeholder: "名称",
            params: "entName"
          },
          {
            id: "protect_company_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "protect_company_manage_table",
            fn: "search"
          },
          {
            id: "protect_company_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "protect_company_manage_table",
            fn: "add",
            url: "/gardens/ent/add"
          },
          {
            id: "protect_company_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "protect_company_manage_table",
            fn: "modify",
            url: "/gardens/ent/update"

          },
          {
            id: "protect_company_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "protect_company_manage_table",
            fn: "dele",
            url: "gardens/ent/deletes"
          },
          {
            id: "protect_company_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "protect_company_manage_table",
            download_url: "/gardens/ent/downCsvmodel",
            import_url: "/gardens/ent/ajaxUpload"
          },
          {
            id: "protect_company_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "protect_company_manage_table",
            fn: "export",
            url: "/gardens/ent/exportCsv"
          }

        ],
        table: {
          id: "protect_company_manage_table",
          table_url: "/gardens/ent/queryAllByPage",
          label: [
            {
              name: "名称",
              prop: "entName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "entName",
              alter_show: true,
              add_show: true

            },
            {
              name: "单位地址",
              prop: "orgAddr",
              width: "120",
              type: "em_input",
              placeholder: "单位地址",
              params: "orgAddr",
              alter_show: true,
              add_show: true
            },
            {
              name: "联系人",
              prop: "contactMan",
              width: "200",
              type: "em_input",
              placeholder: "联系人",
              params: "contactMan",
              alter_show: true,
              add_show: true
            },
            {
              name: "联系电话",
              prop: "tel",
              width: "120",
              type: "em_input",
              placeholder: "联系电话",
              params: "tel",
              alter_show: true,
              add_show: true
            },
            {
              name: "行政区域",
              prop: "areaCode",
              width: "160",
              type: "em_selectUrl",
              params: "areaCode",
              optionUrl: "gardens/district/queryAll",
              alter_show: true,
              add_show: true
            },
            {
              name: "排序号",
              prop: "orderNo",
              width: "140",
              type: "em_input",
              placeholder: "排序号",
              params: "orderNo",
              alter_show: true,
              add_show: true
            },
            {
              name: "注释",
              prop: "memo",
              width: "140",
              type: "em_input",
              placeholder: "注释",
              params: "memo",
              alter_show: true,
              add_show: true
            },


          ]
        }
      }

    },
    {
      id: "tree_type_manage",
      title: "树种类型管理",
      top: 80,
      left: 400,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "tree_type_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "类型编号",
                params: "id",

              },
              {
                name: "树种类型名称",
                params: "plantCname"
              }
            ]

          },
          {
            id: "tree_type_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "tree_type_manage_table",
            fn: "search"
          },
          {
            id: "tree_type_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "tree_type_manage_table",
            fn: "add",
            url: "/gardens/plantname/add"
          },
          {
            id: "tree_type_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "tree_type_manage_table",
            fn: "modify",
            url: "/gardens/plantname/update"
          },
          {
            id: "tree_type_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "tree_type_manage_table",
            fn: "dele",
            url: "/gardens/plantname/deletes"
          }
        ],
        table: {
          id: "tree_type_manage_table",
          table_url: "/gardens/plantname/queryAllByPage",
          label: [
            {
              name: "类型编号",
              prop: "id",
              width: "100",
              type: "em_input",
              placeholder: "类型编号",
              params: "id",
              alter_show: true,
              add_show: true
            },
            {
              name: "树种类型名称",
              prop: "plantCname",
              width: "140",
              type: "em_input",
              placeholder: "树种类型名称",
              params: "plantCname",
              alter_show: true,
              add_show: true
            },
            {
              name: "树种英文名",
              prop: "plantEname",
              width: "140",
              type: "em_input",
              placeholder: "树种英文名",
              params: "plantEname",
              alter_show: true,
              add_show: true
            },
            {
              name: "注释",
              prop: "describe",
              width: "300",
              type: "em_input",
              placeholder: "注释",
              params: "describe",
              alter_show: true,
              add_show: true

            }

          ]
        }
      }
    },
    {
      id: "plant_type_manage",
      title: "植物类型管理",
      top: 80,
      left: 400,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "plant_type_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "类型编号",
                params: "treeTypeNo",

              },
              {
                name: "树种类型名称",
                params: "treeTypeName"
              }
            ]

          },
          {
            id: "plant_type_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "plant_type_manage_table",
            fn: "search"
          },
          {
            id: "plant_type_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "plant_type_manage_table",
            fn: "add",
            url: "/gardens/treetype/add"
          },
          {
            id: "plant_type_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "plant_type_manage_table",
            fn: "modify",
            url: "/gardens/treetype/update"
          },
          {
            id: "plant_type_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "plant_type_manage_table",
            fn: "dele",
            url: "/gardens/treetype/deletes"
          }
        ],
        table: {
          id: "plant_type_manage_table",
          table_url: "/gardens/treetype/queryAllByPage",
          label: [
            {
              name: "类型编号",
              prop: "treeTypeNo",
              width: "140",
              type: "em_input",
              placeholder: "类型编号",
              params: "treeTypeNo",
              alter_show: true,
              add_show: true
            },
            {
              name: "树种类型名称",
              prop: "treeTypeName",
              width: "140",
              type: "em_input",
              placeholder: "树种类型名称",
              params: "treeTypeName",
              alter_show: true,
              add_show: true
            },
            {
              name: "是否特殊树种",
              prop: "isSpecial",
              width: "140",
              type: "em_input",
              placeholder: "填0或1",
              params: "isSpecial",
              alter_show: true,
              add_show: true
            },
            {
              name: "注释",
              prop: "memo",
              width: "200",
              type: "em_input",
              placeholder: "注释",
              params: "memo",
              alter_show: true,
              add_show: true

            }

          ]
        }
      }
    },
    {
      id: "tree_material_manage",
      title: "特殊树木资料管理",
      top: 80,
      left: 400,
      height: 400,
      width:900,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id:"tree_material_manage_input_treeNo",
            type: "em_input",
            placeholder: "植物编号",
            params: "treeNo"
          },
          {
            id:"tree_material_manage_input_treeName",
            type: "em_input",
            placeholder: "树种类型",
            params: "treeName"
          },
          {
            id:"tree_material_manage_input_treeName",
            type: "em_input",
            placeholder: "植物名称",
            params: "treeName"
          },
          {
            id:"tree_material_manage_input_position",
            type: "em_input",
            placeholder: "行政区划",
            params: "position"
          },
          {
            id: "tree_material_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "tree_material_manage_table",
            fn: "search"
          },
          {
            id: "tree_material_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "tree_material_manage_table",
            fn: "add",
            url: "/gardens/tree/add"
          },
          {
            id: "tree_material_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "tree_material_manage_table",
            fn: "modify",
            url: "/gardens/tree/update"
          },
          {
            id: "tree_material_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "tree_material_manage_table",
            fn: "dele",
            url: "/gardens/tree/deletes"
          }
        ],
        table: {
          id: "tree_material_manage_table",
          table_url: "/gardens/tree/queryAllByPage",
          label: [
            {
              name: "植物编号",
              prop: "treeNo",
              width: "140",
              type: "em_input",
              placeholder: "植物编号",
              params: "treeNo",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物名称",
              prop: "treeName",
              width: "100",
              type: "em_selectUrl",
              params: "treeNameId",
              optionUrl: "gardens/tree/findplantname",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物种类型",
              prop: "plantTypeName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "树种类型",
              prop: "treeTypeName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            // {
            //   name:"创建人ID",
            //   prop:"creatorId",
            //   width:"120",
            //   type:"em_input",
            //   placeholder:"创建人ID",
            //   params:"creatorId",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "创建日期",
              prop: "createDate",
              width: "250",
              type: "em_input",
              placeholder: "创建日期",
              params: "createDate",
              add_show: false,
              alter_show: true
            },
            {
              name: "更新时间",
              prop: "updateDate",
              width: "250",
              type: "em_input",
              placeholder: "更新时间",
              params: "updateDate",
              add_show: false,
              alter_show: true
            },
            {
              name: "等级",
              prop: "rankValue",
              width: "80",
              type: "em_selectUrl",
              params: "rankValue",
              optionUrl: "gardens/tree/findrank",
              add_show: true,
              alter_show: true
            },
            {
              name: "高度",
              prop: "height",
              width: "80",
              type: "em_input",
              placeholder: "高度",
              params: "height",
              add_show: true,
              alter_show: true
            },
            {
              name: "海拔高度",
              prop: "aboveSeaLevel",
              width: "80",
              type: "em_input",
              placeholder: "海拔高度",
              params: "aboveSeaLevel",
              add_show: true,
              alter_show: true
            },
            {
              name: "直径",
              prop: "diameter",
              width: "80",
              type: "em_input",
              placeholder: "直径",
              params: "diameter",
              add_show: true,
              alter_show: true
            },
            {
              name: "周长",
              prop: "perimeter",
              width: "80",
              type: "em_input",
              placeholder: "周长",
              params: "perimeter",
              add_show: true,
              alter_show: true
            },
            {
              name: "所在道路",
              prop: "roadName",
              width: "160",
              type: "em_selectUrl",
              params: "roadId",
              optionUrl: "gardens/road/queryAll",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所属网格",
            //   prop:"gridName",
            //   type:"em_selectUrl",
            //   params:"gridId",
            //   optionUrl: "gardens/grid/queryAll",
            //   width:"120",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "行政区划",
              prop: "districtName",
              width: "120",
              type: "em_selectUrl",
              params: "districtId",
              optionUrl: "gardens/district/queryAll",
              add_show: true,
              alter_show: true
            },
            {
              name: "种植位置",
              prop: "position",
              width: "220",
              type: "em_input",
              placeholder: "直径",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"200",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任人Id",
            //   prop:"personId",
            //   width:"140",
            //   type:"em_selectUrl",
            //   params:"personId",
            //   optionUrl: "gardens/person/queryAll",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "特征描述",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "特征描述",
              params: "memo",
              add_show: true,
              alter_show: true
            }

          ]
        }
      }
    },
    {
      id: "grid_manage",
      title: "网格管理",
      top: 80,
      left: 400,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "grid_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "编号",
                params: "gridNo"
              },
              {
                name: "网格名称",
                params: "gridName"
              }
            ]

          },
          {
            id: "grid_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "grid_manage_table",
            fn: "search"
          },
          {
            id: "grid_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "grid_manage_table",
            fn: "add",
            url: "/gardens/grid/add"
          },
          {
            id: "grid_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "grid_manage_table",
            fn: "modify",
            url: "/gardens/grid/update"
          },
          {
            id: "grid_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "grid_manage_table",
            fn: "dele",
            url: "gardens/grid/deletes"
          },
          {
            id: "grid_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "grid_manage_table",
            download_url: "/gardens/grid/downCsvmodel",
            import_url: "/gardens/grid/ajaxUpload"

          },
          {
            id: "grid_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "grid_manage_table",
            url:"/gardens/grid/exportCsv"
          }
        ],
        table: {
          id: "grid_manage_table",
          table_url: "/gardens/grid/queryAllByPage",
          label: [
            {
              name: "编号",
              prop: "gridNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "gridNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "gridName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "gridName",
              add_show: true,
              alter_show: true

            },
            {
              name: "面积",
              prop: "gridArea",
              width: "100",
              type: "em_input",
              placeholder: "面积",
              params: "gridArea",
              add_show: true,
              alter_show: true

            },
            {
              name: "创建人姓名",
              prop: "creatorName",
              width: "140",
              type: "em_input",
              placeholder: "创建人姓名",
              params: "creatorName",
              add_show: true,
              alter_show: true
            },
            {
              name: "创建人日期",
              prop: "createDate",
              width: "200",
              add_show: false,
              alter_show: false
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"120"
            // },
            // {
            //   name:"责任人",
            //   prop:"personId",
            //   width:"100"
            // },
            {
              name: "所属行政区域",
              prop: "areaCode",
              width: "200",
              type: "em_input",
              placeholder: "所属行政区域",
              params: "areaCode",
              add_show: true,
              alter_show: true
            },
          ]
        }
      }
    },
    {
      id: "soil_temperature_manage",
      title: "土壤温度监测点管理",
      top: 80,
      left: 400,
      /*width:700,*/
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "soil_temperature_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "soil_temperature_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "soil_temperature_manage_table",
            fn: "search"
          },
          {
            id: "soil_temperature_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "soil_temperature_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "soil_temperature_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "soil_temperature_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "soil_temperature_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "soil_temperature_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "soil_temperature_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "soil_temperature_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "soil_temperature_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "soil_temperature_manage_table",
            url:"/gardens/temhumpoints/exportCsv"
          }
        ],
        table: {
          id: "soil_temperature_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=S&temperatureOrHumidity=T",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"160",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "180",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "soil_humidity_manage",
      title: "土壤湿度监测点管理",
      top: 80,
      left: 400,
      /*width:700,*/
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "soil_humidity_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "soil_humidity_manage_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "soil_humidity_manage_table",
            fn: "search"
          },
          {
            id: "soil_humidity_manage_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "soil_humidity_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "soil_humidity_manage_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "soil_humidity_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "soil_humidity_manage_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "soil_humidity_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "soil_humidity_manage_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "soil_humidity_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "soil_humidity_manage_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "soil_humidity_manage_table",
            url:"/gardens/temhumpoints/exportCsv"
          }
        ],
        table: {
          id: "soil_humidity_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=S&temperatureOrHumidity=H",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"160",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "100",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "population_manage",
      title: "人流量监测点管理",
      top: 80,
      left: 400,
      width: 750,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "population_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "monitorName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "population_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "population_manage_table",
            fn: "search"
          },
          {
            id: "population_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "population_manage_table",
            fn: "add",
            url: "/gardens/humantraffic/add"
          },
          {
            id: "population_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "population_manage_table",
            fn: "modify",
            url: "/gardens/humantraffic/update"
          },
          {
            id: "population_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "population_manage_table",
            fn: "dele",
            url: "/gardens/humantraffic/deletes"

          },
          {
            id: "population_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "population_manage_table",
            download_url: "/gardens/humantraffic/downCsvmodel",
            import_url: "/gardens/humantraffic/ajaxUpload"
          },
          {
            id: "population_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "population_manage_table",
            url:"/gardens/humantraffic/exportCsv"
          }
        ],
        table: {
          id: "population_manage_table",
          table_url: "/gardens/humantraffic/queryAllByPage",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "monitorName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "monitorName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"160",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100"
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "橙色预警阀值",
              prop: "orangeWarning",
              width: "180",
              type: "em_input",
              placeholder: "橙色预警阀值",
              params: "orangeWarning",
              add_show: true,
              alter_show: true
            },
            {
              name: "红色预警阀值",
              prop: "redWarning",
              width: "180",
              type: "em_input",
              placeholder: "红色预警阀值",
              params: "redWarning",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "air_temperature_manage",
      title: "空气温度监测点管理",
      top: 80,
      left: 400,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "air_temperature_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              },
            ]

          },
          {
            id: "air_temperature_manage_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_temperature_manage_table",
            fn: "search"
          },
          {
            id: "air_temperature_manage_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "air_temperature_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "air_temperature_manage_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "air_temperature_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "air_temperature_manage_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "air_temperature_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "air_temperature_manage_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "air_temperature_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "air_temperature_manage_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "air_temperature_manage_table",
            url:"/gardens/temhumpoints/exportCsv"
          }
        ],
        table: {
          id: "air_temperature_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=A&temperatureOrHumidity=T",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"160",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "100",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "air_humidity_manage",
      title: "空气湿度监测点管理",
      top: 80,
      left: 400,
      //width:700,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "air_humidity_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              },
            ]

          },
          {
            id: "air_humidity_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_humidity_manage_table",
            fn: "search"
          },
          {
            id: "air_humidity_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "air_humidity_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "air_humidity_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "air_humidity_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "air_humidity_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "air_humidity_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "air_humidity_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "air_humidity_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "air_humidity_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "air_humidity_manage_table",
            url:"/gardens/temhumpoints/exportCsv"
          }
        ],
        table: {
          id: "air_humidity_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=A&temperatureOrHumidity=H",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"160",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "100",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "fire_alert_manage",
      title: "火灾报警点管理",
      top: 80,
      left: 400,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "fire_alert_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "fireAlarmName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "fire_alert_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "fire_alert_manage_table",
            fn: "search"
          },
          {
            id: "fire_alert_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "fire_alert_manage_table",
            fn: "add",
            url: "/gardens/firealarm/add"
          },
          {
            id: "fire_alert_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "fire_alert_manage_table",
            fn: "modify",
            url: "/gardens/firealarm/update"
          },
          {
            id: "fire_alert_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "fire_alert_manage_table",
            fn: "dele",
            url: "/gardens/firealarm/deletes"
          },
          {
            id: "fire_alert_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "fire_alert_manage_table",
            fn: "import",
            download_url: "/gardens/firealarm/downCsvmodel",
            import_url: "/gardens/firealarm/ajaxUpload"
          },
          {
            id: "fire_alert_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            control_id: "fire_alert_manage_table",
            operate: "导出excel",
            fn: "export",
            url:"/gardens/firealarm/exportCsv"
          }
        ],
        table: {
          id: "fire_alert_manage_table",
          table_url: "/gardens/firealarm/queryAllByPage",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "fireAlarmName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "fireAlarmName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name:"经度",
              prop:"longitude",
              width:"200",
              type:"em_input",
              placeholder:"经度",
              params:"longitude",
              add_show:true,
              alter_show:true
            },
            {
              name:"纬度",
              prop:"latitude",
              width:"160",
              type:"em_input",
              placeholder:"纬度",
              params:"latitude",
              add_show:true,
              alter_show:true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100"
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "permissions_management",
      title: "权限管理",
      top: 80,
      left: 400,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "treeForm",
      component_data: {}
    }
  ],
  dialog: [
    {
      id: "people_manage_add_operation",
      title: "人员添加",
      show: false,
      type: "dome",
      data: [
        {
          type: "em_input",
          placeholder: "账户",
          name: "账户",
          params: ""
        },
        {
          type: "em_input",
          placeholder: "中文名",
          name: "中文名",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "英文名",
          name: "英文名",
          params: ""

        },
        {
          type: "em_select",
          name: "状态",
          options: [{
            value: '选项1',
            label: '在职'
          },
            {
              value: '选项2',
              label: '离职'
            }
          ]

        },
        {
          type: "em_input",
          placeholder: "性别",
          name: "性别",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "年龄",
          name: "年龄",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "电话",
          name: "电话",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "部门",
          name: "部门",
          params: ""

        },]
    },
    {
      id: "edit_operation",
      title: "人员修改",
      show: false,
      type: "dome",
      data: {
        name: ""
      }
    },
    {
      id: "type_manage_add_operation",
      title: "添加",
      show: false,
      type: "dome",
      data: [{
        type: "em_input",
        placeholder: "账户",
        name: "账户",
        params: ""

      },
        {
          type: "em_input",
          placeholder: "中文名",
          name: "中文名",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "英文名",
          name: "英文名",
          params: ""

        },
      ]

    },
  ]
}
